# My Notes - Mobile First v2.0

Mobile-first notes + customers CRUD built with Next.js 14 + Supabase + Tailwind.

## Features
- Mobile-first: bottom tab bar, top header, slide drawer, 44px touch targets
- Desktop: sticky sidebar w/ search + tag filter
- Notes with #tag parsing
- Customers CRUD
- Auth (Supabase)
- Optimistic deletes

## Structure
```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  layout/DesktopSidebar.tsx, MobileHeader.tsx, MobileDrawer.tsx, BottomNav.tsx
  dashboard/DashboardView.tsx
  notes/NotesView.tsx
  customers/CustomersView.tsx
lib/
  supabase.ts
  format.ts
```

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and add your Supabase keys
3. Create tables `notes` and `customers` in Supabase:
```sql
create table notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  details text,
  tags text[],
  user_id uuid references auth.users,
  created_at timestamp default now()
);
create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company text,
  details text,
  user_id uuid references auth.users,
  created_at timestamp default now()
);
-- Enable RLS and policies for user_id = auth.uid()
```
4. `npm run dev`

## Deploy
Push to GitHub and deploy on Vercel. Add env vars in Vercel dashboard.
