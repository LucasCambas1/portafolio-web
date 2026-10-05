# Portafolio web - Lucas Cambas Sánchez

Portafolio personal en español e inglés. Frontend en React + Vite + TypeScript + Tailwind.
La API de contacto en .NET (ASP.NET Core) está en `backend/`: ver `backend/README.md`.

## Cómo correrlo

Requisitos: Node.js 20.19 o superior (o 22.12+).

```bash
cd frontend
npm install
npm run dev
```

Se abre en http://localhost:5173.

## Dónde editar cada cosa

- Textos en español: `frontend/src/locales/es.json`
- Textos en inglés: `frontend/src/locales/en.json`
- Email, LinkedIn, GitHub y lista de proyectos: `frontend/src/data/site.ts`
- Capturas de proyectos: copiá las imágenes en `frontend/public/projects/` y poné la ruta en `image` (ej. `/projects/syscar.png`) dentro de `site.ts`
- Colores y tipografías: `frontend/src/index.css` (bloque `@theme`)

## Formulario de contacto

El formulario hace `POST {VITE_API_URL}/api/contact`. Copiá `frontend/.env.example` a `frontend/.env`
(ya apunta a `http://localhost:5080`, donde corre la API en desarrollo).

Para probar todo junto, abrí dos terminales:

```bash
# Terminal 1: API
cd backend/PortfolioApi
dotnet run

# Terminal 2: front
cd frontend
npm run dev
```
