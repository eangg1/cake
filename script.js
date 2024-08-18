let isBlowing = false;
    let isFlameOff = false;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);

            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            microphone.connect(analyser);

            setInterval(function() {
                analyser.getByteTimeDomainData(dataArray);
                const sum = dataArray.reduce((acc, val) => acc + val, 0);
                const average = sum / bufferLength;
                if (average > 130) { // Adjusted threshold to 180 for higher effort blow
                    if (!isBlowing && !isFlameOff) {
                        isBlowing = true;
                        toggleFlame(); // Turn off the flame when blowing into the microphone
                        toggleFlame2(); // Toggle flame2 text visibility
                        isFlameOff = true;
                    }
                } else {
                    isBlowing = false;
                }
            }, 100);
        })
        .catch(function(err) {
            console.error('Error accessing microphone:', err);
        });

    function toggleFlame() {
        const flame = document.getElementById('toggleFlame');
        flame.classList.toggle('off');
    }

    function toggleFlame2() {
        const flame2 = document.getElementById('texttoggleFlame');
        flame2.classList.toggle('on');
    }

    document.getElementById('toggleFlame').addEventListener('click', function() {
        this.classList.toggle('off');
        document.getElementById('texttoggleFlame').classList.toggle('on');
        isFlameOff = !isFlameOff;
    });

    function closeWindow() {
        // Menutup jendela atau tab saat tombol diklik
        window.close();
    }

    const audio = document.getElementById('birthdaySong');
    const body = document.body;
    
    audio.addEventListener('play', () => {
        body.classList.add('play-music');
    });
    
    audio.addEventListener('pause', () => {
        body.classList.remove('play-music');
    });
    
    document.addEventListener("DOMContentLoaded", function() {
        const audio = document.getElementById('birthdaySong');
        
        // Pastikan audio dimulai secara otomatis jika memungkinkan
        audio.play().catch(error => {
            // Tangani kasus di mana autoplay tidak diizinkan
            console.log("Autoplay tidak diizinkan, coba dengan interaksi pengguna");
        });
    
        // Menampilkan SweetAlert2
        Swal.fire({
            title: 'Cara Tiup Lilin',
            text: 'Tiup lilinnya lewat mic, tiup di mic sekenceng mungkin sampe lilinnya mati (alternatif lain lilinnya dipencet)',
            imageUrl: 'wawa.jpg', // Ganti dengan URL gambar yang sesuai
            imageWidth: 150, // Lebar gambar
            imageHeight: 150, // Tinggi gambar
            imageAlt: 'Wawa', // Alt text untuk gambar
            confirmButtonText: 'Ayo Lihat Kuenya',
            customClass: {
                container: 'swal-container-netflix',
                popup: 'swal-popup-netflix',
                title: 'swal-title-netflix',
                text: 'swal-text-netflix',
                confirmButton: 'swal-confirm-button-netflix'
            }
        });
    });