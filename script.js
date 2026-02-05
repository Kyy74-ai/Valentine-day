// SIMPLE VALIDATION SYSTEM
const SECRET_NAME = "Aya";
let attempts = 0;
const MAX_ATTEMPTS = 5;
let isUnlocked = false;

// Get DOM elements
const nameInput = document.getElementById('nameInput');
const namePlaceholder = document.getElementById('namePlaceholder');
const nameDisplay = document.getElementById('nameDisplay');
const unlockBtn = document.getElementById('unlockBtn');
const errorBox = document.getElementById('errorBox');
const errorText = document.getElementById('errorText');
const iconCheck = document.getElementById('iconCheck');
const iconCross = document.getElementById('iconCross');
const hintBox = document.getElementById('hintBox');
const attemptCount = document.getElementById('attemptCount');
const mainTitle = document.getElementById('mainTitle');
const subtitle = document.getElementById('subtitle');
const photoFrame = document.getElementById('photoFrame');
const lockedPic = document.getElementById('lockedPic');
const unlockedPic = document.getElementById('unlockedPic');
const messageBox = document.getElementById('messageBox');
const messageBefore = document.getElementById('messageBefore');
const messageAfter = document.getElementById('messageAfter');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    nameInput.focus();
    attemptCount.textContent = attempts;
    createHearts();
});

// Real-time validation
nameInput.addEventListener('input', function() {
    if (isUnlocked) return;
    
    const input = this.value.trim();
    const isValid = input === SECRET_NAME;
    
    // Reset
    this.classList.remove('valid', 'invalid');
    iconCheck.style.display = 'none';
    iconCross.style.display = 'none';
    errorBox.style.display = 'none';
    
    if (input === '') {
        unlockBtn.disabled = true;
        unlockBtn.innerHTML = '<i class="fas fa-lock"></i> Enter Name First';
        namePlaceholder.textContent = '...';
        return;
    }
    
    if (isValid) {
        // Correct name
        this.classList.add('valid');
        iconCheck.style.display = 'block';
        
        unlockBtn.disabled = false;
        unlockBtn.innerHTML = '<i class="fas fa-key"></i> Unlock Message';
        
        namePlaceholder.textContent = SECRET_NAME;
        nameDisplay.textContent = SECRET_NAME;
        
    } else {
        // Wrong name
        this.classList.add('invalid');
        iconCross.style.display = 'block';
        
        unlockBtn.disabled = true;
        unlockBtn.innerHTML = '<i class="fas fa-lock"></i> Wrong Name';
        
        namePlaceholder.textContent = '???';
        
        // Show appropriate error
        if (input.length < SECRET_NAME.length) {
            errorText.textContent = 'Too short! Name has 3 letters';
        } else if (input.length > SECRET_NAME.length) {
            errorText.textContent = 'Too long! Name has 3 letters';
        } else if (input.toLowerCase() === SECRET_NAME.toLowerCase()) {
            errorText.textContent = 'Check capitalization (Aya)';
        } else {
            errorText.textContent = 'Not the right name';
        }
        errorBox.style.display = 'block';
    }
});

// Unlock button click
unlockBtn.addEventListener('click', function() {
    if (isUnlocked) return;
    
    const input = nameInput.value.trim();
    
    if (input !== SECRET_NAME) {
        attempts++;
        attemptCount.textContent = attempts;
        
        // Shake effect
        nameInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            nameInput.style.animation = '';
        }, 500);
        
        if (attempts >= MAX_ATTEMPTS) {
            lockSystem();
        }
        return;
    }
    
    // Correct name - unlock everything
    isUnlocked = true;
    unlockEverything();
});

// Unlock function
function unlockEverything() {
    // 1. Change title
    mainTitle.textContent = '💖 For Aya 💖';
    subtitle.textContent = 'Message unlocked successfully!';
    
    // 2. Switch from lock to photo
    lockedPic.style.display = 'none';
    unlockedPic.style.display = 'block';
    photoFrame.classList.add('unlocked');
    
    // 3. Switch message
    messageBox.classList.add('unlocked');
    
    // 4. Update button
    unlockBtn.classList.add('unlocked');
    unlockBtn.innerHTML = '<i class="fas fa-heart"></i> UNLOCKED! <i class="fas fa-heart"></i>';
    unlockBtn.disabled = false;
    
    // 5. Disable input
    nameInput.disabled = true;
    nameInput.placeholder = "Welcome Aya!";
    
    // 6. Hide hint and error
    hintBox.style.display = 'none';
    errorBox.style.display = 'none';
    
    // 7. Hide attempts counter
    document.querySelector('.attempts').style.display = 'none';
    
    // 8. Create celebration hearts
    for (let i = 0; i < 30; i++) {
        createHeart('green');
    }
    
    // 9. Play sound if available
    playUnlockSound();
}

// Lock system after max attempts
function lockSystem() {
    nameInput.disabled = true;
    nameInput.placeholder = "Too many attempts!";
    unlockBtn.disabled = true;
    unlockBtn.innerHTML = '<i class="fas fa-ban"></i> Locked';
    errorText.textContent = 'Maximum attempts reached! Try again later.';
    errorBox.style.display = 'block';
    
    setTimeout(() => {
        nameInput.disabled = false;
        nameInput.value = '';
        nameInput.placeholder = "Enter secret name...";
        unlockBtn.disabled = true;
        unlockBtn.innerHTML = '<i class="fas fa-lock"></i> Enter Name First';
        errorBox.style.display = 'none';
        attempts = 0;
        attemptCount.textContent = attempts;
    }, 10000); // 10 second cooldown
}

// Image fallback
function showFallbackImage() {
    unlockedPic.innerHTML = `
        <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(135deg,#4CAF50,#45a049);border-radius:50%;color:white;">
            <i class="fas fa-heart" style="font-size:60px;"></i>
            <div class="photo-text">FOR AYA</div>
        </div>
    `;
}

// Hearts animation
function createHearts() {
    setInterval(() => {
        if (!isUnlocked) {
            createHeart('pink');
        }
    }, 1000);
}

function createHeart(color) {
    const container = document.getElementById('hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    heart.innerHTML = '❤️';
    heart.style.color = color === 'green' ? '#4CAF50' : '#ff2e63';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    container.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Simple unlock sound
function playUnlockSound() {
    try {
        // Create a simple beep sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Ignore audio errors
    }
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Prevent copy-paste cheating
nameInput.addEventListener('paste', function(e) {
    e.preventDefault();
    errorText.textContent = 'Please type the name manually';
    errorBox.style.display = 'block';
});
