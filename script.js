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
        // Sembunyikan semua scene
        let semuaScene = document.querySelectorAll('.scene');
        semuaScene.forEach(scene => {
            scene.classList.add('hidden');
            scene.classList.remove('active'); 
        });

        // Munculkan scene yang dituju
        let sceneTujuan = document.getElementById('scene-' + nomorScene);
        if (sceneTujuan) {
            sceneTujuan.classList.remove('hidden');
            sceneTujuan.classList.add('active');
        }

        // ==========================================
        // LOGIKA KHUSUS SAAT MEMASUKI SCENE TERTENTU
        // ==========================================
        
        // Jika masuk Scene 4 (Dialog Mentor & Jalan ke Pesawat)
        if (nomorScene === 4) {
            // Pasang nama Kapten di kotak dialog
            document.getElementById('nama-kapten-scene4').innerText = namaKapten;
            
            // Ganti Background sesuai gender
            const scene4 = document.getElementById('scene-4');
            if (avatarPilihan === 'cowok') {
                scene4.style.backgroundImage = "url('jalan_ke_pesawat_cowok.jpeg')"; 
            } else {
                scene4.style.backgroundImage = "url('jalan_ke_pesawat_cewek.jpeg')"; 
            }
            
            // Putar audio suara mentor otomatis (buka komentar nanti jika file audio siap)
            // const audioMentor = document.getElementById('audio-mentor-intro');
            // if (audioMentor) { audioMentor.play(); }
        }

        // Jika masuk Scene 5 (Naik Tangga & Masuk Pesawat)
        if (nomorScene === 5) {
            // Ganti Background sesuai gender
            const scene5 = document.getElementById('scene-5');
            if (avatarPilihan === 'cowok') {
                scene5.style.backgroundImage = "url('naik_tangga_pesawat_cowok.jpeg')"; 
            } else {
                scene5.style.backgroundImage = "url('naik_tangga_pesawat_cewek.jpeg')"; 
            }

            // Hapus gambar avatar full-body yang mengambang agar tidak menumpuk dengan background
            const imgScene5 = document.getElementById('gambar-avatar-scene5');
            if (imgScene5) {
                imgScene5.style.display = 'none'; 
            }
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
function pilihAvatar(jenis) {
    avatarPilihan = jenis;
    
    document.getElementById('card-cowok').classList.remove('selected');
    document.getElementById('card-cewek').classList.remove('selected');
    
    document.getElementById('card-' + jenis).classList.add('selected');
}

function cekDataLanjut() {
    namaKapten = document.getElementById('input-nama').value;
    
    if (namaKapten === "") {
        alert("Eh, Kapten lupa mengisi nama nih!");
    } else if (avatarPilihan === "") {
        alert("Pilih karakter Kapten Cewek atau Cowok dulu ya!");
    } else {
        const namaDisplay = document.getElementById('nama-kapten-display');
        if (namaDisplay) {
            namaDisplay.innerText = namaKapten;
        }

        const imgScene3 = document.getElementById('gambar-avatar-scene3');
        if (imgScene3) {
            if(avatarPilihan === 'cowok') {
                imgScene3.src = "Cowok_Fullbody.jpeg"; 
            } else {
                imgScene3.src = "Cewek_Fullbody.jpeg"; 
            }
        }

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
        teks: "Topi ini melindungi kepalaku dan menjadi simbol kedisiplinan seorang pilot.",
        gambar: "topi_pilot.png"
    },
    wing: {
        judul: "Lencana Wing",
        teks: "Lencana Wing tanda aku sudah lulus latihan terbang dan siap bertugas!",
        gambar: "lencana_wings.png"
    },
    epaulet: {
        judul: "Epaulet Pangkat",
        teks: "Epaulet di pundakku menunjukkan pangkatku sebagai Kapten penerbangan.",
        gambar: "epaulet.png"
    },
    dasi: {
        judul: "Dasi Rapih",
        teks: "Dasi membuat seragamku rapi agar penumpang percaya pada kepemimpinanku.",
        gambar: "dasi.png"
    }
};

function klikAtribut(jenis) {
    document.getElementById('popup-judul').innerText = infoAtribut[jenis].judul;
    document.getElementById('popup-teks').innerText = infoAtribut[jenis].teks;
    document.getElementById('popup-gambar').src = infoAtribut[jenis].gambar;

    document.getElementById('popup-atribut').classList.remove('hidden');

    const tombolTitik = document.getElementById('btn-' + jenis);
    tombolTitik.classList.remove('belum');
    tombolTitik.classList.add('sudah');

    statusAtribut[jenis] = true;
}

function tutupPopup() {
    document.getElementById('popup-atribut').classList.add('hidden');

    if (statusAtribut.topi && statusAtribut.wing && statusAtribut.epaulet && statusAtribut.dasi) {
        document.getElementById('btn-lanjut-scene3').classList.remove('hidden');
    }
}