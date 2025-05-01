let playing = false;
const audio = document.getElementById('audio');
const btn = document.querySelector('.play-btn');
const lyricsContainer = document.getElementById('lyrics');
const progress = document.getElementById('progress');
const vinyl = document.getElementById('vinyl');
const heartBtn = document.querySelector('.heart-btn');
const danceOverlay = document.getElementById('dance-overlay');
let danceShown = false;

function togglePlay() {
  if (playing) {
    audio.pause();
    btn.textContent = '▶️';
    vinyl.classList.remove('active');
    vinyl.classList.add('slide-out');
  } else {
    audio.play();
    btn.textContent = '⏸️';
    vinyl.classList.remove('slide-out');
    vinyl.classList.add('active');
  }
  playing = !playing;
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

audio.addEventListener('loadedmetadata', () => {
  document.getElementById('duration').textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + '%';
  document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
  updateLyrics();

  if (!danceShown && audio.currentTime >= 8) {
    danceOverlay.classList.add('show');
    danceShown = true;
  }
});

function showHearts() {
  const heartContainer = document.getElementById('heart-container');
  heartContainer.innerHTML = '';

  const numberOfHearts = 80 + Math.floor(Math.random() * 21);

  for (let i = 0; i < numberOfHearts; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = 16 + Math.random() * 24 + 'px';
    heart.style.animationDelay = (Math.random() * 1.5) + 's';
    heartContainer.appendChild(heart);
  }

  heartBtn.classList.add('active-heart');

  setTimeout(() => {
    heartContainer.innerHTML = '';
    heartBtn.classList.remove('active-heart');
  }, 7000);
}

const lyricsLines = [
  { time: 0, text: "Hoo..." },
  { time: 1, text: "Siapa yang tau" },
  { time: 4, text: "Siapa yang mau" },
  { time: 5, text: "Kau di sana" },
  { time: 6, text: "Aku diseberangmu" },
];

let currentLine = 0;

function updateLyrics() {
  if (currentLine < lyricsLines.length && audio.currentTime >= lyricsLines[currentLine].time) {
    lyricsContainer.innerHTML = `<p>${lyricsLines[currentLine].text}</p>`;
    currentLine++;
  }
}

audio.addEventListener('play', () => {
  currentLine = 0;
  lyricsContainer.innerHTML = '';
  vinyl.classList.add('active');
});

audio.addEventListener('ended', () => {
  currentLine = 0;
  lyricsContainer.innerHTML = '';
  playing = false;
  btn.textContent = '▶️';
  vinyl.classList.remove('active');
  vinyl.classList.add('slide-out');
  danceOverlay.classList.remove('show');
  danceShown = false;
});
