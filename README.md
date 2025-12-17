# @tzylo/auth-middleware

Framework-agnostic authentication middleware for **Express** and **Fastify**, built for **Tzylo Auth CE**.

* 🔐 JWT authentication
* ⚡ Express & Fastify adapters
* 🧩 Fully typed `req.user` / `request.user`
* 🧱 Designed for SDK and platform usage

---

## Installation

```bash
npm install @tzylo/auth-middleware jsonwebtoken
```

Install the framework you use (peer dependency):

```bash
npm install express
# or
npm install fastify
```

---

## Supported Frameworks

| Framework | Version |
| --------- | ------- |
| Express   | ^4, ^5  |
| Fastify   | ^5      |

---

## Quick Start

### Express

```ts
import express from "express";
import {
  authMiddleware,
  roleMiddleware
} from "@tzylo/auth-middleware";

const app = express();

app.use(
  authMiddleware({
    jwtSecret: process.env.JWT_SECRET!
  })
);

app.get("/protected", (req, res) => {
  res.json({
    userId: req.user?.id
  });
});

app.get(
  "/admin",
  roleMiddleware("admin"),
  (req, res) => {
    res.send("Welcome Admin");
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

### Fastify

```ts
import Fastify from "fastify";
import {
  fastifyAuth,
  fastifyRole
} from "@tzylo/auth-middleware";

const app = Fastify();

app.addHook(
  "preHandler",
  fastifyAuth({
    jwtSecret: process.env.JWT_SECRET!
  })
);

app.get("/protected", async (request) => {
  return {
    userId: request.user?.id
  };
});

app.get(
  "/admin",
  {
    preHandler: fastifyRole("admin")
  },
  async () => {
    return "Welcome Admin";
  }
);

app.listen({ port: 3000 });
```

---

## Role-Based Authorization

```ts
roleMiddleware("admin")
roleMiddleware(["admin", "moderator"])
```

```ts
fastifyRole("admin")
fastifyRole(["admin", "moderator"])
```

Requests without required roles will be rejected with **403 Forbidden**.

---

## Request User Object

After successful authentication, a `user` object is attached to the request.

### Type Definition

```ts
export interface AuthUser {
  id: string;
  email?: string;
  role?: string;
}
```

### Accessing the user

| Framework | Property       |
| --------- | -------------- |
| Express   | `req.user`     |
| Fastify   | `request.user` |

The user object is **fully typed** via TypeScript module augmentation.

---

## API Reference

### `authMiddleware(options)`

Express authentication middleware.

```ts
authMiddleware({
  jwtSecret: string;
})
```

---

### `fastifyAuth(options)`

Fastify authentication hook.

```ts
fastifyAuth({
  jwtSecret: string;
})
```

---

### `roleMiddleware(role)`

Express role-based authorization middleware.

```ts
roleMiddleware("admin")
roleMiddleware(["admin", "moderator"])
```

---

### `fastifyRole(role)`

Fastify role-based authorization hook.

```ts
fastifyRole("admin")
fastifyRole(["admin", "moderator"])
```

---

## TypeScript Support

* Zero `any`
* No manual casting
* Auto-typed request user
* Works out-of-the-box

---

## Design Principles

* Frameworks as **peer dependencies**
* Core auth logic is framework-agnostic
* Thin adapters for each framework
* Stable public API (no deep imports)

---

## Part of Tzylo Auth CE

This middleware is part of the **Tzylo Auth CE** ecosystem.

Planned components:

* Auth service
* SDKs
* Middleware
* Monitoring & messaging

---

## License

MIT © K B Pramod

---

## Contributing

Issues and pull requests are welcome.
This project is evolving as part of **Tzylo**.