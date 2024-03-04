window.addEventListener('load', () => {
    // После полной загрузки страницы показываем прелоадер
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'block';

    // Минимальная длительность показа прелоадера (например, 3 секунды в миллисекундах)
    const minPreloaderDuration = 200;

    // Запустить таймер для скрытия прелоадера после минимальной длительности
    setTimeout(() => {
        preloader.style.display = 'none';
    }, minPreloaderDuration);
});



//slider

let currentArtist = 0;
const totalArtists = document.querySelectorAll('.artist-card').length;

function showArtist(index) {
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach((card, i) => {
        if (i === index) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function showNextArtist() {
    currentArtist = (currentArtist + 1) % totalArtists;
    showArtist(currentArtist);
}

function showPreviousArtist() {
    currentArtist = (currentArtist - 1 + totalArtists) % totalArtists;
    showArtist(currentArtist);
}

// Показать первого артиста при загрузке страницы
showArtist(currentArtist);


//tracks

class AudioPlayer {
    constructor(playerSelector) {
        this.players = document.querySelectorAll(playerSelector);
        this.isPlaying = false;
        this.isDragging = false;
        // this.currentPlayer = null;

        this.init();
    }

    init() {
        this.players.forEach((player) => {
            const audioPlayer = player.querySelector('.audioPlayer');
            const playStopButton = player.querySelector('.playStopButton');
            const playIcon = player.querySelector('.playIcon');
            const pauseIcon = player.querySelector('.pauseIcon');
            const status = player.querySelector('.status');
            const timeIndicator = player.querySelector('.timeIndicator');
            const progressIndicator = player.querySelector('.progressIndicator');
            const progressBar = player.querySelector('.progressBar');

            playStopButton.addEventListener('click', () => {
                this.togglePlayStop(audioPlayer, playIcon, pauseIcon);
            });

            // progressBar.addEventListener('click', () => {
            //     this.togglePlayStop(audioPlayer, playIcon, pauseIcon);
            // })

            progressBar.addEventListener('mousedown', (e) => {
                this.togglePlay(audioPlayer, playIcon, pauseIcon);
                this.moveIndicator(e, audioPlayer, progressBar, playIcon, pauseIcon);
            });

            // progressBar.addEventListener('mousedown', (e) => {
            //     this.moveIndicator(e, audioPlayer, progressBar);
            // });
            
            audioPlayer.addEventListener('timeupdate', () => {
                if (!this.isDragging) {
                    this.updateTimeIndicator(audioPlayer, timeIndicator);
                    this.updateProgressBar(audioPlayer, progressIndicator);
                }
            });

            document.addEventListener('mouseup', () => {
                if (this.isDragging) {
                    this.isDragging = false;
                    audioPlayer.play();
                }
            });
        });
    }

     togglePlayStop(audioPlayer, playIcon, pauseIcon) {
        if (audioPlayer.paused) {
            this.pauseAllPlayers();
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            audioPlayer.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    }

    togglePlay(audioPlayer, playIcon, pauseIcon) {
            this.pauseAllPlayers();
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
    }

    pauseAllPlayers() {
        this.players.forEach(item => {
            const currentPlayer = item.querySelector('.audioPlayer');
            const currentPlayIcon = item.querySelector('.playIcon');
            const currentPauseIcon = item.querySelector('.pauseIcon');

            if (currentPlayer !== this.currentPlayer) {
                currentPlayer.pause();
                currentPlayIcon.style.display = 'inline';
                currentPauseIcon.style.display = 'none';
            }
        });
    }

    updateTimeIndicator(audioPlayer, timeIndicator) {
        const currentTime = this.formatTime(audioPlayer.currentTime);
        timeIndicator.textContent = `${currentTime}`;
    }

    updateProgressBar(audioPlayer, progressIndicator) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressIndicator.style.left = `${progress}%`;
    }

    moveIndicator(e, audioPlayer, progressBar, pauseIcon, playIcon) {
            const rect = progressBar.getBoundingClientRect();
            const xPos = e.clientX - rect.left;
            const percentage = (xPos / rect.width) * 100;
            const newTime = (audioPlayer.duration * percentage) / 100;
            audioPlayer.currentTime = newTime;
            this.updateProgressBar(progressBar);
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')};`
        return formattedTime;
    }
}


const player = new AudioPlayer('#player');











