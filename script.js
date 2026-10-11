// ===== Particles background =====
function createParticles() {
    const container = document.getElementById('particles');
    const count = 30;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (8 + Math.random() * 12) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        p.style.opacity = 0.3 + Math.random() * 0.5;

        const size = 2 + Math.random() * 3;
        p.style.width = size + 'px';
        p.style.height = size + 'px';

        container.appendChild(p);
    }
}

// ===== Copy link =====
const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Đã copy!';
        setTimeout(() => copyBtn.innerHTML = original, 1500);
    } catch (err) {
        console.error('Copy failed:', err);
    }
});

// ===== Like button =====
const likeBtn = document.getElementById('likeBtn');
const likesEl = document.getElementById('likes');

let likes = parseInt(likesEl.textContent.replace(/,/g, '')) || 0;

// Load trạng thái đã like từ localStorage
let liked = localStorage.getItem('liked') === 'true';
if (liked) {
    likeBtn.classList.add('liked');
    likeBtn.innerHTML = '<i class="fas fa-heart"></i> Đã thích';
    likes += 1;
    likesEl.textContent = likes.toLocaleString();
}

likeBtn.addEventListener('click', () => {
    liked = !liked;
    if (liked) {
        likes += 1;
        likeBtn.classList.add('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i> Đã thích';
        localStorage.setItem('liked', 'true');
    } else {
        likes -= 1;
        likeBtn.classList.remove('liked');
        likeBtn.innerHTML = '<i class="fas fa-heart"></i> Like';
        localStorage.setItem('liked', 'false');
    }
    likesEl.textContent = likes.toLocaleString();
});

// ===== View counter (fake tăng dần) =====
const viewsEl = document.getElementById('views');
let views = parseInt(viewsEl.textContent.replace(/,/g, '')) || 1234;

// Tăng views mỗi khi load trang (giả lập)
if (!sessionStorage.getItem('viewed')) {
    views += 1;
    sessionStorage.setItem('viewed', 'true');
    viewsEl.textContent = views.toLocaleString();
}

// ===== Audio player =====
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');

let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIcon.className = 'fas fa-play';
    } else {
        audio.play().catch(err => console.log('Playback failed:', err));
        playIcon.className = 'fas fa-pause';
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + '%';
    }
});

audio.addEventListener('ended', () => {
    isPlaying = false;
    playIcon.className = 'fas fa-play';
});

// ===== Init =====
createParticles();
