document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.getElementById('playButton');
  const stopButton = document.getElementById('stopButton');
  const audioPlayer = document.querySelector('.audio-player');
  const status = document.querySelector('.status');
  const progressIndicator = document.getElementById('progressIndicator');
  const movingIconsContainer = document.getElementById('movingIcons');
  const visualizer = document.getElementById('visualizer');
  const ctx = visualizer.getContext('2d');

  let isPlaying = false;
  let audioContext;
  let analyser;
  let dataArray;

  playButton.addEventListener('click', function() {
    if (!isPlaying) {
      isPlaying = true;
      status.textContent = 'Status: Playing';
      audioPlayer.src = 'Cyber Synthesis (Mastered with Thunder at 50pct).mp3'; // Replace with the actual path to your first song
      audioPlayer.play();
      initializeVisualizer();
      updateProgressBar();
      createMovingIcons();
    }
    playButton.addEventListener('click', function() {
    if (!isPlaying) {
      isPlaying = true;
      status.textContent = 'Status: Playing';
      audioPlayer.src = 'Ghost (Mastered with Aurora at 50pct).mp3'; // Replace with the actual path to your first song
      audioPlayer.play();
      initializeVisualizer();
      updateProgressBar();
      createMovingIcons();
      }
   }
    playButton.addEventListener('click', function() {
    if (!isPlaying) {
      isPlaying = true;
      status.textContent = 'Status: Playing';
      audioPlayer.src = 'Granular Synthesis (Mastered with Thunder at 50pct).mp3'; // Replace with the actual path to your first song
      audioPlayer.play();
      initializeVisualizer();
      updateProgressBar();
      createMovingIcons();
      }
    });

  stopButton.addEventListener('click', function() {
    if (isPlaying) {
      isPlaying = false;
      status.textContent = 'Status: Stopped';
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      progressIndicator.style.width = '0';
    }
  });

  function initializeVisualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    drawVisualizer();
  }

  function drawVisualizer() {
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, visualizer.width, visualizer.height);

    const barWidth = visualizer.width / dataArray.length;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = dataArray[i] * 2;
      const x = i * barWidth;
      const y = visualizer.height - barHeight;
      ctx.fillStyle = `rgb(${barHeight}, 0, 0)`;
      ctx.fillRect(x, y, barWidth, barHeight);
    }

    requestAnimationFrame(drawVisualizer);
  }

  function updateProgressBar() {
    if (isPlaying) {
      const currentTime = audioPlayer.currentTime;
      const duration = audioPlayer.duration;
      const progressPercentage = (currentTime / duration) * 100;
      progressIndicator.style.width = progressPercentage + '%';
      requestAnimationFrame(updateProgressBar);
    }
  }

  function createMovingIcons() {
    const iconCount = 10; // Adjust the number of icons as needed

    for (let i = 0; i < iconCount; i++) {
      const icon = document.createElement('div');
      icon.textContent = '🌐'; // Custom cyber icon
      icon.className = 'moving-icon';
      movingIconsContainer.appendChild(icon);

      const animation = icon.animate(
        [
          { transform: 'translate(0, 0)' },
          { transform: `translate(${Math.random() * 200}px, ${Math.random() * 200}px)` },
        ],
        {
          duration: Math.random() * 4000 + 2000, // Random duration between 2s and 6s
          easing: 'linear',
          iterations: Infinity,
          direction: 'alternate',
        }
      );
    }
  }
});
