# API de contacto (.NET)

Minimal API en ASP.NET Core (.NET 8) que recibe el formulario del portafolio y te manda el mensaje por email.

## Endpoints

| Método | Ruta           | Qué hace                                             |
|--------|----------------|------------------------------------------------------|
| GET    | `/health`      | Comprobación de estado                               |
| POST   | `/api/contact` | Valida y envía el mensaje del formulario por email   |

Cuerpo de `POST /api/contact` (JSON): `name`, `email`, `type` (opcional), `message` y `website` (campo trampa: debe ir vacío).

## Qué incluye

- Validación de campos (longitudes, formato de email) con respuestas 400 claras.
- Campo trampa anti-spam (`website`).
- Límite de envíos por IP: 5 cada 10 minutos (en desarrollo, 50).
- CORS limitado a los dominios de tu front.
- Envío por SMTP con MailKit. El mensaje te llega con `Reply-To` del visitante: respondés y le contestás directo.
- Sin SMTP configurado, el mensaje solo se escribe en el log (útil para probar).

## Correrla en tu máquina

Requisitos: SDK de .NET 8 o superior.

```bash
cd backend/PortfolioApi
dotnet run
```

Queda en http://localhost:5080. Probala con:

```bash
curl -X POST http://localhost:5080/api/contact -H "Content-Type: application/json" \
  -d '{"name":"Ana","email":"ana@example.com","type":"Consulta técnica","message":"Hola, esto es una prueba."}'
```

## Configurar el envío de email (Gmail)

1. Activá la verificación en dos pasos en tu cuenta de Google.
2. Creá una "contraseña de aplicación" en https://myaccount.google.com/apppasswords
3. Guardá los datos como secretos (no van al repositorio):

```bash
cd backend/PortfolioApi
dotnet user-secrets set "Email:Username" "tu-cuenta@gmail.com"
dotnet user-secrets set "Email:Password" "la-contraseña-de-aplicación"
dotnet user-secrets set "Email:FromAddress" "tu-cuenta@gmail.com"
dotnet user-secrets set "Email:To" "lucascambas@gmail.com"
```

## Publicarla (gratis: Render + Resend)

Los servicios gratis de Render bloquean los puertos SMTP (25, 465 y 587), así que en producción el mail se manda
con la API HTTPS de [Resend](https://resend.com) (`Email__Provider=Resend`). En tu máquina seguís usando Gmail.

### 1. Resend
1. Creá una cuenta con **lucascambas@gmail.com** y generá una API key (Dashboard → API Keys).
2. Sin dominio propio podés enviar desde `onboarding@resend.dev`, pero **solo a tu propio email** (el de la cuenta): alcanza para recibir las consultas.
3. Con dominio propio, verificalo en Resend y usá `contacto@tu-dominio.com` como remitente.

### 2. Render (Web Service con Docker)
- New → Web Service → repo de GitHub. Root Directory: `backend/PortfolioApi`. Runtime: Docker. Instance type: Free.
- Variables de entorno (el doble guion bajo reemplaza a los dos puntos):

```
PORT=8080
Cors__AllowedOrigins__0=https://tu-sitio.pages.dev
Email__Provider=Resend
Email__ResendApiKey=re_xxxxxxxx
Email__FromAddress=onboarding@resend.dev
Email__To=lucascambas@gmail.com
```

- Health check path: `/health`.
- Plan gratis: se duerme tras 15 min sin tráfico y tarda ~1 minuto en despertar.

### 3. Frontend (Cloudflare Pages)
- Build command: `npm run build`, output: `dist`, root: `frontend`.
- Variable de entorno de build: `VITE_API_URL=https://tu-api.onrender.com`
