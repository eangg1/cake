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

    document.addEventListener("DOMContentLoaded", function() {
        const audio = document.getElementById('birthdaySong');
        
        // Try to autoplay the audio
        audio.play().catch(error => {
            // If autoplay is blocked, show an alert prompting user interaction
            Swal.fire({
                title: 'Play Audio',
                text: 'Click below to enable the birthday song!',
                icon: 'info',
                confirmButtonText: 'Play',
                customClass: {
                    container: 'swal-container-netflix',
                    popup: 'swal-popup-netflix',
                    title: 'swal-title-netflix',
                    text: 'swal-text-netflix',
                    confirmButton: 'swal-confirm-button-netflix'
                }
            }).then(() => {
                // Play the audio after user clicks the button
                audio.play();
            });
        });

        // Show the SweetAlert2 pop-up for other instructions
        Swal.fire({
            title: 'Cara Tiup Lilin',
            text: 'Tiup lilinnya lewat mic, tiup di mic sekenceng mungkin sampe lilinnya mati (alternatif lain lilinnya dipencet)',
            imageUrl: 'wawa.jpg', // Ganti dengan URL gambar yang sesuai
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Wawa',
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