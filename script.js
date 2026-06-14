// ==========================================
// VARIABEL DATA PEMAIN & REKAMAN
// ==========================================
let namaKapten = "";
let avatarPilihan = "";
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let currentVO = null;


function gantiBGM(id) {
    const bgmCeria = document.getElementById('bgm-ceria');
    const bgmTegang = document.getElementById('bgm-tegang');

    // Stop semua dulu
    [bgmCeria, bgmTegang].forEach(bgm => {
        if (bgm) { bgm.pause(); bgm.currentTime = 0; }
    });

    // Play yang diminta
    const target = document.getElementById(id);
    if (target) {
        target.volume = 0.4;
        target.play().catch(e => console.log("BGM gagal:", e));
    }
}
function resumeBGM() {
    const bgmCeria = document.getElementById('bgm-ceria');
    const bgmTegang = document.getElementById('bgm-tegang');
    if (bgmCeria && bgmCeria.paused && bgmCeria.src) {
        bgmCeria.play().catch(e => console.log(e));
    }
    if (bgmTegang && bgmTegang.paused && bgmTegang.src) {
        bgmTegang.play().catch(e => console.log(e));
    }
}

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
    
    // Auto-play VO mentor scene 4
    setTimeout(() => {
        const vo = document.getElementById('audio-4a');
        if (vo) { vo.currentTime = 0; vo.play().catch(e => console.log(e)); }
    }, 500); // delay 0.5 detik biar scene sudah fully visible
}
        if (nomorScene === '4b') {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene4_Jalan_ke_Pesawat_Cowok_Part2.png' : 'jalan_ke_pesawat_cewek.jpeg';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 5) {
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene5_Jalan_ditangga_pesawat_cowok.png' : 'naik_tangga_pesawat_cewek.png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        if (nomorScene === 6) {
    const wajahS6 = document.getElementById('wajah-kapten-s6');
    if (wajahS6) {
        wajahS6.src = (avatarPilihan === 'cowok') ? 'Kapten_Cowok.jpeg' : 'Kapten_Cewek.jpeg';
    }
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
            // Auto-play VO mentor
    setTimeout(() => {
        const vo = document.getElementById('audio-8a');
        if (vo) { vo.currentTime = 0; vo.play().catch(e => console.log(e)); }
    }, 500);
        }

        // --- SCENE 9 & 10 (VIDEO OTOMATIS) ---
        if (nomorScene == 9) {
    resumeBGM(); // ganti yang manual tadi dengan ini
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
    resumeBGM();
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
    resumeBGM(); // ← tambahkan di sini
    resetRecordingUI();
            const bgImg = (avatarPilihan === 'cowok') ? 'Scene13_Pilot_Cowok_Announcement(Landing).png' : 'Scene13_Pilot_Cewek_Announcement(Landing).png';
            target.style.backgroundImage = `url('${bgImg}')`;
        }
        // --- SCENE 19: VIDEO LANDING (PERBAIKAN AGAR TIDAK STUCK) ---
        if (nomorScene === 19) {
    resumeBGM(); // ← tambahkan di sini
    const vid19 = document.getElementById('video-landing');
            if (vid19) {
                vid19.currentTime = 0; // Mulai dari awal
                vid19.muted = true;    // Pastikan mute agar browser mengizinkan autoplay
                
                // Perintah putar video
                vid19.play().catch(error => {
                    console.log("Video landing gagal putar otomatis:", error);
                });

                // Setelah video mendarat selesai, otomatis pindah ke Scene 20
                vid19.onended = () => {
                    pindahScene(20);
                };
            }
        }
        if (nomorScene === 20 || nomorScene === 21) {
            const g = (avatarPilihan === 'cowok') ? 'Cowok' : 'Cewek';
            const suffix = (nomorScene === 21) ? '_Part2' : '';
            target.style.backgroundImage = `url('Scene15_Pilot_${g}_Lihat_Luar${suffix}.png')`;
        }

        if (nomorScene === 22) target.style.backgroundImage = "url('Scene15_Petugas_Bagasi.png')";
       if (nomorScene === '22b') {
    const bgImg = (avatarPilihan === 'cowok') ? 'Scene15_Pilot_Cowok_Keluar_Kokpit.png' : 'Scene15_Pilot_Cewek_Keluar_Kokpit.png';
    target.style.backgroundImage = `url('${bgImg}')`;
}
        if (nomorScene === '22c') target.style.backgroundImage = "url('Scene15_Bicara_Sama_Pramugari_Part1.png')";
        if (nomorScene === '22d') target.style.backgroundImage = "url('Scene15_Bicara_Sama_Pramugari_Part2.png')";
        if (nomorScene === '22e') target.style.backgroundImage = "url('Scene15_Bicara_Sama_Pramugari_Part3.png')";

        
        // --- SCENE 22f: VIDEO KELUAR PESAWAT (PERBAIKAN) ---
        // --- SCENE 22f: KELUAR PESAWAT (VERSI ANTI GAGAL) ---
        if (nomorScene === '22f') {
            const vidKeluar = document.getElementById('video-keluar-pesawat');
            if (vidKeluar) {
                vidKeluar.muted = true;    // Wajib ada
                vidKeluar.currentTime = 0; // Reset ke awal
                vidKeluar.load();          // Paksa browser muat ulang file videonya
                
                // Perintah putar
                const janjiPutar = vidKeluar.play();
                
                if (janjiPutar !== undefined) {
                    janjiPutar.then(() => {
                        // Video berhasil jalan
                        console.log("Video berjalan!");
                    }).catch(error => {
                        // Jika tetap diblokir browser, langsung loncat ke sertifikat
                        console.log("Video diblokir browser, loncat ke sertifikat.");
                        pindahScene(23); 
                    });
                }

                // Setelah video selesai, pindah ke sertifikat
                vidKeluar.onended = () => {
                    pindahScene(23);
                };
            }
        }


        // --- SERTIFIKAT ---
        if (nomorScene === 23) {
            // Pastikan nama tidak kosong, jika kosong beri nama Kapten Cilik
            const namaFinal = namaKapten || "Kapten Cilik";
            document.getElementById('nama-kapten-final').innerText = namaFinal;
            
            const fotoSertif = document.getElementById('sertifikat-avatar');
            if (fotoSertif) {
                fotoSertif.src = (avatarPilihan === 'cowok') ? 'Kapten_Cowok.jpeg' : 'Kapten_Cewek.jpeg';
            }
        }

         if (nomorScene === 2) {
        gantiBGM('bgm-ceria'); // panggil saja, tidak mendefinisikan
    }
    if (nomorScene === 13) {
        gantiBGM('bgm-tegang');
    }
    if (nomorScene === 16) {
        gantiBGM('bgm-ceria');
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
         aturPosisiHotspot();
        pindahScene(3); 
    }
}
function aturPosisiHotspot() {
    const posisi = {
        cowok: {
            topi:    { top: '15%',  left: '49%' },
            epaulet: { top: '37%', left: '44%' },
            wing:    { top: '46%', left: '50%' },
            dasi:    { top: '44%', left: '48%' }
        },
        cewek: {
            topi:    { top: '6%',  left: '52%' },
            epaulet: { top: '38%', left: '46%' },
            wing:    { top: '44%', left: '53%' },
            dasi:    { top: '43%', left: '50%' }
        }
    };

    const p = posisi[avatarPilihan];
    Object.keys(p).forEach(jenis => {
        const btn = document.getElementById('btn-' + jenis);
        if (btn) {
            btn.style.top  = p[jenis].top;
            btn.style.left = p[jenis].left;
        }
    });
}
function putarVO(audioId) {
    const audio = document.getElementById(audioId);
    // Definisi BGM di luar agar bisa diakses di semua bagian fungsi
    const bgmCeria = document.getElementById('bgm-ceria');
    const bgmTegang = document.getElementById('bgm-tegang');

    if (!audio) {
        console.error("Audio dengan ID " + audioId + " tidak ditemukan!");
        return;
    }

    // Stop VO lain yang sedang berjalan
    if (currentVO && currentVO !== audio) {
        currentVO.pause();
        currentVO.currentTime = 0;
        document.querySelectorAll('.btn-speaker.playing').forEach(b => b.classList.remove('playing'));
    }

    // Cari tombol speaker untuk animasi
    const btn = audio.closest('.dialog-standar, .dialog-box, .dialog-kokpit-bubble, .popup-content')?.querySelector('.btn-speaker');

    if (audio.paused) {
        // Kecilkan BGM saat VO bunyi
        if (bgmCeria) bgmCeria.volume = 0.1;
        if (bgmTegang) bgmTegang.volume = 0.1;

        audio.currentTime = 0;
        audio.play().catch(e => console.log("Gagal memutar audio:", e));
        
        if (btn) btn.classList.add('playing');
        currentVO = audio;

        audio.onended = () => {
            if (btn) btn.classList.remove('playing');
            // Kembalikan volume BGM
            if (bgmCeria) bgmCeria.volume = 0.4;
            if (bgmTegang) bgmTegang.volume = 0.4;
            currentVO = null;
        };
    } else {
        // Jika diklik lagi saat sedang bunyi, maka stop
        audio.pause();
        audio.currentTime = 0;
        if (btn) btn.classList.remove('playing');
        if (bgmCeria) bgmCeria.volume = 0.4;
        if (bgmTegang) bgmTegang.volume = 0.4;
        currentVO = null;
    }
}
// ==========================================
// FUNGSI HOTSPOT SERAGAM
// ==========================================
let statusAtribut = { topi: false, wing: false, epaulet: false, dasi: false };
function klikAtribut(jenis) {
    const info = {
        topi:    { judul: "Topi Pilot",   teks: "Ini topi pilot! Topi ini bikin kita kelihatan gagah dan menunjukkan kalau kita adalah kapten yang siap bertugas! Keren banget kan?",          gambar: "topi_pilot.png",    audio: "audio/voiceover/vo_topi.MP3" },
        wing:    { judul: "Lencana Wing", teks: "Ini lencana wing! Lencana ini tandanya kita sudah jago terbang dan siap membawa penumpang ke tempat tujuan!",               gambar: "lencana_wings.png", audio: "audio/voiceover/vo_wings.MP3" },
        epaulet: { judul: "Pangkat",      teks: "Ini pangkat pilot! Lihat garis-garisnya di bahu! Garis ini menunjukkan kalau kita adalah kapten pesawat yang hebat!",                       gambar: "epaulet.png",       audio: "audio/voiceover/vo_pangkat.MP3" },
        dasi:    { judul: "Dasi",         teks: "Ini dasi pilot! Dasi ini bikin penampilan kita jadi rapi dan kelihatan profesional! Wah, Kapten kita makin keren nih!",                                                  gambar: "dasi.png",          audio: "audio/voiceover/vo_dasi.MP3" }
    };
      document.getElementById('popup-judul').innerText = info[jenis].judul;
    document.getElementById('popup-teks').innerText = info[jenis].teks;
    document.getElementById('popup-gambar').src = info[jenis].gambar;
    document.getElementById('popup-atribut').classList.remove('hidden');
    document.getElementById('btn-' + jenis).classList.replace('belum', 'sudah');
    statusAtribut[jenis] = true;

    // Auto-play VO saat popup muncul
    const audioPopup = document.getElementById('audio-popup-atribut');
    if (audioPopup) {
        audioPopup.src = info[jenis].audio;
        audioPopup.currentTime = 0;
        audioPopup.play().catch(e => console.log("VO popup gagal:", e));
    }
}

function tutupPopup() {
    document.getElementById('popup-atribut').classList.add('hidden');
    const audioPopup = document.getElementById('audio-popup-atribut');
    if (audioPopup) { audioPopup.pause(); audioPopup.currentTime = 0; }
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
        mesin: { judul: "Engine Start",  teks: "Ini tombol nyalain mesin! Kalau tombol ini ditekan, mesin pesawat akan mulai menyala dan siap untuk terbang!", gambar: "Scene6_start_engine.png", audio: "audio/voiceover/vo_engine_start.MP3" },
        gas:   { judul: "Tuas Gas",      teks: "Ini tuas gas! Tuas ini kita dorong ke depan supaya pesawat bisa melaju lebih cepat!",                          gambar: "Scene6_tuas.png",        audio: "audio/voiceover/vo_tuas_gas.MP3" },
        setir: { judul: "Yoke (Setir)",  teks: "Ini setir pesawat namanya yok! Kita putar ke kiri atau kanan supaya pesawat bisa berbelok sesuai arah yang kita mau!", gambar: "Scene6_yoke.png", audio: "audio/voiceover/vo_setir.MP3" }
    };
    document.getElementById('popup-judul-kokpit').innerText = info[jenis].judul;
    document.getElementById('popup-teks-kokpit').innerText = info[jenis].teks;
    document.getElementById('popup-gambar-kokpit').src = info[jenis].gambar;
    
    // Auto-play VO saat popup kokpit muncul
const audioPopup = document.getElementById('audio-popup-kokpit');
if (audioPopup) {
    audioPopup.src = info[jenis].audio;
    audioPopup.currentTime = 0;
    audioPopup.play().catch(e => console.log("VO popup gagal:", e));
}
    
    
    document.getElementById('popup-kokpit').classList.remove('hidden');
    document.getElementById('btn-' + jenis).classList.replace('belum', 'sudah');
    statusKokpit[jenis] = true;
}

function tutupPopupKokpit() {
    document.getElementById('popup-kokpit').classList.add('hidden');
    const audioPopup = document.getElementById('audio-popup-kokpit');
    if (audioPopup) { audioPopup.pause(); audioPopup.currentTime = 0; }
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
    
    // Auto-play VO saat dialog muncul
    const audioMap = {
        2: 'audio-k2', // mentor
        // tambah nomor lain kalau ada dialog lain yang punya VO
    };
    
    if (audioMap[nomor]) {
        const audio = document.getElementById(audioMap[nomor]);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("VO auto gagal:", e));
        }
    }
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
        // Play SFX sabuk
        const sfxSabuk = document.getElementById('audio-sabuk');
        if (sfxSabuk) { sfxSabuk.currentTime = 0; sfxSabuk.play(); }

        document.getElementById("sabuk-ujung").style.display = "none";
        const g = document.getElementById("sabuk-gesper");
        g.innerHTML = "<i class='fa-solid fa-lock'></i> SABUK TERKUNCI";
        g.classList.add('terkunci');
        document.getElementById('btn-nyalakan-mesin').classList.remove('hidden');
        document.getElementById('instruksi-sabuk').innerText = "Hebat! Sekarang nyalakan mesin pesawat.";
    }
}
function nyalakanMesin() {
    const sfx = document.getElementById('audio-mesin');
    if (sfx) { sfx.currentTime = 0; sfx.play(); }
    
    document.getElementById('btn-nyalakan-mesin').classList.add('hidden');
    document.getElementById('popup-mesin').classList.remove('hidden');
}

function tutupPopupMesin() {
    const sfx = document.getElementById('audio-mesin');
    if (sfx) {
        sfx.pause();
        sfx.currentTime = 0;
    }
    document.getElementById('popup-mesin').classList.add('hidden');
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
    // Pause BGM saat mulai rekam
    const bgmCeria = document.getElementById('bgm-ceria');
    const bgmTegang = document.getElementById('bgm-tegang');
    if (bgmCeria && !bgmCeria.paused) bgmCeria.pause();
    if (bgmTegang && !bgmTegang.paused) bgmTegang.pause();

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



function transisiKeScene12() { pindahScene(12); }

function playSFXButton() {
    const sfx = document.getElementById('sfx-button');
    if (sfx) { sfx.currentTime = 0; sfx.play(); }
}

document.addEventListener('click', (e) => {
    const isBtn = e.target.closest('.btn-lanjut-dialog, .btn-lanjut, .btn-tutup-popup, .btn-mulai, .btn-dialog-kokpit, .btn-aksi-hijau, .btn-aksi-kuning');
    if (isBtn) {
        const sfx = document.getElementById('sfx-button');
        if (sfx) { sfx.currentTime = 0; sfx.play(); }
    }
});