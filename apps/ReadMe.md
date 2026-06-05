# Supabase & Bun Tech Stack Exploration

This repository is a technical POC (Proof of Concept) for integrating a modern full-stack environment using **Bun** as the runtime and **Supabase** for the backend infrastructure.

## Project Structure

- `/apps/supabase-front`: A React + TypeScript frontend built with Vite.
- `/apps/supabase-back`: A Bun-based backend service.
- `/apps/supabase-local`: Local Supabase configuration and Docker setups.

## Key Features Implemented

- **Local Development:** Full Supabase stack running locally via Docker/CLI.
- **Type Safety:** Shared TypeScript types across the stack.
- **Modern Runtime:** Leveraging Bun for faster installation and execution.
- **Database:** PostgreSQL schema with Row Level Security (RLS) basics.

## Setup

1. Clone the repo.
2. Install dependencies: `bun install`.
3. Set up your `.env` based on `.env.example` in `/apps/supabase-front`.

### Database Setup

This project uses **Supabase CLI** for database versioning.
To set up the database schema locally:

1. Navigate to `apps/supabase-local`
2. Ensure you have the [Supabase CLI](https://supabase.com/docs/guides/cli) installed.
3. Run `supabase start` in the `apps/supabase-local` directory.
4. The migrations in `/supabase/migrations` will automatically run, creating the `tasks` table and RLS policies.

- If not, run `supabase db reset` to force-apply the schema.
