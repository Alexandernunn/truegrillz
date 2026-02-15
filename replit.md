# Overview

Good Vibe Tribe is a nonprofit website for a Nashville, Tennessee-based community relief organization. It's a single-page scrolling site with sections for Home, About, Programs, Impact, Events, and Contact. The site features smooth scroll navigation, animated counters, parallax effects, a contact form that submits to a database, and an events listing pulled from a PostgreSQL database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework**: React 18 with TypeScript, bundled by Vite
- **Routing**: Wouter (lightweight router), though the app is essentially a single-page scroll site with one route (`/`)
- **Styling**: Tailwind CSS with custom CSS variables for the brand palette (red `#F83030`, green `#18A058`, dark teal `#1E4E48`)
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives — all components live in `client/src/components/ui/`
- **Animations**: Framer Motion for scroll animations, parallax, and mobile menu transitions
- **Scrolling**: `react-scroll` for smooth anchor navigation between sections
- **Counters**: `react-countup` with `react-intersection-observer` for animated impact statistics
- **Data Fetching**: TanStack React Query for server state management
- **Fonts**: Poppins (headings/display) and Figtree (body text) via Google Fonts
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`, `@assets/` maps to `attached_assets/`

## Backend
- **Runtime**: Node.js with Express
- **Language**: TypeScript, executed via `tsx` in development
- **API Structure**: Two REST endpoints defined in `server/routes.ts`:
  - `POST /api/contact` — submits a contact form (validated with Zod)
  - `GET /api/events` — returns list of community events
- **API Contract**: Shared route definitions in `shared/routes.ts` with Zod schemas for type-safe request/response contracts
- **Dev Server**: Vite dev server is integrated as Express middleware (see `server/vite.ts`) with HMR support
- **Production Build**: Vite builds the client to `dist/public/`, esbuild bundles the server to `dist/index.cjs`

## Database
- **Database**: PostgreSQL (required via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation integration
- **Schema** (in `shared/schema.ts`):
  - `contact_submissions` — stores contact form entries (id, name, email, subject, message, createdAt)
  - `events` — stores community events (id, title, description, date as text, location, category, imageUrl)
- **Migrations**: Drizzle Kit with `drizzle-kit push` command (no migration files committed, uses push strategy)
- **Seeding**: `server/seed.ts` seeds initial events if none exist

## Storage Layer
- `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class
- This abstraction makes it possible to swap storage implementations if needed

## Build Process
- `npm run dev` — runs the dev server with Vite HMR
- `npm run build` — builds client (Vite) and server (esbuild) to `dist/`
- `npm run start` — serves production build
- `npm run db:push` — pushes Drizzle schema to PostgreSQL

# External Dependencies

- **PostgreSQL** — primary database, connected via `DATABASE_URL` environment variable using `pg` (node-postgres) with connection pooling
- **Google Fonts** — Poppins and Figtree font families loaded via CSS import
- **Unsplash** — placeholder images referenced by URL in the Home page
- **Wix Static Media** — actual organization photos hosted on Wix CDN, referenced by URL
- **Instagram** — social media links to `@goodvibetribe615`
- **Replit Plugins** — `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, and `@replit/vite-plugin-dev-banner` for development environment integration