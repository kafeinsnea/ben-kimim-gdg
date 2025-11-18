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

// Kişi verileri - Fotoğrafları ekledikten sonra buraya ekleyin
// Format: { name: "İsim", image: "images/foto.jpg", isCorrect: true/false }
// isCorrect: true = Bu kişiyi tanıyorsanız "Doğru" seçeneğini işaretleyin
// isCorrect: false = Bu kişiyi tanımıyorsanız "Pas" seçeneğini işaretleyin
const people = [
    // Örnek format (yorum satırlarını kaldırıp kendi verilerinizi ekleyin):
    // { name: "Albert Einstein", image: "images/einstein.jpg", isCorrect: true },
    // { name: "Marie Curie", image: "images/curie.jpg", isCorrect: true },
    // { name: "Nikola Tesla", image: "images/tesla.jpg", isCorrect: true },
];

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

function initializeGame() {
    // Eğer kişi listesi boşsa, örnek placeholder ekle
    if (people.length === 0) {
        showPlaceholder();
        return;
    }
    
    // Kartları oluştur
    createCards();
    // İlk kartı göster
    showNextCard();
    // Event listener'ları ekle
    setupEventListeners();
}

function showPlaceholder() {
    const cardStack = document.getElementById('cardStack');
    cardStack.innerHTML = `
        <div class="card" style="position: relative;">
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; padding: 20px; text-align: center;">
                <h2 style="color: #667eea; margin-bottom: 20px;">📸 Fotoğrafları Ekleyin</h2>
                <p style="color: #666; margin-bottom: 10px;">1. <code>images</code> klasörü oluşturun</p>
                <p style="color: #666; margin-bottom: 10px;">2. Fotoğrafları ekleyin</p>
                <p style="color: #666; margin-bottom: 20px;">3. <code>script.js</code> dosyasındaki <code>people</code> array'ini doldurun</p>
                <p style="color: #999; font-size: 14px;">Örnek format:</p>
                <code style="background: #f5f5f5; padding: 10px; border-radius: 5px; font-size: 12px;">
                    { name: "İsim", image: "images/foto.jpg", isCorrect: true }
                </code>
            </div>
        </div>
    `;
}

function createCards() {
    const cardStack = document.getElementById('cardStack');
    cardStack.innerHTML = '';
    
    people.forEach((person, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.index = index;
        card.innerHTML = `<img src="${person.image}" alt="${person.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22600%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22600%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2220%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3EResim Yüklenemedi%3C/text%3E%3C/svg%3E'">`;
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
        } else if (index < currentIndex) {
            card.style.display = 'none';
        } else {
            card.style.zIndex = people.length - index;
            card.style.display = 'block';
            // Üstteki kartları biraz geriye al
            const offset = (index - currentIndex) * 5;
            card.style.transform = `scale(${1 - offset * 0.02}) translateY(${offset}px)`;
        }
    });
    
    cardElement = document.querySelector(`.card[data-index="${currentIndex}"]`);
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

function endGame() {
    document.getElementById('cardStack').style.display = 'none';
    document.getElementById('noMoreCards').style.display = 'block';
    document.getElementById('finalCorrect').textContent = correctCount;
    document.getElementById('finalPass').textContent = passCount;
    document.querySelector('.actions').style.display = 'none';
}

