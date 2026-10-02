# Inventory Management App 📦

Aplikasi inventaris bisnis yang dapat dipakai untuk mencatat barang masuk, barang keluar, login akun berbasis email/password, serta menampilkan header/kustom judul usaha sesuai saat pendaftaran akun.

## Fitur utama

- Login & registrasi dengan email/password
- Judul header / nama usaha custom saat akun dibuat
- Pencatatan barang masuk dan barang keluar
- Update stok otomatis
- Dashboard ringkasan stok dan transaksi
- Multi-user di satu usaha
- Web responsif dan bisa dipasang sebagai PWA
- Struktur siap dikembangkan ke Android/iOS via Expo
- Data tersimpan di cloud menggunakan Supabase

## Stack teknis

- Web: Next.js + React + Tailwind CSS
- Mobile: Expo / React Native
- Auth & Database: Supabase
- Cloud Storage: Supabase PostgreSQL

## Struktur proyek

- apps/web : aplikasi website utama
- apps/mobile : aplikasi mobile Expo
- docs : panduan setup dan database

## Setup cepat

1. Salin file .env.example ke .env.local untuk web dan .env untuk mobile
2. Buat project Supabase baru
3. Salin URL dan anon key ke file .env
4. Jalankan SQL schema dari docs/DATABASE.md
5. Jalankan perintah berikut:

```bash
npm install
npm run dev:web
```

Untuk mobile:

```bash
npm --workspace apps/mobile run start
```

## Catatan penting

Aplikasi ini dibuat sebagai MVP yang siap dikembangkan. Pastikan Anda mengisi variabel environment Supabase untuk mengaktifkan login dan penyimpanan data.

## Lisensi

MIT
