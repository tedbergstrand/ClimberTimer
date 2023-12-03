//Hangboard Timer Javascript Code

function updateTimerSettings() {
    var protocolSelect = document.getElementById('protocolSelect');
    var selectedExerciseName = protocolSelect.value;

    fetch('exerciseDetails.json')
        .then(response => response.json())
        .then(data => {
            var selectedExercise = data.find(exercise => exercise.name === selectedExerciseName);
            if (selectedExercise) {
                repAmount = selectedExercise.repAmount;
                repRest = selectedExercise.repRest;
                setAmount = selectedExercise.setAmount;
                setRest = selectedExercise.setRest;

                currentRep = 0;
                currentSet = 0;
                isHanging = true;

                // Set repTime based on exercise details
                repTime = selectedExercise.repTime;

                // Set getReadyTime to 10 seconds for Get Ready phase
                getReadyTime = 10;
                currentTime = getReadyTime;
                isGettingReady = true;

                updateTimerDisplay();
            } else {
                console.error('Selected exercise not found in JSON');
            }
        })
        .catch(error => console.error('Error fetching exercise details:', error));
}

//


let isGettingReady = false;
let timerInterval; let currentTime = 0;
let repAmount, repTime, repRest, setAmount, setRest;
let currentRep = 0; let currentSet = 0; let isHanging = true;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function beep(duration = 200, frequency = 520) {
  console.log('Beep called'); // Debugging
  let oscillator = audioCtx.createOscillator();
  let gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.frequency.value = frequency;
  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + duration * 0.001);
}

function updateTimerDisplay() {
  let displayText;
  if (isGettingReady) {
    displayText = 'Get Ready ' + currentTime; // Display "Get Ready" during the get-ready phase
  } else {
    displayText = isHanging ? 'Climb ' : 'Rest ';
    displayText += currentTime;
  }
  document.getElementById('timerDisplay').textContent = displayText;
}


function timerTick() {
    if (isGettingReady) {
        // Get Ready phase countdown
        if (currentTime <= 1) {
            beep(); // Beep at the end of Get Ready phase
            isGettingReady = false;
            // Start the actual timer for the exercise
            currentRep = 0;
            currentSet = 0;
            isHanging = true;
            currentTime = repTime;
        } else {
            currentTime--;
        }
    } else {
        // Regular timer phase
        if (currentTime <= 1) {
            beep(); // Call beep at every transition
            if (isHanging) {
                if (currentRep < repAmount) {
                    isHanging = false;
                    currentTime = repRest;
                    currentRep++;
                } else if (currentSet < setAmount) {
                    currentSet++;
                    currentRep = 0;
                    isHanging = false;
                    currentTime = setRest;
                } else {
                    // Check if there are more sets or stop the timer
                    if (currentSet < setAmount - 1) {
                        currentSet++;
                        currentRep = 0;
                        isHanging = false;
                        currentTime = setRest;
                    } else {
                        stopTimer();
                        return;
                    }
                }
            } else {
                isHanging = true;
                currentTime = repTime;
            }
        } else {
            currentTime--;
        }
    }
    updateTimerDisplay();
}

function startTimer() {
  // Update timer settings based on selected protocol
  updateTimerSettings();

  console.log('Attempting to start timer');
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // Start the Get Ready phase
  isGettingReady = true;
  currentTime = 10; // Set the Get Ready phase to 10 seconds
  if (!timerInterval) {
    console.log('Starting new timer');
    timerInterval = setInterval(timerTick, 1000);
    updateTimerDisplay();
  }
}



function stopTimer() {
  console.log('Stopping timer'); // Debugging
  if(timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = null; // Clear the interval variable
  currentTime = 0; isHanging = true;
  currentRep = 0; currentSet = 0; // Reset rep and set counters
  updateTimerDisplay();
}

