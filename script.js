// Variabel untuk menyimpan data pemain
let namaKapten = "";
let avatarPilihan = "";

// Fungsi pindah antar Scene
function pindahScene(nomorScene) {
    // Sembunyikan semua
    let semuaScene = document.querySelectorAll('.scene');
    semuaScene.forEach(scene => {
        scene.classList.add('hidden');
    });

    // Munculkan yang dituju
    document.getElementById('scene-' + nomorScene).classList.remove('hidden');
}

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
        alert("Siap Kapten " + namaKapten + "! Lanjut ke ruang ganti seragam.");
        // pindahScene(3); // Nanti diaktifkan kalau Scene 3 sudah kita buat
    }
}