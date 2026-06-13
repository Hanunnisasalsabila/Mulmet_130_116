// ==========================================
// VARIABEL DATA PEMAIN & REKAMAN
// ==========================================
let namaKapten = "";
let avatarPilihan = "";
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;

// ==========================================
// FUNGSI NAVIGASI SCENE UTAMA
// ==========================================
function pindahScene(nomorScene) {
    const overlay = document.getElementById('transition-overlay');
    const btnMulai = document.querySelector('.btn-mulai');
    const tanpaTransisi = [8, '8b', '8v', 9, '9', 10, 11, 12, 13, '4b', 23].includes(nomorScene);
    if (nomorScene === 2 && btnMulai) btnMulai.classList.add('clicked');
    if (!tanpaTransisi) setTimeout(() => { overlay.classList.add('active'); }, 200);

    const delayGanti = tanpaTransisi ? 0 : 800;

    setTimeout(() => {
        const mentorOv = document.getElementById('karakter-mentor-overlay');
        if (mentorOv) mentorOv.style.display = (nomorScene === 4) ? 'block' : 'none';

        document.querySelectorAll('.scene').forEach(s => {
            s.classList.add('hidden'); s.classList.remove('active');
        });

        const target = document.getElementById('scene-' + nomorScene);
        if (target) {
            target.classList.remove('hidden'); target.classList.add('active');
        }

        document.querySelectorAll('.nama-placeholder').forEach(el => el.innerText = namaKapten);

        // LOGIKA PENYESUAIAN GAMBAR SESUAI GENDER
        if (nomorScene === 4 || nomorScene === '4b') {
            const mentorImg = document.getElementById('karakter-mentor-overlay-fix');
            if (mentorImg) mentorImg.style.display = (nomorScene === 4) ? 'block' : 'none';
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene4_Jalan_ke_Pesawat_Cowok.png' : 'jalan_ke_pesawat_cewek.jpeg';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 5) {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene5_Jalan_ditangga_pesawat_cowok.png' : 'naik_tangga_pesawat_cewek.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        // Scene 6b: Duduk di Kokpit
        if (nomorScene === '6b') {
            // Ini sudah memakai nama gambar barumu
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene5_duduk_di_kokpit_cowok.png' : 'Scene7_Announcement_Akan_Take_Off.png';
            if (target) target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 7 || nomorScene === '8b') {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene7_Announcement_Akan_Take_Off_Cowok.png' : 'Scene7_Announcement_Akan_Take_Off.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
       
if (nomorScene == 9) {
    const video = document.getElementById('video-takeoff');
    if (video) {
        const target = document.getElementById('scene-9');
        if (target) target.style.backgroundImage = 'none';

        video.muted = true;
        video.currentTime = 0;

        const cobaPlay = () => {
            video.play().then(() => {
                console.log("Video berhasil diputar");
            }).catch(e => console.error("Play gagal:", e));
        };

        if (video.readyState >= 3) {
            cobaPlay();
        } else {
            video.addEventListener('canplay', cobaPlay, { once: true });
            video.load();
        }

        video.onended = () => {
            pindahScene(10);
        };
    }
}

        if (nomorScene === 10) {
            const vidPOV = document.getElementById('video-terbang-kokpit');
            if (vidPOV) {
                vidPOV.src = (avatarPilihan === 'cowok') ? 'scene8_takeoff_animasi_dalam_kokpit_cowok.mp4' : 'scene8_takeoff_animasi_dalam_kokpit_cewek.mp4';
                vidPOV.load(); 
                vidPOV.play();
                // SELESAI POV KOKPIT -> LANJUT KE ANNOUNCEMENT (SCENE 11)
                vidPOV.onended = () => pindahScene(11);
            }
        }
        if (nomorScene === 11) {
            resetRecordingUI();
            const bgImg = (avatarPilihan === 'cowok') ? 'scene9_announcement_pegang_mic_cowok.png' : 'scene9_announcement_pegang_mic.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 12) {
            const vid12 = document.getElementById('video-pemandangan');
            if (vid12) { vid12.play(); vid12.onended = () => { pindahScene(13); }; }
        }
        if (nomorScene === 13) {
            const vid13 = document.getElementById('video-transisi-mendung');
            if (vid13) { vid13.currentTime = 0; vid13.play(); vid13.onended = () => { pindahScene(14); }; }
        }
        if (nomorScene === 14) {
            const vid14 = document.getElementById('video-turbulensi-kokpit');
            if (vid14) {
                vid14.src = (avatarPilihan === 'cowok') ? 'Scene10_Dalam_Kokpit_Saat_Turbulensi_cowok.mp4' : 'Scene10_Dalam_Kokpit_Saat_Turbulensi.mp4';
                vid14.load(); vid14.play(); vid14.onended = () => { pindahScene('14b'); };
            }
        }
        if (nomorScene === '14b') {
    const bgImg = (avatarPilihan === 'cowok') ? 'Scene11_Pilot_Cowok_Menenangkan_Penumpang_.png' : 'Scene11_Pilot_Cewek_Menenangkan_Penumpang_part2.png';
    target.style.backgroundImage = `url('${bgImg}')`;
}
        if (nomorScene === 15) {
            resetRecordingUI();
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene11_Pilot_Cowok_Menenangkan_Penumpang_Part2.png' : 'Scene11_Pilot_Cewek_Menenangkan_Penumpang.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 16) {
            const vid16 = document.getElementById('video-pemulihan');
            if (vid16) { vid16.currentTime = 0; vid16.play(); vid16.onended = () => { pindahScene(18); }; }
        }
        if (nomorScene === 18) {
            resetRecordingUI();
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene13_Pilot_Cowok_Announcement(Landing).png' : 'Scene13_Pilot_Cewek_Announcement(Landing).png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 19) {
            const vid19 = document.getElementById('video-landing');
            if (vid19) { vid19.currentTime = 0; vid19.play(); vid19.onended = () => { pindahScene(20); }; }
        }
        if (nomorScene === 20) {
            const g = (avatarPilihan === 'cowok') ? 'Cowok' : 'Cewek';
            target.style.backgroundImage = `url('Scene15_Pilot_${g}_Lihat_Luar.png')`;
        }
        if (nomorScene === 21) {
            const g = (avatarPilihan === 'cowok') ? 'Cowok' : 'Cewek';
            target.style.backgroundImage = `url('Scene15_Pilot_${g}_Lihat_Luar_Part2.png')`;
        }
        if (nomorScene === 22) { target.style.backgroundImage = "url('Scene15_Petugas_Bagasi.png')"; }
        if (nomorScene === '22b') { target.style.backgroundImage = "url('Scene15_Pilot_Cewek_Keluar_Kokpit.png')"; }
        if (nomorScene === '22c') { target.style.backgroundImage = "url('Scene15_Bicara_Sama_Pramugari_Part1.png')"; }
        if (nomorScene === '22d') { target.style.backgroundImage = "url('Scene15_Bicara_Sama_Pramugari_Part2.png')"; }
        if (nomorScene === '22e') { target.style.backgroundImage = "url('Scene15_Bicara_Sama_Pramugari_Part3.png')"; }
        if (nomorScene === '22f') {
    const vidKeluar = document.getElementById('video-keluar-pesawat');
    if (vidKeluar) { 
        vidKeluar.currentTime = 0; 
        vidKeluar.play(); 
        vidKeluar.onended = () => {
            const fadeOverlay = document.getElementById('fade-black-overlay');
            fadeOverlay.classList.add('active');
            
            setTimeout(() => {
                pindahScene(23);
                setTimeout(() => {
                    fadeOverlay.classList.remove('active');
                }, 300);
            }, 800);
        };
    }
}
        // Scene 23: Sertifikat Kelulusan
        if (nomorScene === 23) {
            document.getElementById('nama-kapten-final').innerText = namaKapten;
            
            // Logika untuk memunculkan foto Cowok/Cewek Fullbody
            const fotoSertif = document.getElementById('sertifikat-avatar');
            if (fotoSertif) {
                fotoSertif.src = (avatarPilihan === 'cowok') ? 'Cowok_Fullbody.jpeg' : 'Cewek_Fullbody.jpeg';
            }
        }
    }, delayGanti);

    if (!tanpaTransisi) setTimeout(() => { overlay.classList.remove('active'); }, 1400);
}

// ==========================================
// FUNGSI INPUT NAMA & AVATAR
// ==========================================
function pilihAvatar(jenis) {
    avatarPilihan = jenis;
    document.getElementById('card-cowok').classList.remove('selected');
    document.getElementById('card-cewek').classList.remove('selected');
    document.getElementById('card-' + jenis).classList.add('selected');
}

function cekDataLanjut() {
    namaKapten = document.getElementById('input-nama').value;
    if (namaKapten === "" || avatarPilihan === "") {
        alert("Lengkapi nama dan pilih karakter dulu ya, Kapten!");
    } else {
        document.getElementById('nama-kapten-display').innerText = namaKapten;
        document.getElementById('gambar-avatar-scene3').src = (avatarPilihan === 'cowok') ? "Cowok_Fullbody.jpeg" : "Cewek_Fullbody.jpeg";
        pindahScene(3); 
    }
}

// ==========================================
// FUNGSI HOTSPOT SERAGAM
// ==========================================
let statusAtribut = { topi: false, wing: false, epaulet: false, dasi: false };
function klikAtribut(jenis) {
    const info = {
        topi: { judul: "Topi Pilot", teks: "Melindungi kepala dan tanda disiplin.", gambar: "topi_pilot.png" },
        wing: { judul: "Lencana Wing", teks: "Tanda Kapten sudah siap bertugas!", gambar: "lencana_wings.png" },
        epaulet: { judul: "Pangkat", teks: "Menunjukkan jabatan Kapten.", gambar: "epaulet.png" },
        dasi: { judul: "Dasi", teks: "Agar Kapten tampil rapi!", gambar: "dasi.png" }
    };
    document.getElementById('popup-judul').innerText = info[jenis].judul;
    document.getElementById('popup-teks').innerText = info[jenis].teks;
    document.getElementById('popup-gambar').src = info[jenis].gambar;
    document.getElementById('popup-atribut').classList.remove('hidden');

    document.getElementById('btn-' + jenis).classList.replace('belum', 'sudah');
    statusAtribut[jenis] = true;
}

function tutupPopup() {
    document.getElementById('popup-atribut').classList.add('hidden');
    if (Object.values(statusAtribut).every(v => v)) {
        document.getElementById('btn-lanjut-scene3').classList.remove('hidden');
    }
}

// ==========================================
// FUNGSI HOTSPOT KOKPIT
// ==========================================
let statusKokpit = { mesin: false, gas: false, setir: false, mic: false };
function klikKokpit(jenis) {
    const info = {
        mesin: { judul: "Engine Start", teks: "Nyalakan mesin utama.", gambar: "Scene6_start_engine.png" },
        gas: { judul: "Tuas Gas", teks: "Atur kecepatan pesawat.", gambar: "Scene6_tuas.png" },
        setir: { judul: "Yoke (Setir)", teks: "Kendalikan arah pesawat.", gambar: "Scene6_yoke.png" },
        mic: { judul: "Mic Radio", teks: "Bicara ke penumpang.", gambar: "Scene6_headset.png" }
    };
    
    document.getElementById('popup-judul-kokpit').innerText = info[jenis].judul;
    document.getElementById('popup-teks-kokpit').innerText = info[jenis].teks;
    document.getElementById('popup-gambar-kokpit').src = info[jenis].gambar; 
    document.getElementById('popup-kokpit').classList.remove('hidden');

    document.getElementById('btn-' + jenis).classList.replace('belum', 'sudah');
    statusKokpit[jenis] = true;
}

function tutupPopupKokpit() {
    document.getElementById('popup-kokpit').classList.add('hidden');
    if (Object.values(statusKokpit).every(v => v)) {
        document.getElementById('btn-slide-lanjut').classList.remove('hidden');
    }
}

function gantiSlideKokpit(index, reset = false) {
    document.querySelectorAll('.kokpit-slide').forEach(s => s.classList.remove('aktif'));
    document.querySelectorAll('.slide-dot').forEach(d => d.classList.remove('aktif'));
    document.getElementById('slide-' + index).classList.add('aktif');
    document.getElementById('dot-' + index).classList.add('aktif');
    if (reset) gantiDialogKokpit(1);
}

function gantiDialogKokpit(nomor) {
    document.querySelectorAll('.dialog-kokpit').forEach(d => d.classList.remove('aktif'));
    document.getElementById('dialog-k' + nomor).classList.add('aktif');
}

// ==========================================
// FUNGSI DRAG & DROP SABUK
// ==========================================
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    if (data === "sabuk-ujung") {
        document.getElementById("sabuk-ujung").style.display = "none";
        const g = document.getElementById("sabuk-gesper");
        g.innerHTML = "🔒 SABUK TERKUNCI";
        g.style.background = "#4CAF50";
        g.style.color = "white";

        document.getElementById('btn-nyalakan-mesin').classList.remove('hidden');
        document.getElementById('instruksi-sabuk').innerText = "Hebat! Sekarang nyalakan mesin pesawat.";
    }
}

function nyalakanMesin() {
    alert("VROOOM! Mesin pesawat sudah menderu!");
    document.getElementById('btn-nyalakan-mesin').classList.add('hidden');
    document.getElementById('btn-lanjut-scene7').classList.remove('hidden');
}

// ==========================================
// FUNGSI REKAM SUARA
// ==========================================
function resetRecordingUI() {
    const sceneAktif = document.querySelector('.scene.active');
    if (!sceneAktif) return;

    const btnStop = sceneAktif.querySelector('.stop');
    const btnPutar = sceneAktif.querySelector('.putar');
    const btnLanjut = sceneAktif.querySelector('.btn-lanjut-dialog');
    
    if (btnStop) btnStop.classList.add('hidden');
    if (btnPutar) btnPutar.classList.add('hidden');
    if (btnLanjut) btnLanjut.classList.add('hidden');

    const btnRekam = sceneAktif.querySelector('.rekam');
    if (btnRekam) {
        btnRekam.innerText = "🎤 Rekam Suara";
        btnRekam.classList.remove('recording', 'hidden');
        btnRekam.disabled = false;
    }
}

async function mulaiRekam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
        mediaRecorder.onstop = () => {
            audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioUrl = URL.createObjectURL(audioBlob);
            document.getElementById('audio-playback').src = audioUrl;

            const sceneAktif = document.querySelector('.scene.active');
            if(sceneAktif.querySelector('.putar')) sceneAktif.querySelector('.putar').classList.remove('hidden');
            if(sceneAktif.querySelector('.btn-lanjut-dialog')) sceneAktif.querySelector('.btn-lanjut-dialog').classList.remove('hidden');
        };

        mediaRecorder.start();
        
        const sceneAktif = document.querySelector('.scene.active');
        const btnRekam = sceneAktif.querySelector('.rekam');
        if(btnRekam) {
            btnRekam.classList.add('recording');
            btnRekam.innerText = "🔴 Merekam...";
            btnRekam.disabled = true;
        }
        if(sceneAktif.querySelector('.stop')) sceneAktif.querySelector('.stop').classList.remove('hidden');

    } catch (err) {
        alert("Akses Mikrofon Gagal! Pastikan kamu pakai Live Server dan mengizinkan Mic.");
    }
}

function berhentiRekam() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        const sceneAktif = document.querySelector('.scene.active');
        const btnRekam = sceneAktif.querySelector('.rekam');
        if(btnRekam) {
            btnRekam.classList.remove('recording');
            btnRekam.innerText = "🔄 Rekam Ulang";
            btnRekam.disabled = false;
        }
        if(sceneAktif.querySelector('.stop')) sceneAktif.querySelector('.stop').classList.add('hidden');
    }
}

function putarRekaman() {
    const audio = document.getElementById('audio-playback');
    if (audio && audio.src) audio.play();
}


setTimeout(() => {
    namaKapten = "Zahwa";       
    avatarPilihan = "cewek";    
    pindahScene('22b');          
}, 500);