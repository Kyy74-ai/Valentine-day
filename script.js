// ============================================
// TAMBAH FUNGSI DI unlockWebsite()
// ============================================
function unlockWebsite() {
    // 1. SWITCH FROM LOCK TO PHOTO
    const lockedPic = document.getElementById('lockedPic');
    const unlockedPic = document.getElementById('unlockedPic');
    
    lockedPic.style.display = 'none';
    unlockedPic.style.display = 'flex';
    photoFrame.classList.add('unlocked');
    
    // 2. PRELOAD IMAGE UNTUK SMOOTH TRANSITION
    const photoImage = document.getElementById('photoImage');
    const img = new Image();
    img.src = 'Aya.JPG';
    img.onload = function() {
        photoImage.style.opacity = '1';
        photoImage.style.transform = 'scale(1)';
    };
    
    // 3. LANJUTAN UPDATE UI...
    mainHeader.classList.remove('before-header');
    mainHeader.classList.add('after-header');
    mainHeader.innerHTML = '💖 WELCOME AYA 💖';
    
    subtitle.innerHTML = 'Secret message unlocked!';
    subtitle.style.color = '#00ff88';
    
    messageBox.classList.remove('before-mode');
    messageBox.classList.add('after-mode');
    
    surpriseBtn.classList.add('unlocked');
    surpriseBtn.innerHTML = '<i class="fas fa-heart"></i> UNLOCKED <i class="fas fa-heart"></i>';
    surpriseBtn.disabled = false;
    
    nameInput.disabled = true;
    nameInput.classList.add('valid');
    nameInput.classList.remove('invalid');
    nameInput.placeholder = "Welcome Aya";
    
    secretText.innerHTML = '✅ IDENTITY VERIFIED! This message is only for Aya. 💖';
    secretMsg.style.display = 'block';
    
    footerText.innerHTML = '<i class="fas fa-check-circle"></i> Special access granted<br>💌 Private content unlocked 💌';
    footerText.style.color = '#00ff88';
    
    bodyElement.style.background = 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)';
    
    attemptsCounter.style.display = 'none';
    
    createHearts(50, 'green');
    createHearts(30, 'blue');
    
    playUnlockSound();
    
    setTimeout(() => {
        secretMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);
}

// ============================================
// TAMBAH FUNGSI IMAGE ERROR HANDLING
// ============================================
function handleImageError() {
    const photoImage = document.getElementById('photoImage');
    const unlockedPic = document.getElementById('unlockedPic');
    
    // Jika foto tidak ditemukan, tampilkan fallback heart
    unlockedPic.innerHTML = `
        <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#00ff88;">
            <i class="fas fa-heart" style="font-size:80px;"></i>
            <div class="photo-text">FOR AYA</div>
        </div>
    `;
}

// ============================================
// TAMBAH DI document.addEventListener
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Preload image untuk performa lebih baik
    const img = new Image();
    img.src = 'Aya.JPG';
    
    // Sisanya tetap sama...
    nameInput.focus();
    attemptsCount.textContent = attempts;
    
    setInterval(() => {
        if (!unlocked) {
            createHearts(1, 'red');
        }
    }, 2000);
});
