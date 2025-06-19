# Starter-Flare Full-Stack SaaS Boilerplate

🚀 A comprehensive boilerplate for building modern SaaS applications, designed to be deployed entirely on Cloudflare's serverless infrastructure. Leverage the full power of Cloudflare Workers, D1, KV, R2, and more.

This boilerplate provides a robust starting point with React (SSR via React Router), Hono for the backend API, Drizzle ORM for database interactions, Tailwind CSS with Shadcn/ui for styling, and `better-auth` for authentication.

## ✨ Features

*   **Full-Stack & Serverless:** Frontend and backend deployed as a single Cloudflare Worker.
*   **Modern Frontend:**
    *   React 19 with Server-Side Rendering (SSR) via React Router 7.
    *   Vite for fast development and optimized builds.
    *   Tailwind CSS & Shadcn/ui for a beautiful, customizable UI.
    *   Lucide Icons for a rich icon set.
    *   Dark/Light mode support with `remix-themes`.
*   **Robust Backend:**
    *   Hono: Fast, lightweight, and flexible web framework for Cloudflare Workers.
    *   RPC-style API routes.
*   **Database & Storage:**
    *   Cloudflare D1: SQL database with Drizzle ORM for type-safe queries.
    *   Cloudflare KV: For key-value storage (e.g., session data, caching).
    *   Cloudflare R2: For object storage (configured, ready for use).
*   **Authentication:**
    *   `better-auth`: Handles Email/Password and Google OAuth.
    *   Email verification and password reset flows.
*   **Development Experience:**
    *   TypeScript for end-to-end type safety.
    *   Biome for fast linting and formatting.
    *   Drizzle Kit for database schema management and migrations.
    *   Local development with Wrangler, including local D1 database.
    *   Pre-commit hooks with `lint-staged` and `simple-git-hooks`.
*   **Deployment:**
    *   Seamless deployment to Cloudflare Workers.
    *   Support for staging and production environments.
*   **Security:**
    *   Secure HTTP headers configured via Hono middleware.
    *   CORS setup.
*   **Emailing:**
    *   Integration with Resend for transactional emails.

## 🛠️ Tech Stack

*   **Framework:** React Router (SSR), Hono (Backend API)
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS, Shadcn/ui, `clsx`, `tailwind-merge`
*   **UI Components:** Radix UI primitives
*   **Icons:** Lucide React
*   **State Management/Routing:** React Router
*   **ORM:** Drizzle ORM (with SQLite dialect for D1)
*   **Authentication:** `better-auth`
*   **Validation:** Zod
*   **Linting/Formatting:** Biome
*   **Deployment:** Cloudflare Workers, Wrangler
*   **Cloudflare Services:**
    *   Workers (Compute)
    *   D1 (SQL Database)
    *   KV (Key-Value Store)
    *   R2 (Object Storage)
    *   Pages (for static assets, managed by Wrangler effectively)
