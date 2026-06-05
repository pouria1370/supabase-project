# Supabase Frontend (React + TS)

This is a modern React application built with **Vite** and **TypeScript**, showcasing a deep integration with Supabase features.

## Key Features Implemented

- **Full Auth Flow:** Custom Login and Registration using Supabase Auth.
- **Realtime Database:** Synchronized task list using `postgres_changes` via Supabase Channels (the UI updates instantly when the database changes).
- **Storage Integration:** Handling file uploads (images) to Supabase Storage buckets.
- **Type-Safe CRUD:** Complete Create, Read, Update, and Delete operations with TypeScript interfaces.
- **Session Management:** Persistent user sessions using `onAuthStateChange`.

## Technical Highlights in Code

- **Optimistic UI/Realtime:** Used `useEffect` to subscribe to database changes so the task list remains in sync across multiple clients without manual refreshing.
- **Security:** Integrated Row Level Security (RLS) compliant queries.
- **Modular Services:** Abstracted Supabase logic into a dedicated client module (`superbase-client.ts`) for better maintainability.

## How to Run

1. Navigate to this directory: `cd apps/supabase-front`
2. Install dependencies: `bun install`
3. Create a `.env` file based on `.env.example` and add your Supabase credentials:

```text
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key

```
