// ============================================
// STRICT VALIDATION SYSTEM
// ============================================

// Konfigurasi
const CORRECT_NAME = "Aya";
const MAX_ATTEMPTS = 3;
let attempts = 0;
let unlocked = false;
let cooldown = false;
let hintsUsed = 0;
const MAX_HINTS = 2;

// DOM Elements
const nameInput = document.getElementById('nameInput');
const nameOutput = document.getElementById('nameOutput');
const nameOutput2 = document.getElementById('nameOutput2');
const surpriseBtn = document.getElementById('surpriseBtn');
const warningMessage = document.getElementById('warningMessage');
const warningText = document.getElementById('warningText');
const hintMessage = document.getElementById('hintMessage');
const hintText = document.getElementById('hintText');
const validIcon = document.getElementById('validIcon');
const invalidIcon = document.getElementById('invalidIcon');
const hintIcon = document.getElementById('hintIcon');
const loading = document.getElementById('loading');
const secretMsg = document.getElementById('secretMsg');
const secretText = document.getElementById('secretText');
const messageBox = document.getElementById('messageBox');
const mainHeader = document.getElementById('mainHeader');
const subtitle = document.getElementById('subtitle');
const photoFrame = document.getElementById('photoFrame');
const defaultPic = document.getElementById('defaultPic');
const unlockedPic = document.getElementById('unlockedPic');
const footerText = document.getElementById('footerText');
const instructionText = document.getElementById('instructionText');
const bodyElement = document.getElementById('bodyElement');
const attemptsCounter = document.getElementById('attemptsCounter');
const attemptsCount = document.getElementById('attemptsCount');

// ============================================
// HINT SYSTEM (DISEMBUNYIKAN)
// ============================================
const HINTS = [
    "The name has 3 letters",
    "Starts with 'A'",
    "Ends with 'a'",
    "Middle letter is 'y'",
    "Common girl's name"
];

// ============================================
// VALIDATION FUNCTION
// ============================================
function validateName(input) {
    return input.trim() === CORRECT_NAME;
}

// ============================================
// INPUT VALIDATION
// ============================================
nameInput.addEventListener('input', function() {
    if (cooldown) return;
    
    const inputValue = this.value;
    const isValid = validateName(inputValue);
    
    // Reset UI
    this.classList.remove('valid', 'invalid');
    validIcon.style.display = 'none';
    invalidIcon.style.display = 'none';
    warningMessage.style.display = 'none';
    hintMessage.style.display = 'none';
    
    if (inputValue === '') {
        surpriseBtn.disabled = true;
        surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Locked';
        nameOutput.textContent = '[Name Required]';
        return;
    }
    
    if (isValid) {
        // NAMA BENAR
        this.classList.add('valid');
        validIcon.style.display = 'block';
        
        surpriseBtn.disabled = false;
        surpriseBtn.innerHTML = '<i class="fas fa-key"></i> Unlock Vault';
        
        nameOutput.textContent = CORRECT_NAME;
        nameOutput2.textContent = CORRECT_NAME;
        
    } else {
        // NAMA SALAH
        this.classList.add('invalid');
        invalidIcon.style.display = 'block';
        
        surpriseBtn.disabled = true;
        surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Wrong';
        
        nameOutput.textContent = 'Invalid';
        giveHint(inputValue);
    }
});

// ============================================
// HINT FUNCTION (TIDAK TAMPIL OTOMATIS)
// ============================================
function giveHint(inputValue) {
    let hint = '';
    
    if (inputValue.length === 0) {
        return;
    } else if (inputValue.length < CORRECT_NAME.length) {
        hint = 'Too short';
    } else if (inputValue.length > CORRECT_NAME.length) {
        hint = 'Too long';
    } else if (inputValue.toLowerCase() === CORRECT_NAME.toLowerCase()) {
        hint = 'Check capitalization';
    } else if (inputValue.charAt(0).toUpperCase() !== 'A') {
        hint = 'First letter is A';
    } else if (inputValue.includes(' ')) {
        hint = 'No spaces';
    } else {
        hint = 'Incorrect name';
    }
    
    warningText.textContent = hint;
    warningMessage.style.display = 'block';
}

// ============================================
// SHOW HINT ON CLICK (TIDAK OTOMATIS)
// ============================================
hintIcon.addEventListener('click', function() {
    if (hintsUsed >= MAX_HINTS) {
        warningText.textContent = 'No more hints available';
        warningMessage.style.display = 'block';
        return;
    }
    
    hintsUsed++;
    const hintIndex = Math.min(hintsUsed - 1, HINTS.length - 1);
    hintText.textContent = HINTS[hintIndex];
    hintMessage.style.display = 'block';
    
    // Update attempts
    attempts++;
    attemptsCount.textContent = attempts;
    
    if (hintsUsed >= MAX_HINTS) {
        hintIcon.style.opacity = '0.3';
        hintIcon.title = 'No hints left';
    }
});

// ============================================
// ATTEMPTS COUNTER
// ============================================
function updateAttemptsCounter() {
    attempts++;
    attemptsCount.textContent = attempts;
    
    if (attempts >= MAX_ATTEMPTS) {
        nameInput.disabled = true;
        nameInput.classList.add('disabled');
        nameInput.placeholder = "Too many attempts!";
        surpriseBtn.disabled = true;
        surpriseBtn.innerHTML = '<i class="fas fa-ban"></i> Blocked';
        
        warningText.textContent = 'Maximum attempts reached! Try again later.';
        warningMessage.style.display = 'block';
        
        cooldown = true;
        setTimeout(() => {
            cooldown = false;
            nameInput.disabled = false;
            nameInput.classList.remove('disabled');
            nameInput.placeholder = "Enter secret name...";
            nameInput.value = '';
            surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Locked';
            warningMessage.style.display = 'none';
            attempts = 0;
            attemptsCount.textContent = attempts;
        }, 30000); // 30 detik timeout
    }
}

// ============================================
// UNLOCK SYSTEM
// ============================================
surpriseBtn.addEventListener('click', function() {
    if (cooldown) return;
    
    const inputValue = nameInput.value.trim();
    
    if (!validateName(inputValue)) {
        updateAttemptsCounter();
        
        nameInput.classList.add('invalid');
        invalidIcon.style.display = 'block';
        
        nameInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            nameInput.style.animation = '';
        }, 500);
        
        return;
    }
    
    // NAMA BENAR
    unlocked = true;
    
    loading.style.display = 'block';
    surpriseBtn.style.display = 'none';
    warningMessage.style.display = 'none';
    hintMessage.style.display = 'none';
    
    setTimeout(() => {
        loading.style.display = 'none';
        surpriseBtn.style.display = 'inline-flex';
        
        unlockWebsite();
        
    }, 2000);
});

// ============================================
// UNLOCK WEBSITE FUNCTION
// ============================================
function unlockWebsite() {
    // 1. Update Header
    mainHeader.classList.remove('before-header');
    mainHeader.classList.add('after-header');
    mainHeader.innerHTML = '💖 WELCOME AYA 💖';
    
    subtitle.innerHTML = 'Vault unlocked successfully!';
    subtitle.style.color = '#00ff88';
    
    // 2. Update Photo Frame - TAMPILKAN FOTO UNLOCKED
    photoFrame.classList.add('unlocked');
    defaultPic.style.display = 'none';
    unlockedPic.style.display = 'block';
    
    // 3. Update Message Box
    messageBox.classList.remove('before-mode');
    messageBox.classList.add('after-mode');
    
    // 4. Update Button
    surpriseBtn.classList.add('unlocked');
    surpriseBtn.innerHTML = '<i class="fas fa-heart"></i> UNLOCKED <i class="fas fa-heart"></i>';
    surpriseBtn.disabled = false;
    
    // 5. Update Input
    nameInput.disabled = true;
    nameInput.classList.add('valid');
    nameInput.classList.remove('invalid');
    nameInput.placeholder = "Access Granted";
    
    // 6. Show Secret Message
    secretText.innerHTML = '🔓 VAULT UNLOCKED! Welcome Aya! This message is exclusively for you. 💖';
    secretMsg.style.display = 'block';
    
    // 7. Update Footer
    footerText.innerHTML = '<i class="fas fa-check-circle"></i> Identity verified<br>💌 Secret message revealed 💌';
    footerText.style.color = '#00ff88';
    
    // 8. Change Background
    bodyElement.style.background = 'linear-gradient(135deg, #0b2b1e 0%, #1a3a2e 50%, #2c4a3e 100%)';
    
    // 9. Hide attempts counter
    attemptsCounter.style.display = 'none';
    
    // 10. Celebration
    createHearts(50, 'green');
    createHearts(30, 'blue');
    
    // 11. Sound
    playUnlockSound();
    
    // 12. Auto-scroll
    setTimeout(() => {
        secretMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

// ============================================
// HEARTS ANIMATION
// ============================================
function createHearts(count, color = 'red') {
    const container = document.getElementById('hearts');
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart', color);
        
        const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞', '💘'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        
        container.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 7000);
    }
}

// ============================================
// SOUND EFFECTS
// ============================================
function playUnlockSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator1.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator1.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        
        oscillator2.frequency.setValueAtTime(392.00, audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(493.88, audioContext.currentTime + 0.1);
        oscillator2.frequency.setValueAtTime(587.33, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator1.start(audioContext.currentTime);
        oscillator2.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 0.5);
        oscillator2.stop(audioContext.currentTime + 0.5);
        
    } catch (e) {
        console.log("Audio not supported");
    }
}

// ============================================
// PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    nameInput.focus();
    attemptsCount.textContent = attempts;
    
    // Background hearts
    setInterval(() => {
        if (!unlocked) {
            createHearts(1, 'red');
        }
    }, 3000);
    
    // Initial state
    warningText.textContent = 'Enter the exact secret name';
});

// ============================================
// ANTI-CHEAT
// ============================================
nameInput.addEventListener('paste', function(e) {
    e.preventDefault();
    warningText.textContent = 'No copy-paste allowed! Type manually.';
    warningMessage.style.display = 'block';
    updateAttemptsCounter();
});

document.addEventListener('contextmenu', function(e) {
    if (e.target.id === 'nameInput') {
        e.preventDefault();
        warningText.textContent = 'Right-click disabled';
        warningMessage.style.display = 'block';
    }
});

// ============================================
// CONSOLE LOG
// ============================================
console.log(`🔒 Vault System Initialized`);
console.log(`🔑 Protected Name: "${CORRECT_NAME}"`);
console.log(`🎯 Case-sensitive: YES`);
console.log(`⚠️  Max Attempts: ${MAX_ATTEMPTS}`);
console.log(`💡 Hints Available: ${MAX_HINTS} (click ? icon)`);
