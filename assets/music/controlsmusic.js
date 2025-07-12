const audio = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const nextBtn = document.getElementById('nextBtn');
const timeDisplay = document.getElementById('timeDisplay');
const songTitle = document.getElementById('songTitle');
const volumePercent = document.getElementById('volumePercent');

// Danh sách nhạc local
const playlist = [
    { title: 'Die For U', file: 'assets/music/dieforu.mp3' },
    { title: 'Bài 2 chill', file: 'assets/music/song2.mp3' },
    { title: 'Bài 3 nữa nè', file: 'assets/music/song3.mp3' }
];

let currentSong = 0;

// Load bài hát
function loadSong(index) {
    audio.src = playlist[index].file;
    songTitle.textContent = playlist[index].title;
    audio.load();
}

// Next bài
function nextSong() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    audio.play();
}

playBtn.onclick = () => audio.play();
pauseBtn.onclick = () => audio.pause();
nextBtn.onclick = nextSong;

audio.ontimeupdate = () => {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}`;
};

// Volume điều khiển bằng số %
let volume = 0.5;
audio.volume = volume;

function updateVolumeDisplay() {
    volumePercent.textContent = Math.round(volume * 100) + '%';
}

volumePercent.addEventListener('wheel', function(e) {
    e.preventDefault();
    let step = 0.05;
    if (e.deltaY < 0) {
        volume = Math.min(1, volume + step);
    } else {
        volume = Math.max(0, volume - step);
    }
    audio.volume = volume;
    updateVolumeDisplay();
});

// Auto next khi hết bài
audio.onended = nextSong;

// Khởi tạo ban đầu
loadSong(currentSong);
updateVolumeDisplay();
