// ==========================================
// VARIABEL DATA PEMAIN
// ==========================================
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;

function pindahScene(nomorScene) {
    const overlay = document.getElementById('transition-overlay');
    const btnMulai = document.querySelector('.btn-mulai');

    // Scene tanpa transisi animasi pesawat terbang
    const tanpaTransisi = [8, '8b', 9, 10, 11, 12, 13].includes(nomorScene);

    if (nomorScene === 2 && btnMulai) btnMulai.classList.add('clicked');

    if (!tanpaTransisi) {
        setTimeout(() => { overlay.classList.add('active'); }, 200);
    }

    const delayGanti = tanpaTransisi ? 0 : 800;

    setTimeout(() => {
        // Sembunyikan mentor jika bukan scene 4
        const mentorOv = document.getElementById('karakter-mentor-overlay');
        if (mentorOv) mentorOv.style.display = (nomorScene === 4) ? 'block' : 'none';

        document.querySelectorAll('.scene').forEach(s => {
            s.classList.add('hidden');
            s.classList.remove('active');
        });

        const target = document.getElementById('scene-' + nomorScene);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('active');
        }

        // Update Nama
        document.querySelectorAll('.nama-placeholder').forEach(el => el.innerText = namaKapten);

        // LOGIKA KHUSUS SCENE
        if (nomorScene === 4 || nomorScene === '4b') {
            const mentorImg = document.getElementById('karakter-mentor-overlay-fix');
            if (mentorImg) mentorImg.style.display = (nomorScene === 4) ? 'block' : 'none';
            
            const target = document.getElementById('scene-' + nomorScene);
            target.style.backgroundImage = (avatarPilihan === 'cowok') 
                ? "url('jalan_ke_pesawat_cowok.jpeg')" 
                : "url('jalan_ke_pesawat_cewek2.jpeg')";
            target.style.backgroundPosition = "center 5%";
        }

        if (nomorScene === 5) {
            target.style.backgroundImage = `url('naik_tangga_pesawat_${avatarPilihan}.png')`;
        }
        if (nomorScene === 7) {
            const scene7 = document.getElementById('scene-7');
            scene7.style.backgroundImage = "url('scene9_announcement_pegang_mic.png')";
            scene7.style.backgroundPosition = "center 5%";
        }

        // Scene 8 (POV Video Cockpit sebelum announcement)
        if (nomorScene === 8) {
            const vidPOV = document.getElementById('video-pov-takeoff');
            if (vidPOV) {
                vidPOV.src = (avatarPilihan === 'cowok')
                    ? 'scene8_takeoff_animasi_dalam_kokpit_cowok.mp4'
                    : 'scene8_takeoff_animasi_dalam_kokpit_cewek.mp4';
                vidPOV.load();
                vidPOV.play();
                // SETELAH VIDEO POV SELESAI, PINDAH KE ANNOUNCEMENT (8b)
                vidPOV.onended = () => { pindahScene('8b'); };
            }
        }
        
        // Scene 8b (Update ke Announcement 1)
        if (nomorScene === '8b') {
            resetRecordingUI();
            const scene8b = document.getElementById('scene-8b');
            scene8b.style.backgroundImage = "url('scene9_announcement_pegang_mic.png')";
            scene8b.style.backgroundPosition = "center 5%";
        }
        
        if (nomorScene === 9) {
            const video = document.getElementById('video-takeoff');
            if (video) {
                video.currentTime = 0;
                video.play();
                video.onended = () => pindahScene(10);
            }
        }
        if (nomorScene === 10) {
            const videoTerbang = document.getElementById('video-terbang-kokpit');
            if (videoTerbang) {
                videoTerbang.src = `scene8_takeoff_animasi_dalam_kokpit_${avatarPilihan}.mp4`;
                videoTerbang.load();
                videoTerbang.play();
                videoTerbang.onended = () => pindahScene(11);
            }
        }
        // Di dalam function pindahScene(nomorScene):

        if (nomorScene === 12) {
            const vid12 = document.getElementById('video-pemandangan');
            vid12.play();
            vid12.onended = () => { pindahScene(13); };
        }

        // Di dalam function pindahScene(nomorScene):

        if (nomorScene === 13) {
            const vid13 = document.getElementById('video-transisi-mendung');
            if (vid13) {
                vid13.currentTime = 0;
                vid13.play();
                // SETELAH VIDEO TRANSISI SELESAI, LANGSUNG KE KOKPIT GOYANG
                vid13.onended = () => { pindahScene(14); };
            }
        }

        if (nomorScene === 14) {
            const vid14 = document.getElementById('video-turbulensi-kokpit');
            if (vid14) {
                vid14.currentTime = 0;
                vid14.play();
                // SETELAH KOKPIT GOYANG SELESAI, LANGSUNG KE ANNOUNCEMENT KAPTEN
                vid14.onended = () => { pindahScene(15); };
            }
        }

        if (nomorScene === 15) {
            resetRecordingUI();
            const scene15 = document.getElementById('scene-15');
            
            // Ganti background berdasarkan gender Kapten
            const folderImg = (avatarPilihan === 'cowok') ? 'Cowok' : 'Cewek';
            scene15.style.backgroundImage = `url('Scene11_Pilot_${folderImg}_Menenangkan_Penumpang_Part2.png')`;
            scene15.style.backgroundPosition = "center 5%";
        }
         if (nomorScene === 16) {
            const vid16 = document.getElementById('video-pemulihan');
            if (vid16) {
                vid16.load();
                vid16.play();
                // SETELAH CUACA CERAH SELESAI, KE PENGUMUMAN CERAH
                vid16.onended = () => { pindahScene(17); };
            }
        }

        if (nomorScene === 17 || nomorScene === 18) {
            resetRecordingUI();
            const targetScene = document.getElementById('scene-' + nomorScene);
            targetScene.style.backgroundPosition = "center 5%";
        }

        if (nomorScene === 19) {
            const vid19 = document.getElementById('video-landing');
            if (vid19) {
                vid19.load();
                vid19.play();
                // SETELAH MENDARAT SELESAI, KE SERTIFIKAT
                vid19.onended = () => { pindahScene(20); };
            }
        }

        if (nomorScene === 20) {
            // Isi nama final di sertifikat
            document.getElementById('nama-kapten-final').innerText = namaKapten;
        }

        if (nomorScene === 19) {
            const vid19 = document.getElementById('video-landing');
            if (vid19) {
                vid19.load();
                vid19.play();
                vid19.onended = () => { pindahScene(20); };
            }
        }

        if (nomorScene === 20) {
            const scene20 = document.getElementById('scene-20');
            const g = (avatarPilihan === 'cowok') ? 'Cowok' : 'Cewek';
            scene20.style.backgroundImage = `url('Scene15_Pilot_${g}_Lihat_Luar.png')`;
            scene20.style.backgroundPosition = "center 5%";
        }

        if (nomorScene === 21) {
            const scene21 = document.getElementById('scene-21');
            const g = (avatarPilihan === 'cowok') ? 'Cowok' : 'Cewek';
            scene21.style.backgroundImage = `url('Scene15_Pilot_${g}_Lihat_Luar_Part2.png')`;
            scene21.style.backgroundPosition = "center 5%";
        }

        if (nomorScene === 23) {
            document.getElementById('nama-kapten-final').innerText = namaKapten;
        }
    }, delayGanti);

    if (!tanpaTransisi) {
        setTimeout(() => { overlay.classList.remove('active'); }, 1400);
    }
}

// ======================== FUNGSI REKAM ========================
function resetRecordingUI() {
    const sceneAktif = document.querySelector('.scene.active');
    if (!sceneAktif) return;

    // Sembunyikan kontrol yang tidak perlu di awal
    const btnStop = sceneAktif.querySelector('.stop');
    const btnPutar = sceneAktif.querySelector('.putar');
    const btnLanjut = sceneAktif.querySelector('.btn-lanjut-dialog');
    
    if (btnStop) btnStop.classList.add('hidden');
    if (btnPutar) btnPutar.classList.add('hidden');
    if (btnLanjut) btnLanjut.classList.add('hidden');

    const btnRekam = sceneAktif.querySelector('.rekam');
    if (btnRekam) {
        btnRekam.innerText = "🔴 Rekam Suara";
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
            sceneAktif.querySelector('.putar').classList.remove('hidden');
            sceneAktif.querySelector('.btn-lanjut-dialog').classList.remove('hidden');
        };

        mediaRecorder.start();
        
        const sceneAktif = document.querySelector('.scene.active');
        const btnRekam = sceneAktif.querySelector('.rekam');
        btnRekam.classList.add('recording');
        btnRekam.innerText = "🎤 Merekam...";
        btnRekam.disabled = true;
        sceneAktif.querySelector('.stop').classList.remove('hidden');

    } catch (err) {
        alert("Akses Mikrofon Gagal! Pastikan kamu pakai Live Server dan mengizinkan Mic.");
        console.error(err);
    }
}

function berhentiRekam() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        const sceneAktif = document.querySelector('.scene.active');
        const btnRekam = sceneAktif.querySelector('.rekam');
        btnRekam.classList.remove('recording');
        btnRekam.innerText = "🔴 Rekam Ulang";
        btnRekam.disabled = false;
        sceneAktif.querySelector('.stop').classList.add('hidden');
    }
}

function putarRekaman() {
    const audio = document.getElementById('audio-playback');
    if (audio.src) audio.play();
}


function resetRecordingUI() {
    const sceneAktif = document.querySelector('.scene.active');
    if (!sceneAktif) return;

    // Sembunyikan kontrol yang tidak perlu di awal
    const btnStop = sceneAktif.querySelector('.stop');
    const btnPutar = sceneAktif.querySelector('.putar');
    const btnLanjut = sceneAktif.querySelector('.btn-lanjut-dialog');
    
    if (btnStop) btnStop.classList.add('hidden');
    if (btnPutar) btnPutar.classList.add('hidden');
    if (btnLanjut) btnLanjut.classList.add('hidden');

    const btnRekam = sceneAktif.querySelector('.rekam');
    if (btnRekam) {
        btnRekam.innerText = "🔴 Rekam Suara";
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
            sceneAktif.querySelector('.putar').classList.remove('hidden');
            sceneAktif.querySelector('.btn-lanjut-dialog').classList.remove('hidden');
        };

        mediaRecorder.start();
        
        const sceneAktif = document.querySelector('.scene.active');
        const btnRekam = sceneAktif.querySelector('.rekam');
        btnRekam.classList.add('recording');
        btnRekam.innerText = "🎤 Merekam...";
        btnRekam.disabled = true;
        sceneAktif.querySelector('.stop').classList.remove('hidden');

    } catch (err) {
        alert("Akses Mikrofon Gagal! Pastikan kamu pakai Live Server dan mengizinkan Mic.");
        console.error(err);
    }
}

function berhentiRekam() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        const sceneAktif = document.querySelector('.scene.active');
        const btnRekam = sceneAktif.querySelector('.rekam');
        btnRekam.classList.remove('recording');
        btnRekam.innerText = "🔴 Rekam Ulang";
        btnRekam.disabled = false;
        sceneAktif.querySelector('.stop').classList.add('hidden');
    }
}

function putarRekaman() {
    const audio = document.getElementById('audio-playback');
    if (audio.src) audio.play();
}
// ==========================================
// FUNGSI INTERAKSI LAINNYA (TETAP SAMA)
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
        alert("Lengkapi nama dan pilih karakter dulu!");
    } else {
        document.getElementById('nama-kapten-display').innerText = namaKapten;
        document.getElementById('gambar-avatar-scene3').src = (avatarPilihan === 'cowok') ? "Cowok_Fullbody.jpeg" : "Cewek_Fullbody.jpeg";
        pindahScene(3); 
    }
}

// Logika Atribut Seragam
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

// Logika Kokpit
let statusKokpit = { mesin: false, gas: false, setir: false, mic: false };
function klikKokpit(jenis) {
    const info = {
        mesin: { judul: "Engine Start", teks: "Nyalakan mesin utama." },
        gas: { judul: "Tuas Gas", teks: "Atur kecepatan." },
        setir: { judul: "Yoke (Setir)", teks: "Kendalikan arah." },
        mic: { judul: "Mic Radio", teks: "Bicara ke penumpang." }
    };
    document.getElementById('popup-judul-kokpit').innerText = info[jenis].judul;
    document.getElementById('popup-teks-kokpit').innerText = info[jenis].teks;
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

// Drag & Drop Sabuk
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) {
    ev.preventDefault();
    if (ev.dataTransfer.getData("text") === "sabuk-ujung") {
        document.getElementById("sabuk-ujung").style.display = "none";
        const g = document.getElementById("sabuk-gesper");
        g.innerHTML = "✅ SABUK TERKUNCI";
        g.classList.add('sabuk-terkunci-sukses');
        document.getElementById('instruksi-scene7').innerText = "Mantap! Nyalakan mesinnya.";
        document.getElementById('btn-nyalakan-mesin').classList.remove('hidden');
    }
}

function nyalakanMesin() {
    alert("VROOOM! Mesin Hidup!");
    document.getElementById('btn-nyalakan-mesin').classList.add('hidden');
    document.getElementById('btn-lanjut-scene7').classList.remove('hidden');
}