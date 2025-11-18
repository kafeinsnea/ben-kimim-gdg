# Ben Kimim? - Tinder Tarzı Oyun 🎮

GitHub Pages'te yayınlanan interaktif "Ben Kimim?" oyunu. Tinder tarzı swipe mekanizması ile kişileri tanıyın!

## 🎯 Nasıl Oynanır?

- **Sağa kaydır** (veya ✅ butonuna tıkla) = Doğru
- **Sola kaydır** (veya ❌ butonuna tıkla) = Pas
- Kartları fare ile sürükleyebilir veya dokunmatik ekranda kaydırabilirsiniz

## 🚀 Kurulum

1. Bu repository'yi klonlayın:
```bash
git clone https://github.com/kafeinsnea/ben-kimim-gdg.git
cd ben-kimim-gdg
```

2. `images` klasörü oluşturun ve fotoğrafları ekleyin:
```bash
mkdir images
# Fotoğraflarınızı images klasörüne kopyalayın
```

3. `script.js` dosyasındaki `people` array'ini doldurun:
```javascript
const people = [
    { name: "İsim 1", image: "images/foto1.jpg", isCorrect: true },
    { name: "İsim 2", image: "images/foto2.jpg", isCorrect: false },
    // ... daha fazla kişi
];
```

## 📦 GitHub Pages'e Yayınlama

1. Repository'nizin **Settings** sekmesine gidin
2. Sol menüden **Pages** seçeneğine tıklayın
3. **Source** bölümünden **main** branch'ini seçin
4. **Save** butonuna tıklayın
5. Birkaç dakika sonra siteniz şu adreste yayınlanacak:
   `https://kafeinsnea.github.io/ben-kimim-gdg/`

## 🎨 Özellikler

- ✨ Modern ve responsive tasarım
- 📱 Mobil uyumlu (touch swipe desteği)
- 🖱️ Masaüstü uyumlu (mouse drag desteği)
- 📊 Skor takibi
- 🎯 Doğru/Pas sistemi
- 🎉 Oyun sonu ekranı

## 📁 Dosya Yapısı

```
ben-kimim-gdg/
├── index.html      # Ana HTML dosyası
├── style.css       # Stil dosyası
├── script.js       # JavaScript mantığı
├── images/         # Fotoğraflar klasörü
└── README.md       # Bu dosya
```

## 🛠️ Teknolojiler

- HTML5
- CSS3 (Gradients, Animations, Flexbox)
- Vanilla JavaScript (ES6+)

## 📝 Notlar

- Fotoğraflar için önerilen boyut: 400x600px veya benzer oran
- JPG, PNG veya WebP formatları desteklenir
- Her kişi için `isCorrect: true/false` değerini ayarlayarak doğru cevabı belirleyin

## 📄 Lisans

Bu proje açık kaynaklıdır ve serbestçe kullanılabilir.

---

**Yapımcı:** [kafeinsnea](https://github.com/kafeinsnea)
