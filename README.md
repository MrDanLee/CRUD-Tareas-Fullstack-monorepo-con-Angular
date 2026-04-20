# Task Board — Fullstack Monorepo

Aplicación de gestión de tareas construida como proyecto de aprendizaje para explorar el stack NestJS + Angular + Laravel en un monorepo.

**Demo en vivo:** https://crud-tareas-fullstack-monorepo-con.vercel.app

## Stack

- **Backend principal:** NestJS 11 + TypeORM + PostgreSQL
- **Frontend:** Angular 21 + RxJS + Tailwind (configurado)
- **Backend alternativo:** Laravel 13 + Eloquent + MySQL (implementación paralela para comparar arquitecturas)
- **Auth:** JWT con `@nestjs/passport` + bcrypt
- **Documentación API:** Swagger (disponible en `/api`)
- **Deploy:** Render (API + DB) + Vercel (frontend)

## Estructura del monorepo

```
task-board/
├── apps/
│   ├── api/           Backend NestJS (producción)
│   ├── web/           Frontend Angular
│   └── laravel-api/   Backend Laravel (comparación)
└── package.json       npm workspaces
```

## Funcionalidades

- Registro y login de usuarios con JWT
- CRUD completo de tareas protegido por autenticación
- Relación User ↔ Task (cada tarea pertenece a su creador)
- Filtrado de tareas por estado (OPEN / IN_PROGRESS / DONE)
- Cambio de estado en tiempo real desde la UI
- Validación de DTOs con `class-validator`
- Hash de contraseñas con bcrypt + exclusión del password en las respuestas

## Comparativa NestJS vs Laravel

El mismo CRUD implementado en ambos frameworks para entender las diferencias de filosofía:

| Aspecto | NestJS | Laravel |
|---|---|---|
| Separación de capas | Explícita (Module + Controller + Service + DTOs + Entity) | Compacta (Controller + Model) |
| ORM | TypeORM con `@InjectRepository` | Eloquent estático |
| Validación | DTOs con `class-validator` | `$request->validate()` inline |
| Rutas CRUD | 5 métodos con decoradores HTTP | `Route::apiResource` en 1 línea |
| Binding de parámetros | Manual vía `findOne(id)` | Route Model Binding automático |

## Cómo ejecutarlo localmente

Requisitos: Node.js 20+, PHP 8.3+, Composer, MySQL, PostgreSQL

```bash
# Instalar dependencias del monorepo
npm install

# Backend NestJS
cd apps/api
npm run start:dev   # http://localhost:3000

# Frontend Angular
cd apps/web
npm start           # http://localhost:4200

# Backend Laravel (opcional)
cd apps/laravel-api
php artisan serve   # http://localhost:8000
```

## Variables de entorno

La API espera estas variables (ver `apps/api/src/app.module.ts`):

```
DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE
JWT_SECRET
FRONTEND_URL
```

## Endpoints principales (NestJS API)

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `POST` | `/auth/register` | No | Crear usuario |
| `POST` | `/auth/login` | No | Login → devuelve JWT |
| `GET` | `/tasks` | JWT | Listar tareas (query `?status=` para filtrar) |
| `POST` | `/tasks` | JWT | Crear tarea |
| `GET` | `/tasks/:id` | JWT | Obtener tarea |
| `PATCH` | `/tasks/:id` | JWT | Actualizar tarea |
| `DELETE` | `/tasks/:id` | JWT | Eliminar tarea |
