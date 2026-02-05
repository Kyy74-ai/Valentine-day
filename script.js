// ============================================
// STRICT VALIDATION SYSTEM - HANYA "Aya"
// ============================================

// Konfigurasi
const CORRECT_NAME = "Aya";
const MAX_ATTEMPTS = 3;
let attempts = 0;
let unlocked = false;
let cooldown = false;

// DOM Elements
const nameInput = document.getElementById('nameInput');
const nameOutput = document.getElementById('nameOutput');
const nameOutput2 = document.getElementById('nameOutput2');
const surpriseBtn = document.getElementById('surpriseBtn');
const warningMessage = document.getElementById('warningMessage');
const warningText = document.getElementById('warningText');
const hintMessage = document.getElementById('hintMessage');
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
const footerText = document.getElementById('footerText');
const instructionText = document.getElementById('instructionText');
const bodyElement = document.getElementById('bodyElement');
const attemptsCounter = document.getElementById('attemptsCounter');
const attemptsCount = document.getElementById('attemptsCount');

// ============================================
// STRICT VALIDATION FUNCTION
// ============================================
function validateName(input) {
    // Trim dan cek exact match dengan case-sensitive
    return input.trim() === CORRECT_NAME;
}

// ============================================
// INPUT VALIDATION REAL-TIME
// ============================================
nameInput.addEventListener('input', function() {
    if (cooldown) return;
    
    const inputValue = this.value;
    const isValid = validateName(inputValue);
    
    // Reset semua status
    this.classList.remove('valid', 'invalid');
    validIcon.style.display = 'none';
    invalidIcon.style.display = 'none';
    warningMessage.style.display = 'none';
    
    // Kalo kosong
    if (inputValue === '') {
        surpriseBtn.disabled = true;
        surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Enter Correct Name';
        hintIcon.style.display = 'block';
        nameOutput.textContent = '...';
        return;
    }
    
    // Validasi ketat
    if (isValid) {
        // NAMA BENAR: "Aya"
        this.classList.add('valid');
        validIcon.style.display = 'block';
        invalidIcon.style.display = 'none';
        hintIcon.style.display = 'none';
        warningMessage.style.display = 'none';
        
        surpriseBtn.disabled = false;
        surpriseBtn.innerHTML = '<i class="fas fa-key"></i> Unlock Secret Message';
        
        nameOutput.textContent = CORRECT_NAME;
        nameOutput2.textContent = CORRECT_NAME;
        
    } else {
        // NAMA SALAH
        this.classList.add('invalid');
        validIcon.style.display = 'none';
        invalidIcon.style.display = 'block';
        hintIcon.style.display = 'none';
        
        surpriseBtn.disabled = true;
        surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Wrong Name';
        
        // Kasih hint berdasarkan input
        giveHint(inputValue);
        
        nameOutput.textContent = 'Unknown';
    }
});

// ============================================
// HINT SYSTEM
// ============================================
function giveHint(inputValue) {
    let hint = '';
    
    if (inputValue.length === 0) {
        hint = 'Please enter the secret name';
    } else if (inputValue.length < CORRECT_NAME.length) {
        hint = 'Too short! The name has ' + CORRECT_NAME.length + ' letters';
    } else if (inputValue.length > CORRECT_NAME.length) {
        hint = 'Too long! The name has ' + CORRECT_NAME.length + ' letters';
    } else if (inputValue.toLowerCase() === CORRECT_NAME.toLowerCase()) {
        hint = 'Case matters! Check your capitalization';
    } else if (inputValue.charAt(0).toUpperCase() !== 'A') {
        hint = 'First letter should be "A"';
    } else if (inputValue.includes(' ')) {
        hint = 'No spaces allowed!';
    } else {
        hint = 'Not quite right. Try "Aya" exactly';
    }
    
    warningText.textContent = hint;
    warningMessage.style.display = 'block';
}

// ============================================
// ATTEMPTS COUNTER
// ============================================
function updateAttemptsCounter() {
    attempts++;
    attemptsCount.textContent = attempts;
    
    if (attempts >= MAX_ATTEMPTS) {
        // Blokir input setelah 3 attempts
        nameInput.disabled = true;
        nameInput.classList.add('disabled');
        nameInput.placeholder = "Too many attempts!";
        surpriseBtn.disabled = true;
        surpriseBtn.innerHTML = '<i class="fas fa-ban"></i> Access Blocked';
        
        warningText.textContent = 'Maximum attempts reached! This name is protected.';
        warningMessage.style.display = 'block';
        warningMessage.style.color = '#ff4757';
        
        // Cooldown 10 detik
        cooldown = true;
        setTimeout(() => {
            cooldown = false;
            nameInput.disabled = false;
            nameInput.classList.remove('disabled');
            nameInput.placeholder = "Enter the secret name...";
            surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Enter Correct Name';
            warningMessage.style.display = 'none';
        }, 10000);
    }
}

// ============================================
// UNLOCK SYSTEM
// ============================================
surpriseBtn.addEventListener('click', function() {
    if (cooldown) return;
    
    const inputValue = nameInput.value.trim();
    
    // Final validation
    if (!validateName(inputValue)) {
        updateAttemptsCounter();
        
        // Effect untuk wrong attempt
        nameInput.classList.add('invalid');
        invalidIcon.style.display = 'block';
        
        // Shake animation
        nameInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            nameInput.style.animation = '';
        }, 500);
        
        return;
    }
    
    // NAMA BENAR - UNLOCK
    unlocked = true;
    
    // Show loading
    loading.style.display = 'block';
    surpriseBtn.style.display = 'none';
    warningMessage.style.display = 'none';
    
    // Simulate verification process
    setTimeout(() => {
        // Hide loading
        loading.style.display = 'none';
        surpriseBtn.style.display = 'inline-flex';
        
        // UNLOCK ALL FEATURES
        unlockWebsite();
        
    }, 2000);
});

// ============================================
// UNLOCK WEBSITE FUNCTION
// ============================================
function unlockWebsite() {
    // 1. Update UI Elements
    mainHeader.classList.remove('before-header');
    mainHeader.classList.add('after-header');
    mainHeader.innerHTML = '💖 WELCOME AYA! 💖';
    
    subtitle.innerHTML = 'Secret message unlocked successfully!';
    subtitle.style.color = '#00ff88';
    
    // 2. Update Message Box
    messageBox.classList.remove('before-mode');
    messageBox.classList.add('after-mode');
    
    // 3. Update Photo Frame
    photoFrame.classList.add('unlocked');
    defaultPic.classList.add('unlocked');
    defaultPic.innerHTML = '<i class="fas fa-heart"></i>';
    
    // 4. Update Button
    surpriseBtn.classList.add('unlocked');
    surpriseBtn.innerHTML = '<i class="fas fa-heart"></i> UNLOCKED <i class="fas fa-heart"></i>';
    surpriseBtn.disabled = false;
    
    // 5. Update Input
    nameInput.disabled = true;
    nameInput.classList.add('valid');
    nameInput.classList.remove('invalid');
    nameInput.placeholder = "Access Granted for Aya";
    
    // 6. Show Secret Message
    secretText.innerHTML = 'ACCESS GRANTED! Welcome Aya! You are the only one who can see this message. 💖';
    secretMsg.style.display = 'block';
    
    // 7. Update Footer
    footerText.innerHTML = '<i class="fas fa-check-circle"></i> Identity verified: AYA<br>💌 Exclusive content unlocked 💌';
    footerText.style.color = '#00ff88';
    
    // 8. Change Background
    bodyElement.style.background = 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
    
    // 9. Hide attempts counter
    attemptsCounter.style.display = 'none';
    
    // 10. Create celebration hearts
    createHearts(50, 'green');
    createHearts(30, 'blue');
    createHearts(20, 'red');
    
    // 11. Play unlock sound
    playUnlockSound();
    
    // 12. Auto-scroll to secret message
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
        // Create audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create unlock sound
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set frequencies for unlock sound
        oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator1.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator1.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        oscillator2.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
        oscillator2.frequency.setValueAtTime(493.88, audioContext.currentTime + 0.1); // B4
        oscillator2.frequency.setValueAtTime(587.33, audioContext.currentTime + 0.2); // D5
        
        // Gain envelope
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        // Start and stop
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
    // Focus ke input
    nameInput.focus();
    
    // Update attempts counter
    attemptsCount.textContent = attempts;
    
    // Create background hearts
    setInterval(() => {
        if (!unlocked) {
            createHearts(1, 'red');
        }
    }, 2000);
    
    // Hint system
    hintIcon.addEventListener('mouseenter', function() {
        hintMessage.style.opacity = '1';
    });
    
    hintIcon.addEventListener('mouseleave', function() {
        hintMessage.style.opacity = '0.8';
    });
    
    // Initial hint
    hintMessage.innerHTML = '<i class="fas fa-lightbulb"></i> Hint: The secret name is <span class="hint-text">"' + CORRECT_NAME + '"</span> exactly';
});

// ============================================
// ANTI-CHEAT SYSTEM
// ============================================
// Prevent copy-paste cheating
nameInput.addEventListener('paste', function(e) {
    e.preventDefault();
    warningText.textContent = 'Copy-paste disabled! Type the name manually.';
    warningMessage.style.display = 'block';
    updateAttemptsCounter();
});

// Prevent right-click
document.addEventListener('contextmenu', function(e) {
    if (e.target.id === 'nameInput') {
        e.preventDefault();
        warningText.textContent = 'Right-click disabled on this field!';
        warningMessage.style.display = 'block';
    }
});

// Log attempts to console (for debugging)
console.log(`🔒 Protected System Initialized`);
console.log(`🔑 Correct Name: "${CORRECT_NAME}"`);
console.log(`⚠️  Case-sensitive: ${CORRECT_NAME === CORRECT_NAME.toLowerCase() ? 'No' : 'Yes'}`);
console.log(`🚫 Maximum Attempts: ${MAX_ATTEMPTS}`);