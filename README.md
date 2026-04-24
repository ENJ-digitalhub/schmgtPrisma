# School Management System API

`schmgtPrisma` is a modular backend for a school management platform built with `Node.js`, `Express`, `Prisma`, and `PostgreSQL`.

The project is designed around feature modules so that authentication, school administration, student management, teacher operations, parent relationships, and payments can evolve independently without turning the codebase into a monolith.

## Overview

The system is intended to support core school workflows such as:

- authentication and access control
- school admin onboarding
- student, teacher, and parent record management
- academic operations such as attendance and grading
- fee payment recording and reporting

The codebase follows a consistent feature workflow:

```text
server -> app -> router -> controller -> service -> repository -> prisma -> database
```

Side effects follow a separate event-driven path:

```text
service -> eventBus -> listeners
```

## Tech Stack

- `Node.js`
- `Express`
- `Prisma ORM`
- `PostgreSQL`
- `cookie-parser`
- `jsonwebtoken`
- `bcryptjs`
- `swagger-jsdoc`
- `swagger-ui-express`

## Current Architecture

The project currently includes these modules under [`src/modules`](/c:/Users/Hp/Documents/schmgtPrisma/src/modules:1):

- `auth` for registration, login, refresh, logout, and identity lookup
- `school` for admin onboarding and school-level administration
- `student` for student scaffolding and student workflows
- `teacher` for teacher scaffolding and teaching workflows
- `parent` for parent scaffolding and parent-student relationships
- `payments` for fee and payment flows

Shared infrastructure lives under:

- [`src/lib`](/c:/Users/Hp/Documents/schmgtPrisma/src/lib:1) for Prisma, JWT, and event bus utilities
- [`src/middlewares`](/c:/Users/Hp/Documents/schmgtPrisma/src/middlewares:1) for auth, error, and not-found middleware
- [`src/utils`](/c:/Users/Hp/Documents/schmgtPrisma/src/utils:1) for common helpers
- [`src/docs`](/c:/Users/Hp/Documents/schmgtPrisma/src/docs:1) for Swagger/OpenAPI generation

## API Surface

The app currently mounts these route groups:

- `GET /health`
- `GET /api/docs`
- `GET /api/docs.json`
- `/api/auth`
- `/api/schools`
- `/api/students`
- `/api/teachers`
- `/api/parents`
- `/api/payments`

Interactive route documentation is available at:

- `http://localhost:5050/api/docs`

The raw generated OpenAPI spec is available at:

- `http://localhost:5050/api/docs.json`

## Authentication Model

Authentication is JWT-based and supports:

- access tokens
- refresh tokens
- cookie-based auth flows
- bearer-token route protection
- role-based authorization through `permit(...)`

The `User` model is the auth core. Domain-specific profile tables such as `Admin`, `Teacher`, `Student`, and `Parent` are created by their owning modules.

## Documentation

API documentation is generated from JSDoc comments using:

- `swagger-jsdoc`
- `swagger-ui-express`

That means route documentation stays close to the code instead of drifting into a separate manual document.

Useful commands:

```bash
npm run dev
npm run docs:json
```

## Project Structure

```text
schmgtPrisma/
  prisma/
    migrations/
    schema.prisma

  src/
    app.js
    server.js

    config/
      env.js

    docs/
      swagger.js
      print-swagger.js

    lib/
      eventBus.js
      jwt.js
      prisma.js

    middlewares/
      auth.middleware.js
      errorHandler.js
      notFound.js

    modules/
      auth/
      school/
      student/
      teacher/
      parent/
      payments/

    utils/
      apiResponse.js
      asyncHandler.js

  README.md
  workFlow.md
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create or update `.env` with at least:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=5050
JWT_SECRET_ACCESS_TOKEN="your_access_secret"
JWT_SECRET_REFRESH_TOKEN="your_refresh_secret"
```

### 3. Run database migrations

```bash
npx prisma migrate dev
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Start the API

```bash
npm run dev
```

Then open `http://localhost:5050/api/docs` to inspect the generated route documentation.

## Database Coverage

The Prisma schema already models the main educational and administrative entities, including:

- `User`
- `Admin`
- `Teacher`
- `Student`
- `Parent`
- `StudentParent`
- `Subject`
- `Class`
- `ClassSession`
- `Attendance`
- `Grade`
- `FeePayment`

This gives the project a strong foundation for both academic and operational workflows.

## Development Notes

- `auth` owns identity and access control
- domain modules own business workflows
- controllers should stay thin
- services should contain business rules
- repositories should be the only layer talking to Prisma
- listeners should only handle side effects

The detailed implementation guide is documented in [workFlow.md](/c:/Users/Hp/Documents/schmgtPrisma/workFlow.md:1).

## Status

The project now has:

- a feature-based backend structure
- working auth middleware and role guards
- modular route scaffolding across all major domains
- Swagger/OpenAPI documentation generated from JSDoc comments
- a school-admin onboarding flow wired through `auth` and `school`

Some modules are still scaffold-level in their repository layer and can now be extended cleanly without changing the architecture.
