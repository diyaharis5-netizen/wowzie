(async () => {
  // Check for browser support
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Microphone access is not supported in this browser.");
    return;
  }

  let stream;
  let audioContext;
  let analyser;
  let dataArray;
  let source;
  let currentVolume = 0;
  let silentStartTime = null;

  // Constants
  const SILENCE_THRESHOLD = 0.01; // volume below which considered silent
  const LOUD_THRESHOLD = 0.3; // volume above which considered loud
  const SILENCE_DURATION = 5000; // 5 seconds in ms

  // State
  let lastVolumeLoud = false;
  let silenceTimer = null;

  // Get microphone access
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    alert("Microphone access denied or error: " + err);
    return;
  }

  // Set up Web Audio API
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  source = audioContext.createMediaStreamSource(stream);
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256; // Smaller size for more rapid updates
  dataArray = new Uint8Array(analyser.fftSize);

  source.connect(analyser);

  // Function to compute volume
  function getVolume() {
    analyser.getByteTimeDomainData(dataArray);
    let sumSquares = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const normalized = (dataArray[i] - 128) / 128; // normalize between -1 and 1
      sumSquares += normalized * normalized;
    }
    const rms = Math.sqrt(sumSquares / dataArray.length);
    return rms; // rms between 0 and ~1
  }

  // Function to update volume and handle states
 function monitor() {
    currentVolume = getVolume();

    // Update CSS variable for visual bars (assumed to be integrated in your HTML)
    document.documentElement.style.setProperty('--currentVolume', currentVolume);

    // Check for silence duration
    if (currentVolume < SILENCE_THRESHOLD) {
      if (silentStartTime === null) {
        silentStartTime = Date.now();
      } else {
        const elapsed = Date.now() - silentStartTime;
        if (elapsed >= SILENCE_DURATION && !lastVolumeLoud) {
          // Play quiet message
          speak("SHHH! It's too quiet in here!");
          silentStartTime = null; // reset
        }
      }
    } else {
      silentStartTime = null; // reset when volume is above threshold
    }

    // Optional: Play message when loud
    if (currentVolume > LOUD_THRESHOLD && !lastVolumeLoud) {
      speak("Whoa! Lower your volume!");
      lastVolumeLoud = true;
    } else if (currentVolume <= LOUD_THRESHOLD) {
      lastVolumeLoud = false;
    }

    // Schedule next check
    requestAnimationFrame(monitor);
  }

  // Voice synthesis function
  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  }

  // Start monitoring
  monitor();

})();
