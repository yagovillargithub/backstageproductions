# Despliegue VPS + DNS Cloudflare (brecords)

> Cómo se despliega la web en el VPS Contabo como subdominio `brecords.unlimited-systems.net`. **Gated**: requiere token de Cloudflare (DNS) y decisión del operador. No ejecutado aún.
> Última actualización: 2026-06-04.

---

## Resumen

Mismo patrón que `unlimited-web` (Next.js bajo systemd + Apache reverse-proxy + Let's Encrypt + Cloudflare DNS-only). Detalle del servidor en [`../../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md`](../../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md).

## Estado actual

**No desplegado.** Pendiente de: (1) token de Cloudflare para crear el registro DNS, (2) `go` del operador.

### Plan de despliegue (cuando se active)

1. **DNS (Cloudflare, zona `unlimited-systems.net`)**: crear registro `A` (o `CNAME` al apex) **`brecords`** → `185.213.25.188`, **DNS-only (gris)** inicialmente. Requiere token CF con permiso `Zone.DNS:Edit` sobre la zona.
2. **Build local**: `npm run build` (genera `.next`). Subir `.next`, `public`, `package.json`, `package-lock.json`, `next.config.ts` al VPS (rsync delta-transfer; excluir `node_modules`, `.next/cache`).
3. **Instalar deps en el VPS**: `npm ci --omit=dev` en `/opt/brecords/`.
4. **Servicio systemd** `brecords.service`: `next start -p 3001` bajo `www-data`, `WorkingDirectory=/opt/brecords`, `EnvironmentFile=/etc/brecords/.env.production.local` (cuando haya secretos; hoy vacío).
5. **Vhost Apache** `brecords.unlimited-systems.net.conf` (+ `-le-ssl.conf`): reverse-proxy a `127.0.0.1:3001`, patrón SSL estándar de `compartido/01` (sin websocket — Next.js no lo necesita).
6. **Cert TLS**: `certbot --apache -d brecords.unlimited-systems.net`.
7. **Verificar**: `apache2ctl configtest` antes de recargar; `curl -sI https://brecords.unlimited-systems.net/`.

### Variables de entorno (producción)

| Var | Para qué | Estado |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical / OG | `https://brecords.unlimited-systems.net` |
| `NEXT_PUBLIC_WA_NUMBER` | WhatsApp flotante | placeholder hasta tener el real |
| `RESEND_API_KEY` | envío de formularios | **diferido** (sin ella, acepta + loguea) |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | destino/origen del correo | diferido |
| `UPSTASH_REDIS_REST_*` | rate-limit | opcional (no-op si falta) |

## Decisiones clave documentadas (zonas grises)

- **Puerto 3001**: libre en el VPS (3000=unlimited-web, 3100=demogurru-api, 510x=apps .NET).
- **Cloudflare DNS-only (gris)** al principio, como el resto de webs Next del operador. Si se pasa a Proxied (naranja), antes poner SSL/TLS de CF en *Full (strict)* (regla `compartido/01`).
- **Sin PWA / service worker** (regla `compartido/03`).

## Ficheros clave (en el VPS, cuando exista)

| Qué | Dónde |
|---|---|
| Binarios/build | `/opt/brecords/` |
| Secretos | `/etc/brecords/.env.production.local` (mode 600 www-data) |
| Unit systemd | `/etc/systemd/system/brecords.service` |
| Vhosts | `/etc/apache2/sites-available/brecords.unlimited-systems.net{,-le-ssl}.conf` |

## Pendiente / no implementado

- Todo el despliegue (gated).
- Backup/monitorización: heredado del estado general del VPS (sin backup automático — `compartido/01`).

## Referencias cruzadas

- **Infraestructura VPS** (Apache, certbot, Cloudflare, rsync): [`../../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md`](../../UNLIMITED_AI_BRAIN/compartido/01-infraestructura-vps.md).
- **Mail server** (al activar envío real): [`../../UNLIMITED_AI_BRAIN/compartido/02-mail-server-stalwart.md`](../../UNLIMITED_AI_BRAIN/compartido/02-mail-server-stalwart.md).
- **Arquitectura**: [`01-arquitectura.md`](01-arquitectura.md).
