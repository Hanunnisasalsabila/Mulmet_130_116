// ==========================================
// VARIABEL DATA PEMAIN
// ==========================================
let namaKapten = "";
let avatarPilihan = "";

// ==========================================
// FUNGSI TRANSISI SCENE (DENGAN ANIMASI)
// ==========================================
function pindahScene(nomorScene) {
    const overlay = document.getElementById('transition-overlay');
    const btnMulai = document.querySelector('.btn-mulai');

    // 1. Jika kita pindah dari Scene 1 ke 2, jalankan animasi tombol meletup (popOut)
    if (nomorScene === 2 && btnMulai) {
        btnMulai.classList.add('clicked');
    }

    // 2. Munculkan layar transisi putih & animasi pesawat terbang
    setTimeout(() => {
        overlay.classList.add('active');
    }, 200);

    // 3. Ganti scene di belakang layar saat layar memutih penuh
    setTimeout(() => {
        // Sembunyikan semua scene (Logika asli kamu)
        let semuaScene = document.querySelectorAll('.scene');
        semuaScene.forEach(scene => {
            scene.classList.add('hidden');
            scene.classList.remove('active'); // Pastikan status active juga dicabut
        });

        // Munculkan scene yang dituju (Logika asli kamu)
        let sceneTujuan = document.getElementById('scene-' + nomorScene);
        if (sceneTujuan) {
            sceneTujuan.classList.remove('hidden');
            sceneTujuan.classList.add('active');
        }
    }, 800); 

    // 4. Hilangkan layar putih transisi agar scene baru terlihat jelas
    setTimeout(() => {
        overlay.style.transition = 'background 0.5s ease-out';
        overlay.classList.remove('active');
    }, 1400);
}

// ==========================================
// FUNGSI INTERAKSI SCENE 2
// ==========================================

// Fungsi memberikan highlight saat gambar avatar diklik
function pilihAvatar(jenis) {
    avatarPilihan = jenis;
    
    // Hapus efek hijau dari dua-duanya dulu
    document.getElementById('card-cowok').classList.remove('selected');
    document.getElementById('card-cewek').classList.remove('selected');
    
    // Tambahkan efek hijau ke yang dipilih
    document.getElementById('card-' + jenis).classList.add('selected');
}

// Fungsi mengecek nama dan avatar sebelum lanjut ke Scene 3
function cekDataLanjut() {
    namaKapten = document.getElementById('input-nama').value;
    
    if (namaKapten === "") {
        alert("Eh, Kapten lupa mengisi nama nih!");
    } else if (avatarPilihan === "") {
        alert("Pilih karakter Kapten Cewek atau Cowok dulu ya!");
    } else {
        // Jika data lengkap, panggil fungsi pindahScene ke Scene 3
        console.log("Persiapan selesai untuk Kapten " + namaKapten);
        
        // alert("Siap Kapten " + namaKapten + "! Lanjut ke ruang ganti seragam.");
        
        // Buka komentar di bawah ini jika elemen HTML scene-3 sudah kamu buat
        // pindahScene(3); 
    }
}