# Despliegue — VoteOn

VoteOn es una SPA estática (Vite) + Supabase como backend. Cualquier hosting
estático sirve; aquí están las tres rutas recomendadas.

## Variables de entorno

Todas se inyectan **en build time** (prefijo `VITE_`). Ver [.env.example](.env.example).

| Variable | Requerida | Para qué |
| --- | --- | --- |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Sí | Base de datos, auth, storage |
| `VITE_GEMINI_API_KEY` | Sí* | Asistente IA, moderación, fact-check (sin ella la app degrada con gracia) |
| `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` | No | Analytics de producto |
| `VITE_SENTRY_DSN` | No | Monitoreo de errores |

## Opción A — Azure Static Web Apps (recomendada)

1. En el portal de Azure: **Create resource → Static Web App**.
2. Conecta el repo `josueazc/VoteOn2`, rama `main`.
3. Build presets: *Custom* — App location `/`, Output location `dist`,
   build command `npm run build`.
4. Agrega las variables `VITE_*` en **Configuration → Application settings**
   del build (o como secrets del workflow que Azure genera).
5. Cada push a `main` despliega automáticamente.

## Opción B — Docker (Azure Container Apps, ACI o cualquier nube)

```bash
docker build \
  --build-arg VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
  --build-arg VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
  --build-arg VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY \
  -t voteon .

docker run -p 8080:80 voteon
```

Para Azure Container Apps:

```bash
az acr build --registry <tuRegistry> --image voteon:latest .
az containerapp create --name voteon --resource-group <rg> \
  --image <tuRegistry>.azurecr.io/voteon:latest --target-port 80 --ingress external
```

La imagen usa nginx con fallback SPA, gzip, cache inmutable para assets y
headers de seguridad (ver [nginx.conf](nginx.conf)).

## Opción C — Vercel / Netlify

Funciona out-of-the-box: framework Vite, build `npm run build`, output `dist`.
Configura las variables `VITE_*` en el panel del proveedor.

## Backend (Supabase)

El setup completo de base de datos está en [supabase/README.md](supabase/README.md):
una sola migración idempotente + bucket de storage. Producción y staging pueden
ser dos proyectos Supabase distintos apuntados por diferentes `.env`.

## CI

[.github/workflows/ci.yml](.github/workflows/ci.yml) corre tests + build en
cada push/PR a `main` y verifica que la imagen Docker compile.
