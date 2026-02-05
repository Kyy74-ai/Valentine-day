// ============================================
// INITIALIZE ALL VARIABLES FIRST!
// ============================================

// Configuration
const CORRECT_NAME = "Aya";
const MAX_ATTEMPTS = 5;
let attempts = 0;  // ← INI HARUS ADA!
let unlocked = false;
let cooldown = false;
let hintsUsed = 0;
const MAX_HINTS = 3;

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
const lockedPic = document.getElementById('lockedPic');
const unlockedPic = document.getElementById('unlockedPic');
const footerText = document.getElementById('footerText');
const instructionText = document.getElementById('instructionText');
const bodyElement = document.getElementById('bodyElement');
const attemptsCounter = document.getElementById('attemptsCounter');
const attemptsCount = document.getElementById('attemptsCount');

// Hints system
const HINTS = [
    "It's a 3-letter name",
    "First letter is A",
    "Last letter is a",
    "A common girl's name",
    "Short and sweet"
];

// ============================================
// VALIDATION FUNCTION
// ============================================
function validateName(input) {
    return input.trim() === CORRECT_NAME;
}

// ============================================
// INPUT VALIDATION REAL-TIME
// ============================================
nameInput.addEventListener('input', function() {
    if (cooldown || unlocked) return;
    
    const inputValue = this.value;
    const isValid = validateName(inputValue);
    
    // Reset UI states
    this.classList.remove('valid', 'invalid');
    validIcon.style.display = 'none';
    invalidIcon.style.display = 'none';
    warningMessage.style.display = 'none';
    
    if (inputValue === '') {
        // Empty input
        surpriseBtn.disabled = true;
        surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Enter Name';
        nameOutput.textContent = '[Name Required]';
        return;
    }
    
    if (isValid) {
        // CORRECT NAME: "Aya"
        this.classList.add('valid');
        validIcon.style.display = 'block';
        invalidIcon.style.display = 'none';
        
        surpriseBtn.disabled = false;
        surpriseBtn.innerHTML = '<i class="fas fa-key"></i> Unlock Message';
        
        nameOutput.textContent = CORRECT_NAME;
        nameOutput2.textContent = CORRECT_NAME;
        
    } else {
        // WRONG NAME
        this.classList.add('invalid');
        validIcon.style.display = 'none';
        invalidIcon.style.display = 'block';
        
        surpriseBtn.disabled = true;
        surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Incorrect';
        
        nameOutput.textContent = 'Invalid';
        showInputHint(inputValue);
    }
});

// ============================================
// SHOW HINT BASED ON INPUT
// ============================================
function showInputHint(inputValue) {
    let hint = '';
    
    if (inputValue.length === 0) return;
    
    if (inputValue.length < CORRECT_NAME.length) {
        hint = 'Name is too short';
    } else if (inputValue.length > CORRECT_NAME.length) {
        hint = 'Name is too long';
    } else if (inputValue.toLowerCase() === CORRECT_NAME.toLowerCase()) {
        hint = 'Check your capitalization';
    } else if (inputValue.charAt(0).toUpperCase() !== 'A') {
        hint = 'Starts with A';
    } else if (inputValue.includes(' ')) {
        hint = 'No spaces allowed';
    } else {
        hint = 'Not the right name';
    }
    
    warningText.textContent = hint;
    warningMessage.style.display = 'block';
}

// ============================================
// HINT ICON CLICK (MANUAL HINTS)
// ============================================
hintIcon.addEventListener('click', function() {
    if (hintsUsed >= MAX_HINTS || unlocked) {
        warningText.textContent = 'No more hints available';
        warningMessage.style.display = 'block';
        return;
    }
    
    hintsUsed++;
    const hintIndex = Math.min(hintsUsed - 1, HINTS.length - 1);
    hintText.textContent = HINTS[hintIndex];
    hintMessage.style.display = 'block';
    
    // Count as attempt
    attempts++;
    attemptsCount.textContent = attempts;
    
    // Update hint icon
    hintIcon.style.opacity = '0.6';
    hintIcon.title = `Hints used: ${hintsUsed}/${MAX_HINTS}`;
    
    if (hintsUsed >= MAX_HINTS) {
        hintIcon.style.color = '#666';
        hintIcon.style.cursor = 'not-allowed';
    }
    
    // Check max attempts
    if (attempts >= MAX_ATTEMPTS) {
        activateCooldown();
    }
});

// ============================================
// ATTEMPTS & COOLDOWN SYSTEM
// ============================================
function updateAttemptsCounter() {
    attempts++;
    attemptsCount.textContent = attempts;
    
    if (attempts >= MAX_ATTEMPTS) {
        activateCooldown();
    }
}

function activateCooldown() {
    nameInput.disabled = true;
    nameInput.classList.add('disabled');
    nameInput.placeholder = "Too many attempts!";
    surpriseBtn.disabled = true;
    surpriseBtn.innerHTML = '<i class="fas fa-ban"></i> Locked for 30s';
    
    warningText.textContent = 'Maximum attempts reached! System locked.';
    warningMessage.style.display = 'block';
    
    cooldown = true;
    
    // 30 second cooldown
    setTimeout(() => {
        cooldown = false;
        nameInput.disabled = false;
        nameInput.classList.remove('disabled');
        nameInput.placeholder = "Enter secret name...";
        nameInput.value = '';
        surpriseBtn.innerHTML = '<i class="fas fa-lock"></i> Enter Name';
        warningMessage.style.display = 'none';
        attempts = 0;
        attemptsCount.textContent = attempts;
        hintsUsed = 0;
        hintIcon.style.opacity = '1';
        hintIcon.style.color = '';
        hintIcon.style.cursor = 'help';
        hintIcon.title = 'Click for hint';
    }, 30000);
}

// ============================================
// UNLOCK BUTTON CLICK
// ============================================
surpriseBtn.addEventListener('click', function() {
    if (cooldown || unlocked) return;
    
    const inputValue = nameInput.value.trim();
    
    // Final validation
    if (!validateName(inputValue)) {
        updateAttemptsCounter();
        
        nameInput.classList.add('invalid');
        invalidIcon.style.display = 'block';
        
        // Shake effect
        nameInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            nameInput.style.animation = '';
        }, 500);
        
        return;
    }
    
    // CORRECT NAME - PROCEED TO UNLOCK
    unlocked = true;
    
    // Show loading animation
    loading.style.display = 'block';
    surpriseBtn.style.display = 'none';
    warningMessage.style.display = 'none';
    hintMessage.style.display = 'none';
    
    // Simulate verification process
    setTimeout(() => {
        unlockWebsite();
    }, 1800);
});

// ============================================
// UNLOCK WEBSITE FUNCTION
// ============================================
function unlockWebsite() {
    // Hide loading
    loading.style.display = 'none';
    surpriseBtn.style.display = 'inline-flex';
    
    // 1. SWITCH FROM LOCK TO HEART/PHOTO
    if (lockedPic) lockedPic.style.display = 'none';
    if (unlockedPic) unlockedPic.style.display = 'flex';
    if (photoFrame) photoFrame.classList.add('unlocked');
    
    // 2. UPDATE HEADER
    if (mainHeader) {
        mainHeader.classList.remove('before-header');
        mainHeader.classList.add('after-header');
        mainHeader.innerHTML = '💖 WELCOME AYA 💖';
    }
    
    if (subtitle) {
        subtitle.innerHTML = 'Secret message unlocked successfully!';
        subtitle.style.color = '#00ff88';
    }
    
    // 3. UPDATE MESSAGE BOX
    if (messageBox) {
        messageBox.classList.remove('before-mode');
        messageBox.classList.add('after-mode');
    }
    
    // 4. UPDATE BUTTON
    if (surpriseBtn) {
        surpriseBtn.classList.add('unlocked');
        surpriseBtn.innerHTML = '<i class="fas fa-heart"></i> UNLOCKED <i class="fas fa-heart"></i>';
        surpriseBtn.disabled = false;
    }
    
    // 5. UPDATE INPUT FIELD
    if (nameInput) {
        nameInput.disabled = true;
        nameInput.classList.add('valid');
        nameInput.classList.remove('invalid');
        nameInput.placeholder = "Access Granted for Aya";
    }
    
    // 6. SHOW SECRET MESSAGE
    if (secretMsg && secretText) {
        secretText.innerHTML = '✅ IDENTITY VERIFIED! This exclusive message is only for Aya. 💖';
        secretMsg.style.display = 'block';
    }
    
    // 7. UPDATE FOOTER
    if (footerText) {
        footerText.innerHTML = '<i class="fas fa-check-circle"></i> Special access granted<br>💌 Private content unlocked 💌';
        footerText.style.color = '#00ff88';
    }
    
    // 8. CHANGE BACKGROUND
    if (bodyElement) {
        bodyElement.style.background = 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
    }
    
    // 9. HIDE ATTEMPTS COUNTER
    if (attemptsCounter) {
        attemptsCounter.style.display = 'none';
    }
    
    // 10. CELEBRATION EFFECTS
    createHearts(60, 'green');
    createHearts(40, 'blue');
    createHearts(20, 'pink');
    
    // 11. PLAY UNLOCK SOUND
    playUnlockSound();
    
    // 12. AUTO-SCROLL TO MESSAGE
    setTimeout(() => {
        if (secretMsg) {
            secretMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 600);
}

// ============================================
// HEARTS ANIMATION
// ============================================
function createHearts(count, color = 'red') {
    const container = document.getElementById('hearts');
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart', color);
        
        const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞', '💘'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 25 + 20) + 'px';
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
        
        // Create unlock melody
        const times = [0, 0.1, 0.2, 0.3, 0.4];
        const frequencies = [523.25, 659.25, 783.99, 987.77, 1174.66];
        
        times.forEach((time, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequencies[index], audioContext.currentTime + time);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime + time);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + time + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + time + 0.3);
            
            oscillator.start(audioContext.currentTime + time);
            oscillator.stop(audioContext.currentTime + time + 0.5);
        });
        
    } catch (e) {
        // Silent fail if audio not supported
    }
}

// ============================================
// IMAGE ERROR HANDLER
// ============================================
function handleImageError() {
    const photoImage = document.getElementById('photoImage');
    const unlockedPic = document.getElementById('unlockedPic');
    
    if (!unlockedPic) return;
    
    // Jika foto tidak ditemukan, tampilkan fallback heart
    unlockedPic.innerHTML = `
        <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#00ff88;">
            <i class="fas fa-heart" style="font-size:80px;"></i>
            <div class="photo-text">FOR AYA</div>
        </div>
    `;
}

// ============================================
// PAGE INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize attempts counter
    if (attemptsCount) {
        attemptsCount.textContent = attempts;
    }
    
    // Focus on input field
    if (nameInput) {
        nameInput.focus();
    }
    
    // Create background hearts (locked state)
    setInterval(() => {
        if (!unlocked) {
            createHearts(2, 'red');
        }
    }, 2500);
    
    // Initial instruction
    if (instructionText) {
        instructionText.textContent = 'Case-sensitive • No spaces • Max 5 attempts';
    }
});

// ============================================
// ANTI-CHEAT MEASURES
// ============================================
if (nameInput) {
    nameInput.addEventListener('paste', function(e) {
        e.preventDefault();
        if (warningText) {
            warningText.textContent = 'Manual typing required! No copy-paste.';
        }
        if (warningMessage) {
            warningMessage.style.display = 'block';
        }
        updateAttemptsCounter();
    });

    nameInput.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if (warningText) {
            warningText.textContent = 'Right-click disabled on this field';
        }
        if (warningMessage) {
            warningMessage.style.display = 'block';
        }
    });
}

// ============================================
// CONSOLE LOGS
// ============================================
console.log('🔒 Secure Vault System Initialized');
console.log('🔑 Protected Access Name: "Aya"');
console.log('⚠️  Case-sensitive Validation: ENABLED');
console.log('🎯 Maximum Attempts: ' + MAX_ATTEMPTS);
console.log('💡 Hint System: ' + MAX_HINTS + ' hints available');
