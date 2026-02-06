const CORRECT_NAME = "Aya";
let attempts = 3;
let isLocked = false;
let lockTimer = null;

const lockScreen = document.getElementById('lockScreen');
const unlockedScreen = document.getElementById('unlockedScreen');
const nameInput = document.getElementById('nameInput');
const unlockBtn = document.getElementById('unlockBtn');
const attemptsCount = document.getElementById('attemptsCount');
const attemptsFill = document.getElementById('attemptsFill');
const timerBox = document.getElementById('timerBox');
const timer = document.getElementById('timer');
const ayaPhoto = document.getElementById('ayaPhoto');
const heartBtn = document.getElementById('heartBtn');
const secretMsg = document.getElementById('secretMsg');

// EVENT LISTENERS
unlockBtn.addEventListener('click', validateName);
nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') validateName();
});

// VALIDASI NAMA
function validateName() {
    if (isLocked) return;
    
    const enteredName = nameInput.value.trim();
    
    if (enteredName === CORRECT_NAME) {
        unlockWebsite();
    } else {
        handleWrongAttempt();
    }
}

// JIKA SALAH
function handleWrongAttempt() {
    attempts--;
    attemptsCount.textContent = attempts;
    attemptsFill.style.width = `${(attempts / 3) * 100}%`;
    
    // ANIMASI ERROR
    nameInput.classList.add('error');
    setTimeout(() => nameInput.classList.remove('error'), 500);
    
    nameInput.value = '';
    nameInput.placeholder = 'Wrong! Try again...';
    
    // GANTI WARNA PROGRESS BAR
    if (attempts === 2) attemptsFill.style.background = 'linear-gradient(to right, #ffcc00, #ff9500)';
    if (attempts === 1) attemptsFill.style.background = 'linear-gradient(to right, #ff3b30, #ff9500)';
    
    if (attempts <= 0) {
        lockSystem();
    }
}

// LOCK SYSTEM 30 DETIK
function lockSystem() {
    isLocked = true;
    unlockBtn.disabled = true;
    nameInput.disabled = true;
    timerBox.style.display = 'block';
    
    let seconds = 30;
    timer.textContent = seconds;
    
    lockTimer = setInterval(() => {
        seconds--;
        timer.textContent = seconds;
        
        if (seconds <= 0) {
            resetSystem();
        }
    }, 1000);
}

// RESET SYSTEM
function resetSystem() {
    clearInterval(lockTimer);
    isLocked = false;
    attempts = 3;
    attemptsCount.textContent = attempts;
    attemptsFill.style.width = '100%';
    attemptsFill.style.background = 'linear-gradient(to right, #4cd964, #ffcc00)';
    unlockBtn.disabled = false;
    nameInput.disabled = false;
    nameInput.placeholder = 'Enter the secret name...';
    timerBox.style.display = 'none';
}

// UNLOCK BERHASIL
function unlockWebsite() {
    lockScreen.classList.add('hidden');
    unlockedScreen.classList.remove('hidden');
    
    // TAMPILKAN FOTO AYA (jika ada)
    if (ayaPhoto) {
        ayaPhoto.style.display = 'block';
        document.querySelector('.default-pic').style.display = 'none';
    }
    
    createHearts(50);
}

// BUTTON LOVE DI HALAMAN 2
heartBtn.addEventListener('click', () => {
    secretMsg.style.display = 'block';
    heartBtn.innerHTML = '<i class="fas fa-heart"></i> I Love You More!';
    heartBtn.style.background = 'linear-gradient(45deg, #6a11cb, #2575fc)';
    createHearts(20);
});

// ANIMASI HATI
function createHearts(count) {
    const container = document.getElementById('hearts');
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}

// BACKGROUND HEARTS
setInterval(() => {
    if (!isLocked) createHearts(1);
}, 1500);

// ==================== */
// RESPONSIVE JS FIXES
// ==================== */

// Detect device and adjust
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        console.log('📱 Mobile device detected');
    } else if (isTablet) {
        document.body.classList.add('tablet-device');
        console.log('📟 Tablet device detected');
    } else {
        document.body.classList.add('desktop-device');
        console.log('💻 Desktop device detected');
    }
    
    // Adjust hearts animation for mobile
    if (isMobile || isTablet) {
        // Reduce number of hearts for better performance
        const heartsContainer = document.getElementById('hearts');
        if (heartsContainer) {
            heartsContainer.style.willChange = 'transform';
            heartsContainer.style.backfaceVisibility = 'hidden';
        }
    }
}

// Fix for iOS viewport height
function fixViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // For mobile safari
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        document.body.style.minHeight = `${window.innerHeight}px`;
    }
}

// Prevent zoom on input focus (iOS)
if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    nameInput.addEventListener('focus', function() {
        setTimeout(() => {
            this.style.fontSize = '16px';
        }, 100);
    });
}

// Initialize responsive fixes
window.addEventListener('DOMContentLoaded', function() {
    detectDevice();
    fixViewportHeight();
    
    // Recalculate on resize
    window.addEventListener('resize', fixViewportHeight);
    window.addEventListener('orientationchange', fixViewportHeight);
    
    // Fix for Android keyboard
    window.addEventListener('resize', function() {
        if (document.activeElement === nameInput) {
            setTimeout(() => {
                nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
});

// Add CSS variable for viewport height
const style = document.createElement('style');
style.textContent = `
    :root {
        --vh: 1vh;
    }
    
    .mobile-device .container {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    }
    
    .mobile-device .heart-btn:active {
        transform: scale(0.98) !important;
    }
    
    @media (max-width: 768px) {
        body {
            min-height: calc(var(--vh, 1vh) * 100);
        }
    }
`;
document.head.appendChild(style);
