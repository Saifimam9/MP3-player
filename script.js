// Select elements
const audioPlayer = document.getElementById('audio-player');
const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

// Song data
const songs = [
  { title: "Dil Mudia Na", artist: "Jazzy B", audio: "song1.mp3" },
  { title: "Husn Walo Se", artist: "Nusrat Fateh Ali Khan", audio: "song2.mp3" },
  { title: "Teri Yaadon Se", artist: "Mustafa Zahid", audio: "song3.mp3" }
];

let currentSongIndex = 0;

// Load song
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.audio;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
}

// Play or Pause
function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.textContent = '❚❚';
  } else {
    audioPlayer.pause();
    playButton.textContent = '▶';
  }
}

// Next Song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  playButton.textContent = '❚❚';
}

// Previous Song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  playButton.textContent = '❚❚';
}

// Update Progress Bar
function updateProgress() {
  const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progressPercent;

  // Update time display
  const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
  const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
  const durationMinutes = Math.floor(audioPlayer.duration / 60);
  const durationSeconds = Math.floor(audioPlayer.duration % 60);

  currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
  durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

// Seek function
function setProgress() {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
}

// Event Listeners
playButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
audioPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', setProgress);
audioPlayer.addEventListener('ended', nextSong);

// Initial load
loadSong(currentSongIndex);
