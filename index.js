const photos = [
  'AlexLFace.png', 'AlexLNote.png', 'alexMFace.png', 'alexMNote.png',
  'briFace.png', 'briNote.png', 'emmaFace.png', 'emmaNote.png',
  'graceFace.png', 'graceNote.png', 'MicahFace.png', 'micahNote.png',
  'nailaFace.png', 'nailaNote.png', 'zainabFace.png', 'zainabNote.png',
  'zayna1Face.png', 'zayna1Note.png', 'zayna2Face.png', 'zayna2Note.png'
];

const gallery = document.querySelector('.gallery');
for (let i = 0; i < photos.length; i += 2) {
  gallery.innerHTML += `
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img class="photo" src="assets/photo cards/${photos[i]}" alt="">
            </div>
            <div class="flip-card-back">
              <img class="photo" src="assets/photo cards/${photos[i + 1]}" alt="">
            </div>
          </div>
        </div>
      `;
}

function applyCardSpread() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  const cards = gallery.querySelectorAll('.flip-card');
  const max = cards.length;
  if (max === 0) return;
  const maxAngle = 40; // max angle in degrees for furthest card
  const tStep = 6; // vertical offset per card
  const galleryRect = gallery.getBoundingClientRect();
  const galleryCenter = galleryRect.left + galleryRect.width / 2;
  cards.forEach((card, i) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    // Relative position: -1 (far left), 0 (center), 1 (far right)
    const rel = (cardCenter - galleryCenter) / (galleryRect.width / 2);
    // Clamp rel to [-1, 1]
    const relClamped = Math.max(-1, Math.min(1, rel));
    const r = relClamped * maxAngle;
    const y = Math.abs(relClamped) * tStep * max;
    card.style.transform = `rotateZ(${r}deg) translateY(${y}px)`;
    // First card gets highest z-index, then decrease
    card.style.zIndex = (max - i).toString();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  applyCardSpread();
  window.addEventListener('resize', applyCardSpread);
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.addEventListener('scroll', applyCardSpread);
  }
});