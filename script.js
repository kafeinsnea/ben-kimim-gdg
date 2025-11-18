// Oyun verileri
let currentIndex = 0;
let correctCount = 0;
let passCount = 0;
let cards = [];
let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;
let cardElement = null;

// Kişi verileri
const people = [
    { name: "Acun Ilıcalı", image: "images/acun ılıcalı.jpg", isCorrect: true },
    { name: "Albert Einstein", image: "images/albert einstein.jpg", isCorrect: true },
    { name: "Ali Koç", image: "images/ali koç.jpg", isCorrect: true },
    { name: "Arda Güler", image: "images/arda güler.jpg", isCorrect: true },
    { name: "Batman", image: "images/batman.jpg", isCorrect: true },
    { name: "Buders", image: "images/buders.jpg", isCorrect: true },
    { name: "Cakal", image: "images/cakal.jpg", isCorrect: true },
    { name: "Cem Yılmaz", image: "images/cem yılmaz.jpg", isCorrect: true },
    { name: "Elon Musk", image: "images/elon musk.jpg", isCorrect: true },
    { name: "Elraen", image: "images/elraen.jpg", isCorrect: true },
    { name: "Fatih Terim", image: "images/fatihterim.jpeg", isCorrect: true },
    { name: "Güven Demir", image: "images/güven demir.jpg", isCorrect: true },
    { name: "Harry Potter", image: "images/harry potter.jpg", isCorrect: true },
    { name: "Hulk", image: "images/hulk.jpg", isCorrect: true },
    { name: "Iron Man", image: "images/ironman.jpg", isCorrect: true },
    { name: "Jeff Bezos", image: "images/jeff bezos meme.jpg", isCorrect: true },
    { name: "Kadıköy Boğası", image: "images/kadıköy boğası.jpg", isCorrect: true },
    { name: "Kandıralı Ferdi", image: "images/kandıralı ferdi.jpg", isCorrect: true },
    { name: "Kaptan Amerika", image: "images/kaptan amerika.jpg", isCorrect: true },
    { name: "Lvbel C5", image: "images/lvbel c5.jpg", isCorrect: true },
    { name: "Manifest", image: "images/manifest.jpg", isCorrect: true },
    { name: "Marie Curie", image: "images/marie curie.jpg", isCorrect: true },
    { name: "Mark Zuckerberg", image: "images/mark zuckerberg.jpg", isCorrect: true },
    { name: "Merve Boluğur", image: "images/merve boluğur.jpg", isCorrect: true },
    { name: "Nejat İşler", image: "images/nejat işler.jpg", isCorrect: true },
    { name: "Orkun Işıtmak", image: "images/orkun ışıtmak.jpg", isCorrect: true },
    { name: "Polat Alemdar", image: "images/polat alemdar.jpg", isCorrect: true },
    { name: "Recep İvedik", image: "images/recep ivedik.jpg", isCorrect: true },
    { name: "Serdar Ortaç", image: "images/serdar ortaç.jpg", isCorrect: true },
    { name: "Superman", image: "images/superman.jpg", isCorrect: true },
    { name: "Teoman", image: "images/teoman.jpg", isCorrect: true },
    { name: "Nikola Tesla", image: "images/tesla.jpg", isCorrect: true },
    { name: "Testo Taylan", image: "images/testo taylan.jpg", isCorrect: true },
    { name: "Thor", image: "images/thor.jpg", isCorrect: true },
    { name: "Tolga Çevik", image: "images/tolga çevik.jpg", isCorrect: true },
    { name: "Yakışıklı Güvenlik", image: "images/yakışıklı güvenlik.jpg", isCorrect: true },
];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // Başlangıç ekranı butonuna event listener ekle
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
});

function startGame() {
    // Başlangıç ekranını gizle
    document.getElementById('welcomeScreen').style.display = 'none';
    // Oyun containerını göster
    document.getElementById('gameContainer').style.display = 'block';
    // Oyunu başlat
    initializeGame();
}

function initializeGame() {
    // Kartları oluştur
    createCards();
    // İlk kartı göster
    showNextCard();
    // Event listener'ları ekle
    setupEventListeners();
    // İlerleme çubuğunu güncelle
    updateProgress();
}

function createCards() {
    const cardStack = document.getElementById('cardStack');
    cardStack.innerHTML = '';
    
    people.forEach((person, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.innerHTML = `
            <img src="${person.image}" alt="${person.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22600%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22600%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2220%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3EResim Yüklenemedi%3C/text%3E%3C/svg%3E'">
            <div class="card-name">${person.name}</div>
        `;
        cardStack.appendChild(card);
    });
}

function showNextCard() {
    if (currentIndex >= people.length) {
        endGame();
        return;
    }
    
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((card, index) => {
        if (index === currentIndex) {
            card.style.zIndex = people.length - index;
            card.style.display = 'block';
            card.style.transform = '';
        } else if (index < currentIndex) {
            card.style.display = 'none';
        } else {
            card.style.zIndex = people.length - index;
            card.style.display = 'block';
            // Üstteki kartları sadece hafif geriye al, taşma olmasın
            const offset = Math.min((index - currentIndex) * 3, 15);
            card.style.transform = `translateY(${offset}px) scale(${1 - offset * 0.01})`;
        }
    });
    
    cardElement = document.querySelector(`.card[data-index="${currentIndex}"]`);
    updateProgress();
}

function setupEventListeners() {
    // Buton event'leri
    document.getElementById('passBtn').addEventListener('click', () => {
        if (cardElement && !isDragging) {
            swipeCard('left');
        }
    });
    
    document.getElementById('correctBtn').addEventListener('click', () => {
        if (cardElement && !isDragging) {
            swipeCard('right');
        }
    });
    
    // Mouse event'leri
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    
    // Touch event'leri
    document.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
}

function handleStart(e) {
    if (!cardElement) return;
    
    // Sadece kart üzerinde başlarsa işlem yap
    const target = e.target.closest('.card');
    if (!target || target.dataset.index != currentIndex) return;
    
    const touch = e.touches ? e.touches[0] : e;
    startX = touch.clientX;
    startY = touch.clientY;
    isDragging = true;
    cardElement.classList.add('dragging');
    
    e.preventDefault();
}

function handleMove(e) {
    if (!isDragging || !cardElement) return;
    
    const touch = e.touches ? e.touches[0] : e;
    currentX = touch.clientX - startX;
    currentY = touch.clientY - startY;
    
    const rotation = currentX / 20;
    cardElement.style.transform = `translateX(${currentX}px) translateY(${currentY}px) rotate(${rotation}deg)`;
    
    // Swipe feedback göster
    showSwipeFeedback(currentX);
    
    e.preventDefault();
}

function handleEnd(e) {
    if (!isDragging || !cardElement) return;
    
    isDragging = false;
    cardElement.classList.remove('dragging');
    
    const threshold = 100;
    
    if (Math.abs(currentX) > threshold) {
        // Swipe yapıldı
        if (currentX > 0) {
            swipeCard('right');
        } else {
            swipeCard('left');
        }
    } else {
        // Geri dön
        cardElement.style.transform = '';
        hideSwipeFeedback();
    }
    
    currentX = 0;
    currentY = 0;
}

function swipeCard(direction) {
    if (!cardElement) return;
    
    const person = people[currentIndex];
    const isCorrect = direction === 'right';
    
    // Skor güncelle
    if (isCorrect) {
        if (person.isCorrect) {
            correctCount++;
        } else {
            passCount++; // Yanlış cevap = pas sayılır
        }
    } else {
        passCount++;
    }
    
    updateScore();
    
    // Kartı kaydır
    cardElement.classList.add(direction === 'right' ? 'swiped-right' : 'swiped-left');
    
    // Sonraki karta geç
    setTimeout(() => {
        currentIndex++;
        showNextCard();
        hideSwipeFeedback();
    }, 300);
}

function showSwipeFeedback(x) {
    let indicator = document.querySelector('.swipe-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'swipe-indicator';
        document.querySelector('.game-area').appendChild(indicator);
    }
    
    if (x > 50) {
        indicator.textContent = '✓';
        indicator.className = 'swipe-indicator correct show';
    } else if (x < -50) {
        indicator.textContent = '✗';
        indicator.className = 'swipe-indicator pass show';
    } else {
        hideSwipeFeedback();
    }
}

function hideSwipeFeedback() {
    const indicator = document.querySelector('.swipe-indicator');
    if (indicator) {
        indicator.classList.remove('show');
    }
}

function updateScore() {
    document.getElementById('correct').textContent = correctCount;
    document.getElementById('pass').textContent = passCount;
}

function updateProgress() {
    const progress = (currentIndex / people.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = `${currentIndex} / ${people.length}`;
}

function endGame() {
    document.getElementById('cardStack').style.display = 'none';
    document.getElementById('noMoreCards').style.display = 'block';
    document.getElementById('finalCorrect').textContent = correctCount;
    document.getElementById('finalPass').textContent = passCount;
    document.querySelector('.actions').style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';
}
