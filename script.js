const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");

let currentTrack = 0;

const songs = [
  {
    title: "Dreams",
    artist: "Nova",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "Sunset Vibes",
    artist: "Aura",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Night Drive",
    artist: "Skywave",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

function loadSong(index) {
  const song = songs[index];
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + songs.length) % songs.length;
  loadSong(currentTrack);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % songs.length;
  loadSong(currentTrack);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

// Generate playlist
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;
  li.addEventListener("click", () => {
    currentTrack = index;
    loadSong(index);
    playSong();
  });
  playlistEl.appendChild(li);
});

loadSong(currentTrack);
