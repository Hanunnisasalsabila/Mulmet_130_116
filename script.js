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
// FUNGSI NAVIGASI SCENE UTAMA (UNIVERSAL FADE)
// ==========================================
function pindahScene(nomorScene) {
    const fadeOverlay = document.getElementById('fade-black-overlay');
    
    // 1. Mulai Fade Out (Layar Menghitam)
    if (fadeOverlay) fadeOverlay.classList.add('active');

    // 2. Tunggu layar hitam pekat sebelum ganti konten (0.7 detik)
    setTimeout(() => {
        document.querySelectorAll('.scene').forEach(s => {
            s.classList.add('hidden');
            s.classList.remove('active');
        });

        const target = document.getElementById('scene-' + nomorScene);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('active');
        }

        document.querySelectorAll('.nama-placeholder').forEach(el => el.innerText = namaKapten);

        // ==========================================
        // LOGIKA KONTEN TIAP SCENE
        // ==========================================
        
        if (nomorScene === 4) {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene4_Jalan_ke_Pesawat_Cowok.png' : 'jalan_ke_pesawat_cewek2.jpeg';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === '4b') {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene4_Jalan_ke_Pesawat_Cowok_Part2.png' : 'jalan_ke_pesawat_cewek.jpeg';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 5) {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene5_Jalan_ditangga_pesawat_cowok.png' : 'naik_tangga_pesawat_cewek.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === '6b') {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene5_duduk_di_kokpit_cowok.png' : 'Scene5_duduk_di_kokpit_cewek.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 7 || nomorScene === '8b') {
            if(nomorScene === '8b') resetRecordingUI();
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene7_Announcement_Akan_Take_Off_Cowok.png' : 'Scene7_Announcement_Akan_Take_Off.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 8) {
            target.style.backgroundImage = "url('pesawat.png')";
            target.style.backgroundPosition = "center 30%";
        }
        if (nomorScene === '8a') {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene5_duduk_di_kokpit_cowok.png' : 'Scene5_duduk_di_kokpit_cewek.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }

        // --- SCENE 9 & 10 (VIDEO OTOMATIS) ---
        if (nomorScene == 9) {
            const video = document.getElementById('video-takeoff');
            if (video) {
                video.muted = true; video.currentTime = 0; video.play();
                let sudahFade = false;
                video.ontimeupdate = () => {
                    if (video.currentTime >= video.duration - 1.5 && !sudahFade) {
                        sudahFade = true;
                        pindahScene(10);
                    }
                };
            }
        }
        if (nomorScene == 10) {
            const vid10 = document.getElementById('video-terbang-kokpit');
            if (vid10) {
                vid10.src = (avatarPilihan === 'cowok') ? 'scene8_takeoff_animasi_dalam_kokpit_cowok.mp4' : 'scene8_takeoff_animasi_dalam_kokpit_cewek.mp4';
                vid10.load(); vid10.play();
                let sudahFade10 = false;
                vid10.ontimeupdate = () => {
                    if (vid10.currentTime >= vid10.duration - 2.0 && !sudahFade10) {
                        sudahFade10 = true;
                        pindahScene(11);
                    }
                };
            }
        }

        if (nomorScene === 11) {
            resetRecordingUI();
            const bgImg = (avatarPilihan === 'cowok') ? 'scene9_announcement_pegang_mic_cowok.png' : 'scene9_announcement_pegang_mic.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 12) {
            const vid12 = document.getElementById('video-pemandangan');
            if (vid12) { vid12.play(); vid12.onended = () => { pindahScene('12b'); }; }
        }

        // --- SCENE 12b (TRANSISI NARASI WAKTU) ---
        if (nomorScene == '12b') {
            // Tunggu 3 detik agar narasi dibaca, lalu pindah ke 13 (otomatis memicu fade out)
            setTimeout(() => {
                pindahScene(13);
            }, 3000);
        }

        if (nomorScene == 13) {
            const vid13 = document.getElementById('video-transisi-mendung');
            if (vid13) { vid13.play(); vid13.onended = () => { pindahScene(14); }; }
        }
        if (nomorScene === 14) {
            const vid14 = document.getElementById('video-turbulensi-kokpit');
            if (vid14) {
                vid14.src = (avatarPilihan === 'cowok') ? 'Scene10_Dalam_Kokpit_Saat_Turbulensi_cowok.mp4' : 'Scene10_Dalam_Kokpit_Saat_Turbulensi.mp4';
                vid14.load(); vid14.play();
                vid14.onended = () => { pindahScene('14b'); };
            }
        }
        if (nomorScene === '14b') {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene11_Pilot_Cowok_Menenangkan_Penumpang_part1.png' : 'Scene11_Pilot_Cewek_Menenangkan_Penumpang_part1.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 15) {
            resetRecordingUI();
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene11_Pilot_Cowok_Menenangkan_Penumpang_Part2.png' : 'Scene11_Pilot_Cewek_Menenangkan_Penumpang_part2.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 16) {
            const vid16 = document.getElementById('video-pemulihan');
            if (vid16) { vid16.play(); vid16.onended = () => { pindahScene(18); }; }
        }
        if (nomorScene === 18) {
            resetRecordingUI();
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene13_Pilot_Cowok_Announcement(Landing).png' : 'Scene13_Pilot_Cewek_Announcement(Landing).png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 23) {
            document.getElementById('nama-kapten-final').innerText = namaKapten;
            document.getElementById('sertifikat-avatar').src = (avatarPilihan === 'cowok') ? 'Cowok_Fullbody.jpeg' : 'Cewek_Fullbody.jpeg';
        }

        // 3. Fade In (Layar Terbuka)
        setTimeout(() => {
            if (fadeOverlay) fadeOverlay.classList.remove('active');
        }, 150);

    }, 700);
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
// FUNGSI HOTSPOT KOKPIT (3 ITEM SAJA)
// ==========================================
let statusKokpit = { mesin: false, gas: false, setir: false }; 

function klikKokpit(jenis) {
    const info = {
        mesin: { judul: "Engine Start", teks: "Nyalakan mesin utama.", gambar: "Scene6_start_engine.png" },
        gas: { judul: "Tuas Gas", teks: "Atur kecepatan pesawat.", gambar: "Scene6_tuas.png" },
        setir: { judul: "Yoke (Setir)", teks: "Kendalikan arah pesawat.", gambar: "Scene6_yoke.png" }
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
// FUNGSI LAIN (SABUK, REKAM, DLL)
// ==========================================
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    if (data === "sabuk-ujung") {
        document.getElementById("sabuk-ujung").style.display = "none";
        const g = document.getElementById("sabuk-gesper");
        g.innerHTML = "<i class='fa-solid fa-lock'></i> SABUK TERKUNCI";
        g.classList.add('terkunci');
        document.getElementById('btn-nyalakan-mesin').classList.remove('hidden');
        document.getElementById('instruksi-sabuk').innerText = "Hebat! Sekarang nyalakan mesin pesawat.";
    }
}
function nyalakanMesin() {
    alert("VROOOM! Mesin pesawat sudah menderu!");
    document.getElementById('btn-nyalakan-mesin').classList.add('hidden');
    document.getElementById('btn-lanjut-scene7').classList.remove('hidden');
}

function resetRecordingUI() {
    const sceneAktif = document.querySelector('.scene.active');
    if (!sceneAktif) return;
    const btns = ['stop', 'putar', 'btn-lanjut-dialog'];
    btns.forEach(b => { if(sceneAktif.querySelector('.'+b)) sceneAktif.querySelector('.'+b).classList.add('hidden'); });
    const btnRekam = sceneAktif.querySelector('.rekam');
    if (btnRekam) { btnRekam.innerText = "🎤 Rekam Suara"; btnRekam.classList.remove('recording', 'hidden'); btnRekam.disabled = false; }
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
        if(btnRekam) { btnRekam.classList.add('recording'); btnRekam.innerText = "🔴 Merekam..."; btnRekam.disabled = true; }
        if(sceneAktif.querySelector('.stop')) sceneAktif.querySelector('.stop').classList.remove('hidden');
    } catch (err) { alert("Akses Mikrofon Gagal!"); }
}

function berhentiRekam() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        const sceneAktif = document.querySelector('.scene.active');
        const btnRekam = sceneAktif.querySelector('.rekam');
        if(btnRekam) { btnRekam.classList.remove('recording'); btnRekam.innerText = "🔄 Rekam Ulang"; btnRekam.disabled = false; }
        if(sceneAktif.querySelector('.stop')) sceneAktif.querySelector('.stop').classList.add('hidden');
    }
}

function putarRekaman() { const audio = document.getElementById('audio-playback'); if (audio && audio.src) audio.play(); }

function putarVO(audioId) {
    const audio = document.getElementById(audioId);
    if (!audio) return;
    if (currentVO && currentVO !== audio) { currentVO.pause(); currentVO.currentTime = 0; }
    if (audio.paused) { audio.currentTime = 0; audio.play(); currentVO = audio; } 
    else { audio.pause(); audio.currentTime = 0; currentVO = null; }
}

function transisiKeScene12() { pindahScene(12); }

setTimeout(() => {
   namaKapten = "Zahwa";       
   avatarPilihan = "cewek";    
   pindahScene(11);          
}, 500);