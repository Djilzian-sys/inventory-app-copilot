# Setup Guide

## 1. Buat project Supabase

1. Masuk ke https://supabase.com
2. Klik New project
3. Salin URL project dan anon key
4. Masuk ke SQL Editor
5. Jalankan query SQL dari `docs/DATABASE.md`

## 2. Setup frontend web

Buat file `.env.local` berdasarkan `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_NAME=Inventory App
```

Jalankan:

```bash
npm install
npm run dev:web
```

## 3. Setup mobile Expo

Buat file `.env` atau gunakan variabel `EXPO_PUBLIC_SUPABASE_URL` dan `EXPO_PUBLIC_SUPABASE_ANON_KEY`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Jalankan:

```bash
npm --workspace apps/mobile run start
```

## 4. Deploy

- Web: deploy ke Vercel
- Mobile: build via EAS

## 5. Checklist keamanan

- Aktifkan Row Level Security (RLS)
- Pastikan auth email/password aktif
- Nonaktifkan email verification jika untuk demo
- Gunakan service role hanya di backend terpercaya
