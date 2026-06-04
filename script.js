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

// 1. FUNGSI PILIH AVATAR (Ini yang kemungkinan terhapus)
function pilihAvatar(jenis) {
    avatarPilihan = jenis;
    
    // Hapus efek border hijau dari dua-duanya dulu
    document.getElementById('card-cowok').classList.remove('selected');
    document.getElementById('card-cewek').classList.remove('selected');
    
    // Tambahkan efek border hijau ke avatar yang dipilih
    document.getElementById('card-' + jenis).classList.add('selected');
}

// 2. FUNGSI CEK DATA & LANJUT KE SCENE 3
function cekDataLanjut() {
    namaKapten = document.getElementById('input-nama').value;
    
    if (namaKapten === "") {
        alert("Eh, Kapten lupa mengisi nama nih!");
    } else if (avatarPilihan === "") {
        alert("Pilih karakter Kapten Cewek atau Cowok dulu ya!");
    } else {
        // Tampilkan nama user di judul Scene 3
        const namaDisplay = document.getElementById('nama-kapten-display');
        if (namaDisplay) {
            namaDisplay.innerText = namaKapten;
        }

        // Tampilkan gambar full-body berdasarkan pilihan avatar di Scene 3
        const imgScene3 = document.getElementById('gambar-avatar-scene3');
        if (imgScene3) {
            if(avatarPilihan === 'cowok') {
                imgScene3.src = "Kapten_Cowok.jpeg"; // Sesuaikan jika ada gambar full body khusus
            } else {
                imgScene3.src = "Kapten_Cewek.jpeg"; // Sesuaikan jika ada gambar full body khusus
            }
        }

        // Pindah ke Scene 3
        pindahScene(3); 
    }
}
// ==========================================
// FUNGSI INTERAKSI SCENE 3 (HOTSPOT & POP-UP)
// ==========================================

let statusAtribut = { topi: false, wing: false, epaulet: false, dasi: false };

const infoAtribut = {
    topi: {
        judul: "Topi Pilot",
        teks: "Topi ini melindungi kepalaku dan menjadi simbol kedisiplinan seorang pilot."
    },
    wing: {
        judul: "Lencana Wing",
        teks: "Lencana Wing tanda aku sudah lulus latihan terbang dan siap bertugas!"
    },
    epaulet: {
        judul: "Epaulet Pangkat",
        teks: "Epaulet di pundakku menunjukkan pangkatku sebagai Kapten penerbangan."
    },
    dasi: {
        judul: "Dasi Rapih",
        teks: "Dasi membuat seragamku rapi agar penumpang percaya pada kepemimpinanku."
    }
};

function klikAtribut(jenis) {
    // 1. Isi data ke dalam Pop-up
    document.getElementById('popup-judul').innerText = infoAtribut[jenis].judul;
    document.getElementById('popup-teks').innerText = infoAtribut[jenis].teks;

    // 2. Tampilkan Pop-up
    document.getElementById('popup-atribut').classList.remove('hidden');

    // 3. Ubah warna titik indikator jadi hijau (sesuai aturan PDF)
    const tombolTitik = document.getElementById('btn-' + jenis);
    tombolTitik.classList.remove('belum');
    tombolTitik.classList.add('sudah');

    // 4. Catat bahwa bagian ini sudah diklik
    statusAtribut[jenis] = true;
}

function tutupPopup() {
    // 1. Sembunyikan Pop-up
    document.getElementById('popup-atribut').classList.add('hidden');

    // 2. Cek apakah ke-4 titik sudah berwarna hijau?
    if (statusAtribut.topi && statusAtribut.wing && statusAtribut.epaulet && statusAtribut.dasi) {
        // Jika YA, munculkan tombol "Menuju Pesawat!"
        document.getElementById('btn-lanjut-scene3').classList.remove('hidden');
    }
}