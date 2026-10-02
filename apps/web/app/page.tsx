# Database Schema

```sql
create table if not exists public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  email text,
  full_name text,
  business_title text,
  created_at timestamp with time zone default now()
);

create table if not exists public.items (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  name text not null,
  category text default 'Umum',
  unit text default 'pcs',
  stock integer not null default 0,
  created_at timestamp with time zone default now()
);

create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  item_id uuid references public.items on delete cascade not null,
  type text not null check (type in ('in', 'out')),
  quantity integer not null default 0,
  notes text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;
alter table public.items enable row level security;
alter table public.transactions enable row level security;

create policy "Users can view their profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert their profile" on public.profiles for insert with check (auth.uid() = id);

create policy "Users can view their items" on public.items for select using (auth.uid() = user_id);
create policy "Users can insert their items" on public.items for insert with check (auth.uid() = user_id);
create policy "Users can update their items" on public.items for update using (auth.uid() = user_id);
create policy "Users can delete their items" on public.items for delete using (auth.uid() = user_id);

create policy "Users can view their transactions" on public.transactions for select using (auth.uid() = user_id);
create policy "Users can insert their transactions" on public.transactions for insert with check (auth.uid() = user_id);
create policy "Users can update their transactions" on public.transactions for update using (auth.uid() = user_id);
create policy "Users can delete their transactions" on public.transactions for delete using (auth.uid() = user_id);
```

## Catatan

Untuk demo cepat, Anda bisa men-disable email verification di Supabase Auth. Untuk produksi, tetap aktifkan verification dan atur email provider yang benar.
