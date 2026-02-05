const CORRECT_NAME = "Aya";
let attempts = 3;
let isLocked = false;
let lockTimeout;

const lockScreen = document.getElementById('lockScreen');
const contentScreen = document.getElementById('contentScreen');
const nameInput = document.getElementById('nameInput');
const unlockBtn = document.getElementById('unlockBtn');
const attemptsDisplay = document.getElementById('attempts');
const timerMessage = document.getElementById('timerMessage');
const timeLeftDisplay = document.getElementById('timeLeft');
const icon = document.getElementById('icon');

unlockBtn.addEventListener('click', tryUnlock);
nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') tryUnlock();
});

function tryUnlock() {
    if (isLocked) return;

    const enteredName = nameInput.value.trim();
    
    if (enteredName === CORRECT_NAME) {
        unlockHeart();
    } else {
        attempts--;
        attemptsDisplay.textContent = `Attempts left: ${attempts}`;
        nameInput.value = '';
        nameInput.placeholder = 'Wrong! Try again...';
        nameInput.style.borderColor = '#ff4757';
        
        if (attempts <= 0) {
            lockSystem();
        }
    }
}

function unlockHeart() {
    lockScreen.classList.add('hidden');
    contentScreen.classList.remove('hidden');
    icon.src = "Aya.jpg";
}

function lockSystem() {
    isLocked = true;
    unlockBtn.disabled = true;
    nameInput.disabled = true;
    timerMessage.classList.remove('hidden');
    
    let timeLeft = 30;
    const timer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            resetSystem();
        }
    }, 1000);
}

function resetSystem() {
    isLocked = false;
    attempts = 3;
    unlockBtn.disabled = false;
    nameInput.disabled = false;
    nameInput.value = '';
    nameInput.placeholder = 'Enter the secret name...';
    nameInput.style.borderColor = '#ffafcc';
    attemptsDisplay.textContent = `Attempts left: ${attempts}`;
    timerMessage.classList.add('hidden');
}
