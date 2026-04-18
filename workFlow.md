<div style="background:#050505; color:#f5f5f5; padding:32px; border-radius:20px; font-family:Segoe UI, Helvetica, Arial, sans-serif; line-height:1.7;">

# Workflow Guide

<p style="font-size:16px; color:#d4d4d4;">
This document explains the intended workflow behind the proposed folder structure for this project. The goal of the structure is not just to arrange files neatly, but to create a predictable path for requests, business logic, database access, and event-driven side effects.
</p>

---

## Overview

The structure is designed around <strong>features</strong>, not just file types.

That means each major business area, such as <code>school</code>, <code>student</code>, <code>teacher</code>, or <code>auth</code>, owns its own files inside a dedicated module folder.

Instead of putting all controllers in one place, all services in another place, and all routes in another place, each feature keeps its related pieces together.

This makes the codebase easier to:

- understand
- extend
- debug
- scale
- hand off to another developer later

---

## Suggested Structure

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
      prisma.js
      eventBus.js

    middlewares/
      errorHandler.js
      notFound.js
      auth.middleware.js

    modules/
      school/
        school.router.js
        school.controller.js
        school.service.js
        school.repository.js
        school.listeners.js
        school.events.js

      student/
        student.router.js
        student.controller.js
        student.service.js
        student.repository.js
        student.listeners.js
        student.events.js

      teacher/
        teacher.router.js
        teacher.controller.js
        teacher.service.js
        teacher.repository.js
        teacher.listeners.js
        teacher.events.js

      auth/
        auth.router.js
        auth.controller.js
        auth.service.js
        auth.repository.js
        auth.listeners.js
        auth.events.js

    utils/
      apiResponse.js
      asyncHandler.js

  .env
  .gitignore
  package.json
  package-lock.json
  prisma.config.ts
```

---

## Core Idea

The workflow is built on three main paths:

### 1. HTTP Request Flow
This handles incoming API requests from the client.

### 2. Business Logic Flow
This handles decisions, rules, and application behavior.

### 3. Event Flow
This handles side effects after important actions happen.

Each path has a clear responsibility so that no one file becomes overloaded.

---

## Request Lifecycle

### ⚫ 1. `server.js` starts the application

This is the boot file for the Node server.

Its job is to:

- create the HTTP server
- choose the port
- start listening for requests

It should stay very small.

It is not supposed to contain business logic, route definitions, or database code.

### ⚫ 2. `app.js` builds the Express application

This file prepares the app itself.

Its job is to:

- register middleware
- enable JSON parsing
- enable cookie parsing
- mount module routers
- plug in not-found and error handlers

This is the assembly point of the app.

Think of `server.js` as the switch that turns the machine on, and `app.js` as the place where the machine is assembled.

### ⚫ 3. `*.router.js` defines endpoints

Example:

- `school.router.js`
- `student.router.js`
- `auth.router.js`

The router's responsibility is to connect a URL and HTTP method to the correct controller function.

Example:

```js
router.post('/schools', createSchool);
router.get('/schools/:id', getSchoolById);
```

The router should stay simple.

It should not contain:

- business rules
- Prisma queries
- event logic

Its job is only to map requests to handlers.

### ⚫ 4. `*.controller.js` handles the request and response

The controller sits between Express and your application logic.

Its job is to:

- read `req.params`, `req.body`, `req.query`, and `req.user`
- call the correct service method
- return the final HTTP response
- forward errors to middleware

The controller should know about Express.

That means it can work with `req`, `res`, and `next`.

But it should not be where deep business decisions are made.

A controller should mostly coordinate, not think.

### ⚫ 5. `*.service.js` contains business logic

This is one of the most important layers.

The service decides how the feature behaves.

It answers questions like:

- Can this school be created?
- Does this user have permission?
- Should an event be emitted after the record is created?
- Should two repository calls happen in sequence?
- Should extra derived data be prepared before saving?

The service should be the brain of the module.

It should not care about:

- Express response formatting
- raw route definitions

But it should care deeply about:

- application rules
- process orchestration
- feature behavior

### ⚫ 6. `*.repository.js` talks to Prisma

The repository is the data-access layer.

Its job is to:

- create records
- read records
- update records
- delete records
- run queries with Prisma

This layer should be focused on persistence.

It should not decide policy or business meaning.

For example, the repository should not decide whether a school is allowed to be created. It should only know how to create it once the service has already decided it should happen.

### ⚫ 7. `lib/prisma.js` provides a shared Prisma client

Instead of creating a new Prisma client inside every repository, this file centralizes it.

That gives you:

- one reusable connection point
- cleaner imports
- more consistent database access

This helps the rest of the app stay uniform.

---

## Event-Driven Workflow

Since you mentioned that `listeners` will be used for Node `EventEmitter` functions, this becomes a second important workflow in the application.

The event flow is meant for <strong>side effects</strong>.

A side effect is something that should happen after an action is completed, but should not clutter the main request flow.

Examples:

- after a school is created, log the action
- after a student is enrolled, notify another part of the app
- after a payment is recorded, trigger a receipt process
- after an admin is created, emit an onboarding event

### ⚫ Event flow pattern

```text
service -> eventBus -> listeners
```

### ⚫ `lib/eventBus.js`

This file contains the shared `EventEmitter` instance.

Its purpose is to act as the central event channel for the app.

Instead of every module creating its own isolated emitter, the project can use one event bus so listeners across modules can react to application events consistently.

### ⚫ `*.events.js`

This file can store event names and helper functions.

Example purpose:

- keep event names consistent
- avoid repeating string literals everywhere
- make refactoring easier later

Example:

```js
export const SCHOOL_EVENTS = {
  CREATED: 'school.created',
  UPDATED: 'school.updated',
};
```

This is useful because raw strings scattered across files become hard to maintain.

### ⚫ `*.listeners.js`

This file registers handlers for events that belong to the module.

Its job is to say:

- when event `school.created` happens, run this logic
- when event `student.enrolled` happens, run this logic

Listeners are best used for:

- logging
- notifications
- audit trails
- analytics
- decoupled follow-up actions

They should not replace the normal service layer.

That is important.

Your main business flow should still be handled through the request path:

`router -> controller -> service -> repository`

Listeners should support that flow, not compete with it.

---

## Why Feature Modules Are Better Here

In this kind of app, business areas are naturally separate.

For example:

- `school` manages school-level data
- `student` manages student records
- `teacher` manages teacher records
- `auth` manages login, tokens, and access control

If all routers, controllers, services, and repositories were stored in global folders, the codebase would quickly become harder to scan.

Feature modules solve that by keeping everything related to one feature together.

That means when you work on student enrollment, you mostly stay inside the `student` module. When you work on school registration, you mostly stay inside the `school` module.

This reduces mental switching.

It also makes the project easier to grow.

---

## Intended Responsibilities By Folder

### 📁 `prisma/`

This folder owns the database schema and migrations.

Use it for:

- Prisma schema definitions
- migration history
- database structure

Do not use it for runtime business logic.

### 📁 `src/config/`

This folder is for app configuration.

Use it for:

- environment variable parsing
- config validation
- app-level settings

### 📁 `src/lib/`

This folder is for reusable infrastructure pieces shared by many modules.

Use it for:

- Prisma client setup
- event bus setup
- other core shared libraries

### 📁 `src/middlewares/`

This folder contains Express middleware.

Use it for:

- authentication checks
- error handling
- 404 handling
- request shaping or protection

### 📁 `src/modules/`

This is the heart of the application.

Each subfolder represents one domain feature.

Every module should be internally consistent and contain only the pieces it actually needs.

### 📁 `src/utils/`

This folder is for small reusable helpers.

Use it for:

- async wrappers
- common API response helpers
- tiny formatting utilities

Avoid letting `utils` become a dumping ground for unrelated logic.

---

## The Intended Development Workflow

When building a new feature, the intended workflow is:

### ✅ Step 1: Define the feature

Choose the feature that owns the behavior.

Examples:

- school creation belongs to `school`
- login belongs to `auth`
- student enrollment belongs to `student`

### ✅ Step 2: Add the route

Create the endpoint in the module's router.

This answers:

- what URL will be hit?
- what HTTP method is used?

### ✅ Step 3: Add the controller

Read request data and call the service.

This answers:

- what data is coming from the request?
- what service function should handle it?

### ✅ Step 4: Add the service logic

This is where the feature's actual rules are implemented.

This answers:

- what should happen?
- in what order?
- under what conditions?

### ✅ Step 5: Add repository operations

Write the Prisma queries needed for the feature.

This answers:

- what should be saved?
- what should be fetched?
- what should be updated?

### ✅ Step 6: Emit events if needed

If the completed action should trigger additional behavior, emit an event from the service.

This answers:

- does anything else need to happen after success?

### ✅ Step 7: Register listeners

Add listener logic for the event if the action has side effects.

This answers:

- what follow-up actions should happen after the main work is done?

---

## Example End-To-End Scenario

### Example: Create School

#### 🌑 Request path

1. Client sends `POST /schools`
2. `school.router.js` maps the route
3. `school.controller.js` reads `req.body`
4. `school.service.js` validates the business operation
5. `school.repository.js` saves the school with Prisma
6. service emits `school.created`
7. controller returns success response

#### 🌑 Event path

1. `eventBus` receives `school.created`
2. `school.listeners.js` catches the event
3. a side effect runs, such as:
   - logging
   - analytics
   - audit creation
   - sending a welcome notification

This keeps the main request path clean while still allowing follow-up behavior.

---

## What This Structure Protects You From

This design helps prevent common backend problems such as:

- controllers becoming too large
- routes containing business logic
- Prisma queries being scattered everywhere
- repeated event names across the project
- one giant `utils` folder carrying app logic
- side effects cluttering the main request-response cycle

In short, it creates boundaries.

Those boundaries make the app easier to reason about.

---

## Practical Rules To Follow

To keep this structure healthy, the intended rules are:

- keep controllers thin
- keep services smart
- keep repositories focused on data access
- keep listeners for side effects
- keep event names centralized
- keep shared infrastructure in `lib`
- keep each feature's files inside its own module

If you follow those rules consistently, the codebase will stay easier to scale.

---

## Final Summary

The workflow behind this structure is intended to separate concerns without scattering feature code across the whole project.

The application is meant to work in two connected layers:

### 🚀 Main request flow

```text
server -> app -> router -> controller -> service -> repository -> prisma -> database
```

### 🔔 Side-effect event flow

```text
service -> eventBus -> listeners
```

This gives you:

- clearer feature ownership
- easier maintenance
- cleaner business logic
- better scalability
- a natural place for EventEmitter-based behavior

If the app grows the way a school management system usually does, this structure should serve you well because it keeps growth organized by domain instead of letting everything pile up in shared global folders.

</div>
