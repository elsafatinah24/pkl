**Product Requirements Document (PRD)**

# Sistem Pemesanan Bakso

## 1. Informasi Produk

**Nama Produk**
Sistem Pemesanan Bakso

**Jenis Produk**
Website / Aplikasi Pemesanan Bakso

**Deskripsi**
Sistem Pemesanan Bakso adalah aplikasi berbasis web yang membantu pelanggan memesan bakso secara online atau langsung di tempat. Pelanggan dapat melihat menu bakso, memilih varian, menambahkan topping, menentukan level pedas, memilih metode pemesanan, melakukan pembayaran, dan memantau status pesanan. Sistem juga menyediakan halaman admin untuk mengelola menu, stok, pesanan, pembayaran, dan laporan penjualan.

---

## 2. Latar Belakang

Banyak usaha bakso masih melayani pemesanan secara manual menggunakan catatan kertas atau pesan lisan. Cara ini sering menyebabkan pesanan tertukar, topping tidak sesuai, level pedas salah, antrean panjang, dan pencatatan penjualan kurang rapi.

Dengan adanya sistem pemesanan bakso, proses pemesanan menjadi lebih cepat, akurat, dan mudah dipantau. Admin juga dapat melihat pesanan yang masuk secara terstruktur sehingga proses dapur dan kasir menjadi lebih efisien.

---

## 3. Tujuan Produk

* Mempermudah pelanggan memesan bakso tanpa harus menunggu lama.
* Mengurangi kesalahan pencatatan pesanan.
* Memudahkan pelanggan memilih varian bakso, topping, minuman, dan level pedas.
* Mempercepat proses pelayanan kasir dan dapur.
* Membantu admin mengelola menu, stok, pesanan, dan pembayaran.
* Menyediakan laporan penjualan otomatis dan mudah dibaca.

---

## 4. Target Pengguna

### Pelanggan

* Melihat daftar menu bakso.
* Memilih varian bakso dan topping.
* Menentukan jumlah pesanan.
* Memilih dine-in, takeaway, atau delivery.
* Melakukan pembayaran.
* Melihat status pesanan.
* Melihat riwayat pesanan.

### Admin / Kasir

* Login ke sistem.
* Mengelola menu bakso.
* Mengelola kategori menu dan topping.
* Mengelola stok menu.
* Menerima dan mengonfirmasi pesanan.
* Mengubah status pesanan.
* Mengelola pembayaran.
* Melihat laporan penjualan.

### Dapur

* Melihat daftar pesanan masuk.
* Melihat detail pesanan seperti topping, level pedas, catatan khusus, dan jenis layanan.
* Mengubah status pesanan menjadi sedang dibuat atau selesai.

---

## 5. Permasalahan

Masalah yang sering terjadi pada pemesanan bakso manual:

* Pesanan pelanggan sering tertukar.
* Catatan topping dan level pedas tidak lengkap.
* Kasir sulit menghitung total pesanan saat ramai.
* Pelanggan harus antre lama untuk memesan.
* Stok bakso, mie, topping, dan minuman sulit dipantau.
* Laporan penjualan dibuat manual dan rentan salah.
* Dapur kesulitan membedakan pesanan dine-in, takeaway, dan delivery.

---

## 6. Solusi

Sistem menyediakan:

* Katalog menu bakso digital.
* Pilihan varian bakso, topping, kuah, mie, dan level pedas.
* Keranjang belanja dengan perhitungan total otomatis.
* Checkout untuk dine-in, takeaway, dan delivery.
* Nomor pesanan otomatis.
* Status pesanan yang bisa dipantau pelanggan.
* Panel dapur untuk melihat pesanan secara real-time.
* Dashboard admin untuk mengelola menu, stok, pembayaran, dan laporan.

---

## 7. Fitur Utama

### Untuk Pelanggan

* Registrasi akun.
* Login.
* Melihat daftar menu bakso.
* Melihat detail menu.
* Mencari menu.
* Filter kategori, seperti bakso, mie ayam, minuman, dan topping.
* Memilih varian menu, seperti bakso urat, bakso telur, bakso mercon, atau bakso campur.
* Menambahkan topping, seperti pangsit, tahu, tetelan, ceker, dan ekstra bakso.
* Memilih level pedas.
* Menambahkan catatan khusus, seperti tanpa seledri atau kuah dipisah.
* Menambah pesanan ke keranjang.
* Mengubah jumlah pesanan.
* Menghapus pesanan dari keranjang.
* Checkout.
* Memilih jenis layanan: dine-in, takeaway, atau delivery.
* Mengisi nomor meja untuk dine-in.
* Mengisi alamat untuk delivery.
* Memilih metode pembayaran.
* Upload bukti pembayaran jika menggunakan transfer.
* Melihat status pesanan.
* Melihat riwayat pesanan.
* Edit profil.
* Logout.

### Untuk Admin / Kasir

* Login.
* Dashboard ringkasan penjualan.
* CRUD menu bakso.
* CRUD kategori menu.
* CRUD topping.
* Mengatur harga menu dan topping.
* Mengatur status menu tersedia atau habis.
* Mengelola stok bahan atau menu.
* Melihat pesanan masuk.
* Mengonfirmasi pesanan.
* Mengonfirmasi pembayaran.
* Mengubah status pesanan.
* Mencetak struk pesanan.
* Mengelola data pelanggan.
* Mencetak laporan penjualan.
* Logout.

### Untuk Dapur

* Login.
* Melihat antrean pesanan.
* Melihat detail setiap pesanan.
* Menandai pesanan sedang dibuat.
* Menandai pesanan selesai.
* Melihat catatan khusus pelanggan.

---

## 8. Alur Sistem

### Alur Pelanggan

Registrasi / Login

↓

Melihat Menu

↓

Memilih Bakso, Topping, Level Pedas, dan Catatan

↓

Masuk Keranjang

↓

Checkout

↓

Memilih Dine-in / Takeaway / Delivery

↓cara

Pembayaran

↓

Pesanan Dikonfirmasi

↓

Pesanan Diproses Dapur

↓

Pesanan Selesai

---

### Alur Admin / Kasir

Login

↓

Melihat Pesanan Masuk

↓

Konfirmasi Pesanan

↓

Konfirmasi Pembayaran

↓

Kirim Pesanan ke Dapur

↓

Ubah Status Pesanan

↓

Cetak Struk / Laporan Penjualan

---

### Alur Dapur

Login

↓

Melihat Antrean Pesanan

↓

Membaca Detail Pesanan

↓

Menandai Pesanan Sedang Dibuat

↓

Menandai Pesanan Selesai

---

## 9. Kebutuhan Fungsional

### Autentikasi

* Sistem dapat melakukan registrasi pelanggan.
* Sistem dapat melakukan login untuk pelanggan, admin, kasir, dan dapur.
* Sistem dapat melakukan logout.
* Sistem dapat melakukan reset password.
* Sistem dapat membedakan hak akses berdasarkan role pengguna.

### Menu Bakso

* Sistem dapat menampilkan daftar menu bakso.
* Sistem dapat menampilkan detail menu, harga, deskripsi, gambar, dan status ketersediaan.
* Sistem dapat mencari menu berdasarkan nama.
* Sistem dapat memfilter menu berdasarkan kategori.
* Sistem dapat menampilkan menu yang sedang habis.
* Admin dapat menambah, mengubah, dan menghapus menu.

### Topping dan Custom Pesanan

* Pelanggan dapat memilih topping tambahan.
* Pelanggan dapat memilih level pedas.
* Pelanggan dapat menambahkan catatan khusus.
* Sistem dapat menghitung tambahan harga topping secara otomatis.
* Admin dapat mengelola daftar topping dan harga topping.

### Keranjang

* Pelanggan dapat menambahkan menu ke keranjang.
* Pelanggan dapat mengubah jumlah item.
* Pelanggan dapat menghapus item.
* Sistem dapat menghitung subtotal, biaya tambahan topping, biaya layanan, ongkir, dan total pembayaran.

### Pemesanan

* Sistem dapat membuat nomor pesanan otomatis.
* Pelanggan dapat memilih jenis layanan dine-in, takeaway, atau delivery.
* Sistem wajib meminta nomor meja untuk dine-in.
* Sistem wajib meminta alamat dan nomor HP untuk delivery.
* Sistem dapat menyimpan detail pesanan.
* Pelanggan dapat melihat status pesanan.
* Admin dan dapur dapat mengubah status pesanan.

### Pembayaran

* Sistem mendukung pembayaran tunai.
* Sistem mendukung pembayaran QRIS.
* Sistem mendukung pembayaran transfer bank.
* Pelanggan dapat upload bukti pembayaran.
* Admin dapat mengonfirmasi status pembayaran.
* Sistem dapat menampilkan status pembayaran: menunggu, dibayar, ditolak, atau dibatalkan.

### Stok

* Admin dapat mengatur stok menu atau bahan utama.
* Sistem dapat menandai menu habis jika stok tidak tersedia.
* Sistem dapat mengurangi stok setelah pesanan dikonfirmasi.
* Admin dapat melihat daftar menu yang stoknya menipis.

### Laporan

* Sistem dapat menampilkan laporan penjualan harian.
* Sistem dapat menampilkan laporan penjualan mingguan dan bulanan.
* Sistem dapat menampilkan menu terlaris.
* Sistem dapat menampilkan total transaksi.
* Sistem dapat mencetak atau mengunduh laporan.

---

## 10. Kebutuhan Non-Fungsional

* Website responsif untuk desktop dan mobile.
* Waktu akses halaman utama maksimal 3 detik.
* Antarmuka mudah digunakan oleh pelanggan umum.
* Password pengguna harus disimpan dalam bentuk terenkripsi.
* Data pesanan tersimpan otomatis di database.
* Sistem dapat digunakan minimal oleh admin, kasir, dapur, dan pelanggan secara bersamaan.
* Sistem memiliki validasi input untuk mencegah data kosong atau tidak valid.
* Sistem memiliki tampilan status pesanan yang mudah dipahami.
* Sistem tersedia selama jam operasional warung bakso.
* Sistem memiliki backup database secara berkala.

---

## 11. Database Utama

Tabel utama:

* users
* pelanggan
* admin
* roles
* kategori_menu
* menu
* topping
* menu_topping
* stok
* pesanan
* detail_pesanan
* detail_topping
* pembayaran
* alamat_pengiriman
* laporan_penjualan

### Contoh Atribut Penting

**users**

* id_user
* nama
* email
* password
* role
* no_hp
* created_at

**menu**

* id_menu
* id_kategori
* nama_menu
* deskripsi
* harga
* gambar
* status
* stok

**pesanan**

* id_pesanan
* nomor_pesanan
* id_user
* jenis_layanan
* nomor_meja
* alamat
* status_pesanan
* status_pembayaran
* total_harga
* tanggal_pesanan

**detail_pesanan**

* id_detail
* id_pesanan
* id_menu
* jumlah
* level_pedas
* catatan
* subtotal

**pembayaran**

* id_pembayaran
* id_pesanan
* metode_pembayaran
* jumlah_bayar
* bukti_pembayaran
* status_pembayaran
* tanggal_pembayaran

---

## 12. Hak Akses

### Admin

* Kelola menu.
* Kelola kategori.
* Kelola topping.
* Kelola stok.
* Kelola pesanan.
* Kelola pembayaran.
* Kelola pelanggan.
* Kelola laporan.

### Kasir

* Melihat pesanan masuk.
* Konfirmasi pesanan.
* Konfirmasi pembayaran.
* Cetak struk.
* Melihat transaksi harian.

### Dapur

* Melihat antrean pesanan.
* Melihat detail pesanan.
* Mengubah status pesanan menjadi sedang dibuat.
* Mengubah status pesanan menjadi selesai.

### Pelanggan

* Registrasi.
* Login.
* Melihat menu.
* Membuat pesanan.
* Melakukan pembayaran.
* Melihat status pesanan.
* Melihat riwayat pesanan.

---

## 13. Teknologi

### Frontend

* HTML.
* CSS.
* Bootstrap.
* JavaScript.

### Backend

* PHP.

### Database

* MySQL.

### Web Server

* Apache melalui XAMPP atau LAMPP.

### Browser

* Google Chrome.
* Mozilla Firefox.
* Microsoft Edge.

---

## 14. Indikator Keberhasilan

* Pelanggan dapat memesan bakso tanpa bantuan kasir.
* Pelanggan dapat memilih topping dan level pedas dengan benar.
* Admin dapat mengelola menu dan stok dengan mudah.
* Dapur dapat melihat antrean pesanan secara jelas.
* Kesalahan pesanan berkurang dibandingkan proses manual.
* Perhitungan total pembayaran dilakukan otomatis.
* Laporan penjualan dapat dibuat lebih cepat dan akurat.
* Waktu pelayanan pelanggan menjadi lebih singkat.

---

## 15. Pengembangan Selanjutnya

* Integrasi payment gateway otomatis.
* Notifikasi pesanan melalui WhatsApp.
* Fitur estimasi waktu pesanan selesai.
* Fitur promo, voucher, dan paket hemat.
* Program poin loyalitas pelanggan.
* Sistem ulasan dan rating menu.
* Dashboard analitik penjualan dan stok.
* Integrasi printer thermal untuk struk kasir.
* Integrasi pemesanan melalui QR code di meja.

---

## 16. Ruang Lingkup MVP

Versi awal sistem difokuskan pada fitur utama berikut:

* Login pelanggan dan admin.
* Daftar menu bakso.
* Detail menu.
* Keranjang pesanan.
* Checkout.
* Pilihan dine-in dan takeaway.
* Pembayaran tunai dan transfer.
* Admin mengelola menu.
* Admin mengelola pesanan.
* Dapur melihat status pesanan.
* Laporan penjualan harian.

Fitur delivery, QRIS otomatis, voucher, loyalty point, dan notifikasi WhatsApp dapat dikembangkan pada tahap berikutnya.

---

Dokumen PRD ini menjadi acuan dalam pengembangan Sistem Pemesanan Bakso berbasis web, mulai dari tahap analisis kebutuhan, desain sistem, implementasi, pengujian, hingga pemeliharaan.
