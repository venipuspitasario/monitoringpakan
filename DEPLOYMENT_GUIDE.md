
# Panduan Deployment FeedCheck Pro (Edisi Otomatis)

Ikuti langkah ini agar website terhubung dengan Google Sheets secara aman:

### 1. Buat Google Sheet & Script
1. Buat Google Sheet baru di akun Anda.
2. Klik **Extensions** > **Apps Script**.
3. Hapus semua kode, lalu tempel kode dari file `apps-script-code.gs`.
4. Klik **Simpan** (ikon disk).

### 2. Jalankan Otomatisasi (Sangat Penting)
1. Di bagian atas editor script, pastikan fungsi yang terpilih adalah `setupSheet`.
2. Klik tombol **Run**. 
3. Google akan meminta izin akses, klik **Review Permissions** > Pilih Akun Anda > **Advanced** > **Go to FeedAPI (unsafe)** > **Allow**.
4. Lihat ke Google Sheets Anda; header dan data contoh akan muncul secara ajaib!

### 3. Deploy sebagai API
1. Klik **Deploy** > **New Deployment**.
2. Pilih **Type: Web App**.
3. Execute as: **Me** (Ini penting agar script bisa membaca data Anda).
4. Who has access: **Anyone** (Ini agar website bisa mengambil data tanpa login).
5. Klik **Deploy** dan salin **Web App URL**.

### 4. Hubungkan ke Website
1. Buka file `services/api.ts`.
2. Ganti `API_URL` dengan URL yang Anda salin tadi.

### 5. Cara Mengatur Hak Akses (Privasi)
Agar data Anda aman:
- **Anda sebagai Owner**: Bisa menambah/mengubah data langsung di Google Sheets.
- **Publik**: Hanya bisa melihat data lewat website.
- **Jangan klik tombol "Share"** di Google Sheets untuk publik. Biarkan akses file tetap "Restricted". Website Anda tetap bisa mengambil data karena pada saat deploy kita memilih "Execute as Me".

### Tips Update Data
Setiap kali Anda menambah baris baru di Google Sheets, website akan otomatis terupdate saat di-refresh (sinkronisasi real-time).
