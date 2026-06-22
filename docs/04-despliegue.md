# Despliegue VPS + DNS Cloudflare (brecords)

> Cómo está desplegada la web en el VPS Contabo como subdominio `brecords.unlimited-systems.net`. Mismo patrón que `unlimited-web`. Detalle del servidor en [`../../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md`](../../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md).
> Última actualización: 2026-06-16.

---

## Resumen

Next.js bajo systemd (`backstage-web.service`, `:3001`) + Apache reverse-proxy + Let's Encrypt + Cloudflare DNS-only.

## Estado actual

**✅ Desplegado y verificado el 2026-06-16** — en vivo en **https://brecords.unlimited-systems.net** (HTTPS 200, HTTP→HTTPS 301).

| Pieza | Valor real |
|---|---|
| Dominio | `brecords.unlimited-systems.net` |
| DNS | Cloudflare zona `unlimited-systems.net`, registro **A `brecords` → `185.213.25.188`, DNS-only (gris)** (id `b58a228d…`) |
| Servicio | `backstage-web.service` (`npm start` → `next start`, `PORT=3001`, `HOSTNAME=127.0.0.1`, user `www-data`) |
| App en disco | `/opt/backstage-web/` (build hecho en el VPS) |
| Env | `/opt/backstage-web/.env.production.local` (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WA_NUMBER`) |
| Vhost | `/etc/apache2/sites-available/brecords.unlimited-systems.net{,-le-ssl}.conf` → proxy `127.0.0.1:3001` |
| Cert | Let's Encrypt, expira **2026-09-14**, auto-renovación (timer certbot) |

### Cómo se hizo (real, no el plan teórico)

1. **DNS** vía API de Cloudflare (`POST /zones/{id}/dns_records`, A `brecords`, `proxied:false`).
2. **Subida**: tarball del *código fuente* (sin `node_modules`/`.next`, ~180 KB) por `scp` a `/tmp` — **se evita subir el build** porque la ADSL del operador es lenta; se construye en el servidor (19 GB RAM, Node v22).
3. **Build en el VPS**: `npm ci && npm run build` en `/opt/backstage-web`.
4. **systemd**: unit clonada de `unlimited-web.service` con puerto 3001; `enable --now`; verificado `curl 127.0.0.1:3001` → 200.
5. **Vhost** HTTP con guarda: `a2ensite` → `apache2ctl configtest` (Syntax OK) → `reload`; si fallara, `a2dissite` revierte sin tocar las otras webs.
6. **Cert**: `certbot --apache -d brecords.unlimited-systems.net --redirect` (crea `-le-ssl.conf` + redirect HTTP→HTTPS).
7. **Verificación**: HTTPS 200 externo + captura visual de la URL pública + smoke test de las 7 webs hermanas (siguen sirviendo).

### Redeploy (cambios de código)

```powershell
# 1) Empaquetar fuente (sin node_modules/.next/.git/scripts) y subir
tar -czf $env:TEMP\backstage-src.tgz --exclude=node_modules --exclude=.next --exclude=.git --exclude=scripts -C C:\GitHub\backstageproductions .
scp $env:TEMP\backstage-src.tgz root@185.213.25.188:/tmp/

# 2) En el VPS: extraer (preservando .env.production.local), build, restart
ssh root@185.213.25.188 "cd /opt/backstage-web && tar --exclude=.env.production.local -xzf /tmp/backstage-src.tgz && npm ci && npm run build && chown -R www-data:www-data /opt/backstage-web && systemctl restart backstage-web && sleep 5 && systemctl is-active backstage-web && curl -sI -o /dev/null -w 'HTTP=%{http_code}\n' http://127.0.0.1:3001/"
```

> ⚠️ El tar de redeploy **no debe sobrescribir** `/opt/backstage-web/.env.production.local` (el `--exclude` lo protege). Y **siempre** `apache2ctl configtest` antes de cualquier `reload` de Apache.

### Variables de entorno (producción)

| Var | Para qué | Estado |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical / OG | `https://brecords.unlimited-systems.net` |
| `NEXT_PUBLIC_WA_NUMBER` | WhatsApp flotante | placeholder hasta tener el real |
| `RESEND_API_KEY` | envío de formularios | **diferido** (sin ella, acepta + loguea) |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | destino/origen del correo | diferido |
| `UPSTASH_REDIS_REST_*` | rate-limit | opcional (no-op si falta) |

## Decisiones clave documentadas (zonas grises)

- **Build en el VPS, no en local**: se sube solo el código fuente (~180 KB) y se hace `npm ci && npm run build` en el servidor. Evita subir `.next`+`node_modules` por la ADSL lenta del operador. Node v22 ya está en el VPS.
- **Nombre `backstage-web.service` y ruta `/opt/backstage-web`** (no `brecords.*`): sigue la convención real de `unlimited-web` (servicio = nombre de app, env junto al binario en `/opt/<app>/.env.production.local`), no la nomenclatura por dominio que se anticipó en el plan.
- **Puerto 3001**: libre en el VPS (3000=unlimited-web, 3100=demogurru-api, 510x=apps .NET).
- **Cloudflare DNS-only (gris)**, como la mayoría de subdominios del operador (`services`, `demo-avpaml7b`, apex). Simplifica el reto HTTP-01 de certbot. Si se pasa a Proxied (naranja), antes poner SSL/TLS de CF en *Full (strict)* (regla `compartido/01`).
- **Sin PWA / service worker** (regla `compartido/03`).

## Ficheros clave (en el VPS)

| Qué | Dónde |
|---|---|
| App + build | `/opt/backstage-web/` |
| Env (no secreto hoy) | `/opt/backstage-web/.env.production.local` |
| Unit systemd | `/etc/systemd/system/backstage-web.service` |
| Vhosts | `/etc/apache2/sites-available/brecords.unlimited-systems.net{,-le-ssl}.conf` |
| Cert | `/etc/letsencrypt/live/brecords.unlimited-systems.net/` |
| Logs | `journalctl -u backstage-web` · `/var/log/apache2/brecords.unlimited-systems.net-{access,error}.log` |

## Pendiente / no implementado

- **Activar envío de email real** (Resend/Stalwart): hoy `/api/contact` y `/api/tweaks-feedback` aceptan + loguean sin `RESEND_API_KEY`. Al activarlo, añadir las vars al `.env.production.local` del VPS y `systemctl restart backstage-web`.
- **Datos reales**: handles, dirección y fotos (vía `IMAGENES.md`) siguen como placeholder.
- **Backup/monitorización**: heredado del estado general del VPS (sin backup automático — `compartido/01`). La app se reconstruye desde el repo, pero el `.env.production.local` no está en backup.

## Referencias cruzadas

- **Infraestructura VPS** (Apache, certbot, Cloudflare, rsync): [`../../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md`](../../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md).
- **Mail server** (al activar envío real): [`../../UNLIMITED_AI_BRAIN/compartido/02-mail-server-stalwart.md`](../../UNLIMITED_AI_BRAIN/compartido/02-mail-server-stalwart.md).
- **Arquitectura**: [`01-arquitectura.md`](01-arquitectura.md).
