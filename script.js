const songs = [
  { 
    title: "Dil Mudia Na", 
    artist: "Jazzy B", 
    image: "image.png", 
    audio: "Díl Mudia Na 320 Kbps.mp3"  // Removed songs/ directory
  },
  { 
    title: "Husn Walo Se", 
    artist: "Nusrat Fateh Ali Khan", 
    image: "image1.png", 
    audio: "Husn Walo Se 320 Kbps.mp3"  // Removed songs/ directory
  },
  { 
    title: "Teri Yaadon Se", 
    artist: "Mustafa Zahid", 
    image: "image2.png", 
    audio: "Teri Yaadon Se 128 Kbps.mp3"  // Removed songs/ directory
  }
];

let currentSongIndex = 0;
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

function loadSongs() {
  const songList = document.getElementById('songList');
  songList.innerHTML = '';

  songs.forEach((song, index) => {
    const songDiv = document.createElement('div');
    songDiv.classList.add('song');
    songDiv.innerHTML = `
      <img src="${song.image}" alt="${song.title}">
      <div class='song-info'>
        <div class='song-title'>${song.title}</div>
        <div class='song-artist'>${song.artist}</div>
      </div>
    `;
    songDiv.onclick = () => playSong(index);
    songList.appendChild(songDiv);
  });
}

function playSong(index) {
  currentSongIndex = index;
  audio.src = songs[index].audio;
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
}

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

playPauseBtn.onclick = togglePlayPause;
document.getElementById('prevBtn').onclick = prevSong;
document.getElementById('nextBtn').onclick = nextSong;

loadSongs();
