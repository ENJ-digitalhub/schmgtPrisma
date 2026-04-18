# School Management System API

`schmgtPrisma` is a backend school management project built with `Node.js`, `Express`, `Prisma`, and `PostgreSQL`.

The aim of the project is to provide a clean and scalable foundation for managing the core operations of a school system, including students, teachers, parents, classes, subjects, attendance, grades, fee payments, and administration.

The project is structured as a modular backend so that each feature can grow independently without turning the codebase into a single large, tightly coupled application.

## Project Vision

This project is intended to serve as the backend engine for a school management platform.

It is designed to support real academic and administrative workflows such as:

- school onboarding and administration
- student record management
- teacher record management
- parent-student relationships
- class and subject organization
- session-based teaching records
- attendance tracking
- grading and academic performance tracking
- fee payment recording
- authentication and access control for administrators

The long-term idea is to build a backend that is easy to maintain, easy to extend, and reliable enough for real institutional use.

## Tech Stack

- `Node.js`
- `Express`
- `Prisma ORM`
- `PostgreSQL`
- `dotenv`
- `cookie-parser`
- `jsonwebtoken`
- `bcryptjs`
- `nodemon`

## Current State

The project currently has:

- Prisma configured and connected through `prisma.config.ts`
- a database schema defined in [`prisma/schema.prisma`](/abs/path/c:/Users/Hp/Documents/schmgtPrisma/prisma/schema.prisma:1)
- initial migration files in `prisma/migrations/`
- Express bootstrap files in [`src/app.js`](/abs/path/c:/Users/Hp/Documents/schmgtPrisma/src/app.js:1) and [`src/server.js`](/abs/path/c:/Users/Hp/Documents/schmgtPrisma/src/server.js:1)
- shared infrastructure scaffolds for config, Prisma, events, middleware, and utilities
- a feature-based `school` module implemented under [`src/modules/school`](/abs/path/c:/Users/Hp/Documents/schmgtPrisma/src/modules/school)

The runtime layer is still in an early scaffold phase, but the project structure now matches the intended architecture and is ready for feature implementation.

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

    lib/
      eventBus.js
      prisma.js

    middlewares/
      auth.middleware.js
      errorHandler.js
      notFound.js

    modules/
      school/
        school.controller.js
        school.events.js
        school.listeners.js
        school.repository.js
        school.router.js
        school.service.js

    utils/
      apiResponse.js
      asyncHandler.js

  .env
  .gitignore
  package.json
  package-lock.json
  prisma.config.ts
  README.md
  workFlow.md
```

## Database Domain Coverage

The current Prisma schema already models the key parts of a school system:

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
- `Admin`

This is a strong starting point because it captures both academic operations and administrative records in a connected relational structure.

## Implemented Architecture

The project follows a modular feature workflow where each module is expected to handle a specific domain area and separate responsibilities across:

- `router`
- `controller`
- `service`
- `repository`
- `listeners`
- `events`

The current `school` module already reflects this structure and is mounted in the app.

The intended request flow is:

```text
server -> app -> router -> controller -> service -> repository -> prisma -> database
```

The intended side-effect flow for event-driven behavior is:

```text
service -> event bus -> listeners
```

This design helps keep the codebase organized as the application grows.

## Workflow Documentation

The project workflow and folder philosophy are explained in more detail here:

- [Project Workflow Guide](./workFlow.md)

That document explains:

- why the project is structured the way it is
- how requests are expected to move through the app
- how the service and repository layers should work together
- how `EventEmitter`-based listeners fit into the architecture

## Available Scaffolds

The repository already includes working placeholders for:

- `GET /health` to confirm the API is up
- `GET /api/v1/schools` for module status
- `POST /api/v1/schools` for the school creation flow scaffold
- shared error and not-found middleware
- a shared event bus
- a shared Prisma client file

These are lightweight scaffolds meant to establish the shape of the codebase before deeper business logic is added.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create or update your `.env` file with your database connection string and any other required environment values.

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=3000
```

### 3. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 4. Generate Prisma client if needed

```bash
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

## Development Direction

The next practical milestones for the project are:

- connect repositories to the real Prisma models
- implement the `school` module beyond placeholder logic
- add validation for requests and payloads
- expand modules for `auth`, `student`, `teacher`, and `payments`
- introduce tests for routes, services, and repositories
- add authentication and authorization middleware

As the project grows, new modules can follow the same folder pattern already established by the `school` feature.

## Why This Project Matters

A school management system is more than a CRUD app. It sits at the center of how an institution tracks learning, accountability, communication, and operations.

When built well, a system like this can help schools:

- keep accurate academic records
- reduce administrative friction
- improve coordination between staff and parents
- monitor student performance more effectively
- track attendance and payments reliably
- create a stronger operational backbone for growth

The importance of this project is that it aims to turn complex school processes into a structured and dependable system. Done properly, it can support better organization, better decisions, and a better educational experience overall.
