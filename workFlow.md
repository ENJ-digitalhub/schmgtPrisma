# Workflow Guide

This document describes how the entire project should be implemented and maintained so that a developer can always tell:

- where a new feature belongs
- which layer should own the logic
- how modules should interact
- how authentication should be applied
- how documentation should be kept in sync with the code

## Architecture Principles

The codebase is organized by feature, not by technical layer alone.

Each business area owns its own:

- router
- controller
- service
- repository
- events
- listeners

That structure reduces file sprawl and keeps related logic together.

## Application Flow

The main runtime flow is:

```text
server -> app -> router -> controller -> service -> repository -> prisma -> database
```

The side-effect flow is:

```text
service -> eventBus -> listeners
```

Use the first flow for the main business operation.

Use the second flow only for follow-up work such as:

- logs
- analytics
- audit records
- notifications

## Layer Responsibilities

### `server.js`

Owns application startup only.

It should:

- create the HTTP server
- import listener registration files
- start listening on the configured port

It should not contain route logic or business rules.

### `app.js`

Owns application assembly.

It should:

- register global middleware
- enable JSON parsing
- enable cookie parsing
- mount Swagger docs
- mount routers
- register not-found handling
- register error handling

### `*.router.js`

Owns endpoint definitions.

It should:

- map methods and paths to controllers
- apply authentication middleware
- apply role-based authorization where needed
- contain OpenAPI JSDoc annotations for route documentation

It should not contain database or business logic.

### `*.controller.js`

Owns request/response coordination.

It should:

- read request input
- call the right service
- return consistent API responses
- avoid deep decision-making

### `*.service.js`

Owns business rules.

It should:

- validate business conditions
- orchestrate multi-step operations
- call repositories
- call reusable auth helpers where appropriate
- emit domain events after successful actions

### `*.repository.js`

Owns persistence logic.

It should:

- run Prisma queries
- return data to the service layer
- stay free from policy decisions

### `*.events.js`

Owns event names.

It should define constants that prevent event-name duplication.

### `*.listeners.js`

Owns side-effect behavior.

It should subscribe to domain events and run logic that does not belong in the critical request path.

## Shared Infrastructure

### `src/config/env.js`

Centralizes environment configuration for:

- `PORT`
- `DATABASE_URL`
- JWT secrets

### `src/lib/prisma.js`

Provides the shared Prisma client used across repositories.

### `src/lib/jwt.js`

Provides token helpers for:

- access token signing
- refresh token signing
- access token verification
- refresh token verification

### `src/lib/eventBus.js`

Provides the shared event emitter for the entire application.

### `src/middlewares/auth.middleware.js`

Provides:

- `authMiddleware` for authentication
- `permit(...roles)` for authorization

Routes that require protection should use these helpers at the router layer.

### `src/utils/apiResponse.js`

Standardizes success and error payload structure.

### `src/utils/asyncHandler.js`

Wraps async controllers and forwards thrown errors to Express error middleware.

## Documentation Workflow

Documentation is part of the implementation workflow, not an afterthought.

This project uses:

- JSDoc comments for code-level documentation
- `swagger-jsdoc` to generate the OpenAPI spec
- `swagger-ui-express` to serve interactive API documentation

### Documentation rules for developers

When adding or changing a route:

1. update the router
2. add or update the JSDoc OpenAPI block above the route
3. make sure the request and response schema are reflected in `src/docs/swagger.js`
4. update `README.md` if the public API surface changes
5. update `workFlow.md` if the architectural workflow changes

This keeps implementation and documentation aligned.

## Module Guide

## `auth`

### Purpose

The `auth` module owns user identity and access control.

### Owns

- registration
- login
- logout
- refresh token flow
- current user lookup
- reusable auth user creation
- password hashing
- password verification

### Does not own

- school onboarding
- student profile creation
- teacher profile creation
- parent profile creation
- payment flows

### Current flow

Typical auth request:

```text
router -> controller -> service -> repository -> prisma
```

Protected route flow:

```text
router -> authMiddleware -> permit(...) -> controller -> service
```

### Key rule

`auth` owns the `User` record.

Other modules own the related profile records.

## `school`

### Purpose

The `school` module owns school administration and admin onboarding.

### Owns

- creating school admin profiles
- school-level admin lookup
- school-admin onboarding workflows

### Current implementation pattern

When creating an admin:

1. `school.service.js` validates the payload
2. it calls `createAuthUser(...)` from the `auth` module
3. it creates the `Admin` profile through the school repository
4. it emits `school.admin_created`
5. it returns a safe admin response

### Key rule

`school` does not hash passwords or create raw `User` rows directly.

It delegates identity creation to `auth`.

## `student`

### Purpose

The `student` module owns student-facing domain behavior.

### Owns

- student onboarding
- student profile creation
- student retrieval
- student-specific academic workflows

### Current implementation state

The router/controller/service/repository structure is in place.

The current repository layer is scaffolded and ready to be replaced with full Prisma-backed logic.

### Key rule

If a student needs login access:

1. create the auth identity first
2. create the student profile second

## `teacher`

### Purpose

The `teacher` module owns teacher profiles and teacher-driven academic operations.

### Owns

- teacher onboarding
- teacher profile management
- attendance and grading workflows
- teaching-session related logic

### Current implementation state

The module structure exists and is protected with admin-only scaffolding routes.

The repository layer can now be expanded into full domain logic.

### Key rule

Teacher business rules stay in `teacher.service.js`, not in middleware or controllers.

## `parent`

### Purpose

The `parent` module owns parent records and parent-student relationships.

### Owns

- parent onboarding
- parent profile management
- linking parents to students
- parent-scoped access rules

### Current implementation state

The module is scaffolded and ready for richer relationship logic using the `StudentParent` model.

### Key rule

Authorization checks for parent access should always happen before returning child-related data.

## `payments`

### Purpose

The `payments` module owns fee and payment workflows.

### Owns

- recording payments
- listing payments
- payment summaries
- finance-related side effects such as receipts or logs

### Current implementation state

The module is scaffolded with protected endpoints and event hooks.

### Key rule

Payment rules belong in the service layer, while persistence belongs in the repository layer.

## Current Route Map

The application currently exposes:

- `GET /health`
- `GET /api/docs`
- `GET /api/docs.json`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/schools/admins`
- `GET /api/schools/admins`
- `GET /api/schools/admins/:email`
- `GET /api/students`
- `POST /api/students`
- `GET /api/teachers`
- `POST /api/teachers`
- `GET /api/parents`
- `POST /api/parents`
- `GET /api/payments`
- `POST /api/payments`

The detailed request and response shapes are served from Swagger at `/api/docs`.

## Development Workflow For New Features

When implementing a new feature, use this sequence:

1. Choose the owning module.
2. Add or update the route in that module.
3. Add or update the JSDoc route documentation.
4. Implement the controller.
5. Implement the service logic.
6. Implement or update the repository query.
7. Protect the route with auth if required.
8. Emit events for non-critical side effects.
9. Register listeners if those side effects need handlers.
10. Update `README.md` or this workflow guide if the public behavior or architecture changed.

## Practical Rules

- Keep routers thin.
- Keep controllers thin.
- Keep services smart.
- Keep repositories focused on Prisma.
- Keep event names centralized.
- Keep listeners side-effect only.
- Keep auth focused on identity and access control.
- Keep public route documentation in JSDoc blocks close to the route definitions.
- Never duplicate user-creation logic across modules.

## Summary

The project is healthy when these rules are true:

- `auth` owns identity
- domain modules own business behavior
- middleware protects routes
- services enforce rules
- repositories talk to Prisma
- listeners handle side effects
- JSDoc and Swagger stay aligned with the code

If developers follow that structure consistently, the codebase remains predictable, scalable, and easy to extend.
