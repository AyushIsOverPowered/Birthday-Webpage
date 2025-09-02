/*********************
 * PAGE NAVIGATION
 *********************/
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

document.getElementById('nextBtn').addEventListener('click', () => {
  page1.style.display = 'none';
  page2.style.display = 'flex';
  window.scrollTo(0, 0);
});

document.getElementById('backBtn').addEventListener('click', () => {
  page2.style.display = 'none';
  page1.style.display = 'flex';
});


/*********************
 * PAGE 1 - CONFETTI
 *********************/
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx1 = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];
for (let i = 0; i < 50; i++) {
  confetti.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 100,
    color: `hsl(${Math.random() * 360},70%,60%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0
  });
}

function drawConfetti() {
  ctx1.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((c, i) => {
    ctx1.beginPath();
    ctx1.lineWidth = c.r / 2;
    ctx1.strokeStyle = c.color;
    ctx1.moveTo(c.x + c.tilt + c.r / 4, c.y);
    ctx1.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
    ctx1.stroke();
    c.tiltAngle += c.tiltAngleIncremental;
    c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
    c.tilt = Math.sin(c.tiltAngle) * 15;
    if (c.y > confettiCanvas.height) {
      confetti[i] = { x: Math.random() * confettiCanvas.width, y: -10, r: c.r, d: c.d, color: c.color, tilt: Math.random() * 10 - 10, tiltAngleIncremental: c.tiltAngleIncremental, tiltAngle: 0 };
    }
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

/*********************
 * PAGE 2 - TYPEWRITER & HEARTS
 *********************/
const paragraphs = [
  `Happy Birthday, my love, my wife, my jaan, my whole world 💕✨`,
  `Today is the most special day of all, because on this day the most beautiful soul was born — you. The girl who became my everything, my closest person, my safe place, my princess, my moonlight 🌙. You are not just my girlfriend, you are my forever, the only one I have, the only one I need, and the only one my heart will ever choose ❤️.`,
  `We have fought, we have cried, we have had ups and downs — but every time, our love has always been stronger than anything. No matter what, we come back to each other, because deep down we both know that we are home to each other 🏡💕. My jaan, you are not just my partner, you are my strength, my joy, and my biggest blessing.`,
  `You know, I still feel like I am just a boy who dreams of loving someone's daughter with all his heart 💖. I want to make you feel truly loved, make you smile every day, and remind you again and again that you are the most special girl in this entire world. I want to take care of you like my little baby 👶🏻, protect you like my most precious treasure, and love you so purely that you never ever have to doubt it. My only wish is to make you the happiest girl alive 🌸✨.`,
  `On your birthday today, I just want you to know — you are my queen 👑, my soulmate, my cutie pie, my sugar, my nonna, my bacha, my everything 🥰. I feel so lucky that God wrote you in my destiny, because with you I do not just see love, I see a whole lifetime of togetherness. I see us holding hands through every struggle, every joy, every little thing. And even if the world changes, even if people change, what will never change is US ❤️.`,
  `So today, I celebrate not just your birthday but you — the most beautiful person inside and out 💕. Thank you for being mine, for loving me endlessly, for giving me so much warmth, care, and happiness. I promise I will always love you, always protect you, always stay yours — till the very last breath.`,
  `Happy Birthday again, my princess 🎂💝✨. May this year bring you endless happiness, health, and success. But remember — no matter what, you will always have me by your side. Forever and always. I love you more than words, jaan 🥺❤️😘`
];

const typewriterText = document.getElementById("typewriterText");
const speedSlider = document.getElementById("speedSlider");
const showFullTextBtn = document.getElementById("showFullTextBtn");

let typingSpeed = 200 - parseInt(speedSlider.value) + 20;
let paraIndex = 0, charIndex = 0, typingTimeout;

function typeParagraph() {
  if (paraIndex < paragraphs.length) {
    typewriterText.style.opacity = 1;
    if (charIndex < paragraphs[paraIndex].length) {
      typewriterText.innerHTML += paragraphs[paraIndex].charAt(charIndex);
      charIndex++;
      typingTimeout = setTimeout(typeParagraph, typingSpeed);
    } else {
      typewriterText.innerHTML += "<br><br>";
      paraIndex++;
      charIndex = 0;
      typingTimeout = setTimeout(typeParagraph, typingSpeed);
    }
  }
}

speedSlider.addEventListener("input", () => {
  typingSpeed = 200 - parseInt(speedSlider.value) + 20;
});

showFullTextBtn.addEventListener("click", () => {
  clearTimeout(typingTimeout);
  typewriterText.innerHTML = paragraphs.join("<br><br>");
});

typeParagraph();

/*********************
 * PAGE 2 - FALLING HEART EMOJIS
 *********************/
const heartsCanvas = document.getElementById('heartsCanvas');
const ctx2 = heartsCanvas.getContext('2d');
heartsCanvas.width = window.innerWidth;
heartsCanvas.height = window.innerHeight;

// Heart emojis to use
const heartEmojis = ["❤️", "💖", "💕"];

let hearts = [];
const heartCount = 30;

for (let i = 0; i < heartCount; i++) {
  hearts.push({
    x: Math.random() * heartsCanvas.width,
    y: Math.random() * heartsCanvas.height,
    r: Math.random() * 20 + 15, // controls emoji size
    d: Math.random() * heartCount,
    emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    tilt: Math.random() * 10 - 10,
    tiltAngleIncremental: Math.random() * 0.05 + 0.02,
    tiltAngle: 0
  });
}

function drawHearts() {
  ctx2.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  ctx2.textAlign = "center";
  ctx2.textBaseline = "middle";

  hearts.forEach((h, i) => {
    ctx2.font = `${h.r}px sans-serif`;
    ctx2.fillText(h.emoji, h.x, h.y);

    h.tiltAngle += h.tiltAngleIncremental;
    h.y += 0.5 + Math.cos(h.d); // slow falling
    h.x += Math.sin(h.tiltAngle) * 0.5;

    if (h.y > heartsCanvas.height) {
      hearts[i] = {
        x: Math.random() * heartsCanvas.width,
        y: -10,
        r: h.r,
        d: h.d,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: h.tiltAngleIncremental,
        tiltAngle: 0
      };
    }
  });
  requestAnimationFrame(drawHearts);
}

drawHearts();

/*********************
 * WINDOW RESIZE HANDLER
 *********************/
window.addEventListener('resize', () => {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
});

/*********************
 * PAGE 3 - NOTES
 *********************/
const page3 = document.getElementById('page3');
const notesGrid = document.getElementById('notesGrid');
const backBtn3 = document.getElementById('backBtn3');
const nextBtn3 = document.getElementById('nextBtn3');

// Notes Array
const notes = [
  "🌹 You are the most beautiful blessing in my life, my forever jaan. 💕",
  "😘 Tum meri cutie ho meri jaan… tum ho toh meri duniya complete hai 🌍💖",
  "🥰 No one in this world can ever take your place in my heart.",
  "🐒 Meri jiggly puff, meri bandariya, mera chotu sa bacha ho tum… aur sabse special bhi 😍🙈",
  "✨ With you, even ordinary days feel magical and full of love.",
  "🌸 Tum meri life ka sabse pyaara gift ho, jo mujhe har din khush karta hai 💝✨",
  "👩‍❤️‍👨 You’re not just my girlfriend, you are my home, my peace, my everything",
  "😍 Tumhari smile = mera sukoon 🥺💘 ek baar tum hasti ho toh din ban jaata hai 🌞",
  "🎂 On your birthday, I celebrate you — my queen, my soulmate, my world.",
  "👩‍❤️‍👨 Chahe kitni fights ho, tum meri best friend bhi ho aur meri wife bhi 🤭💍",
  "🌙 Even distance cannot dim the love I feel for you every single second",
  "🍫 Tum meri mithai, mera cake, mera sara dessert… sabse sweet cheez ho duniya ki 😘🎂",
  "💖 My only wish is to see you happy, smiling, and shining always",
  "🌹 Tum meri jaan, meri heartbeat, meri princess… aur meri duniya ho🤲💞",
  "🏹 I’ll love you endlessly, through every fight, every laugh, every moment of forever.",
  "💤 Kaash distance na hota… toh main tumhe bacha ki tarah care krke rakhta 🤱❤️"
];

// Render notes dynamically
notes.forEach((note, index) => {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note-card';
  noteDiv.style.animationDelay = `${index * 0.1}s`;
  noteDiv.textContent = note;
  notesGrid.appendChild(noteDiv);
});

// Navigation
nextBtn2.addEventListener('click', () => {
  page2.style.display = 'none';
  page3.style.display = 'flex';
  window.scrollTo(0, 0);
});

backBtn3.addEventListener('click', () => {
  page3.style.display = 'none';
  page2.style.display = 'flex';
});

/*********************
 * PAGE 4 - PHOTO ALBUM
 *********************/
const page4 = document.getElementById('page4');
const backBtn4 = document.getElementById('backBtn4');
const nextBtn4 = document.getElementById('nextBtn4');

// From Page 3 → Page 4
nextBtn3.addEventListener('click', () => {
  page3.style.display = 'none';
  page4.style.display = 'flex';
  window.scrollTo(0, 0);
});

// From Page 4 → Page 5
nextBtn4.addEventListener('click', () => {
  page4.style.display = 'none';
  page5.style.display = 'flex';
  window.scrollTo(0, 0);
});

// Back to Page 3
backBtn4.addEventListener('click', () => {
  page4.style.display = 'none';
  page3.style.display = 'flex';
});

/*********************
 * PAGE 4 - IMAGE EXPAND CENTERED (HOLD + SHRINK ON RELEASE)
 *********************/
const overlay = document.getElementById('overlay');

document.querySelectorAll('.photo-grid img').forEach(img => {
  let holdTimeout;

  function expandImage() {
    img.classList.add('expanded');
    overlay.style.display = 'block';
  }

  function collapseImage() {
    clearTimeout(holdTimeout);
    img.classList.remove('expanded');
    overlay.style.display = 'none';
  }

  // Desktop events
  img.addEventListener('mousedown', () => {
    holdTimeout = setTimeout(expandImage, 150); // hold for 400ms
  });
  img.addEventListener('mouseup', collapseImage);
  img.addEventListener('mouseleave', collapseImage);

  // Mobile touch events
  img.addEventListener('touchstart', () => {
    holdTimeout = setTimeout(expandImage, 150);
  });
  img.addEventListener('touchend', collapseImage);
});

// Page 5 navigation
const page5 = document.getElementById('page5');
const backBtn5 = document.getElementById('backBtn5');
const nextBtn5 = document.getElementById('nextBtn5');

backBtn5.addEventListener('click', () => {
  page5.style.display = 'none';
  document.getElementById('page4').style.display = 'flex';
});

nextBtn5.addEventListener("click", () => {
  page5.style.display = "none";
  page6.style.display = "flex";
  window.scrollTo(0, 0);
  startFinalPage();
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

function revealTimeline() {
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      item.classList.add('show');
    }
  });
}

document.addEventListener('scroll', revealTimeline);

/*********************
 * PAGE 6 - FINAL MESSAGE (Word Fade Effect)
 *********************/
const finalParagraphEl = document.getElementById("finalParagraph");
const closingLineEl = document.getElementById("closingLine");

const finalParagraph =
  "I know the webpage I made for you isn’t perfect — it has flaws here and there… but every single line of it was written with my heart. I spent more than 15 hours, over 1000 lines of code, and countless attempts because I wanted to give you something truly special, something that came straight from me to you. Even in the middle of my exams, I kept working on it because you deserve every bit of my time, my effort, and my love.\n\n" +
  "You told me not to spend money, so I thought — what better gift than creating something with my own hands, something that holds our memories, my feelings, and my dedication? ✨ It may not be polished, but it’s real, and it’s ours.\n\n" +
  "I just hope that when you see it, you don’t just see a webpage, but you feel how much you mean to me. Because this isn’t just some code on a screen — it’s a piece of my heart, my love, my everything for you. 🥺❤️\n\n" +
  "And if it made you smile even for a moment, then every sleepless hour and retry was worth it. You’re my world, my jaan, my only one… and this was my small way of showing it. 💖";

const closingLine = "Crafted with Love by your husband 💕";

// Word-by-word fade-in
function startFinalPage() {
  finalParagraphEl.innerHTML = "";
  closingLineEl.innerHTML = "";
  closingLineEl.style.opacity = 0;
  charIndex6 = 0; // reset closing line typing

  const words = finalParagraph.split(" ");
  words.forEach(word => {
    const span = document.createElement("span");
    span.textContent = word;
    span.classList.add("fade-word");
    finalParagraphEl.appendChild(span);
    finalParagraphEl.appendChild(document.createTextNode(" ")); // keep spacing
  });

  const spans = finalParagraphEl.querySelectorAll(".fade-word");
  spans.forEach((span, i) => {
    setTimeout(() => {
      span.classList.add("fade-in");
      // After last word, show closing line
      if (i === spans.length - 1) {
        setTimeout(typeClosingLine, 1000);
      }
    }, i * 300); // delay between words
  });
}

// Closing line - letter by letter + glow at the end
let charIndex6 = 0;
function typeClosingLine() {
  if (charIndex6 < closingLine.length) {
    closingLineEl.style.opacity = 1;
    closingLineEl.innerHTML += closingLine.charAt(charIndex6);
    charIndex6++;
    setTimeout(typeClosingLine, 120);
  } else {
    // Add glow effect once typing is done
    closingLineEl.classList.add("glimmer");
  }
}

// Back Button
const backBtn6 = document.getElementById("backBtn6");
backBtn6.addEventListener("click", () => {
  page6.style.display = "none";
  page5.style.display = "flex";
});

// Disable right-click / long press menu on album images
document.querySelectorAll('.photo-grid img').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
});

/*********************
 * PAGE 6 - Falling Stars
 *********************/
const starsCanvas = document.getElementById("starsCanvas");
const ctxStars = starsCanvas.getContext("2d");

function resizeStarsCanvas() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
resizeStarsCanvas();
window.addEventListener("resize", resizeStarsCanvas);

let stars = [];
for (let i = 0; i < 50; i++) {
  stars.push({
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height,
    r: Math.random() * 2 + 1,
    d: Math.random() * 40
  });
}

function drawStars() {
  ctxStars.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  ctxStars.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctxStars.beginPath();
  stars.forEach((s, i) => {
    ctxStars.moveTo(s.x, s.y);
    ctxStars.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  });
  ctxStars.fill();
  updateStars();
}

function updateStars() {
  stars.forEach((s, i) => {
    s.y += 0.3;
    if (s.y > starsCanvas.height) {
      s.y = -10;
      s.x = Math.random() * starsCanvas.width;
    }
  });
}

function animateStars() {
  drawStars();
  requestAnimationFrame(animateStars);
}
animateStars();