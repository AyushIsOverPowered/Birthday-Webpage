/*********************
 * PAGE NAVIGATION
 *********************/
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

const nextBtn1 = document.getElementById('nextBtn');
nextBtn1.addEventListener('click', () => {
    page1.style.display = 'none';
    page2.style.display = 'flex';
});

const backBtn = document.getElementById('backBtn');
const nextBtn2 = document.getElementById('nextBtn2');

backBtn.addEventListener('click', () => {
    page2.style.display = 'none';
    page1.style.display = 'flex';
});

nextBtn2.addEventListener('click', () => {
    alert("Next page placeholder");
});

/*********************
 * PAGE 1 - CONFETTI
 *********************/
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx1 = confettiCanvas.getContext('2d');

function resizeConfettiCanvas() {
    confettiCanvas.width = confettiCanvas.offsetWidth;
    confettiCanvas.height = confettiCanvas.offsetHeight;
}
window.addEventListener('resize', resizeConfettiCanvas);
resizeConfettiCanvas();

let confetti = [];
const confettiCount = window.innerWidth < 480 ? 50 : 100;

for (let i = 0; i < confettiCount; i++) {
    confetti.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * confettiCount,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
    });
}

function drawConfetti() {
    ctx1.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
    confetti.forEach((c,i)=>{
        ctx1.beginPath();
        ctx1.lineWidth = c.r/2;
        ctx1.strokeStyle = c.color;
        ctx1.moveTo(c.x + c.tilt + c.r/4, c.y);
        ctx1.lineTo(c.x + c.tilt, c.y + c.tilt + c.r/4);
        ctx1.stroke();

        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 3 + c.r/2)/2;
        c.tilt = Math.sin(c.tiltAngle)*15;

        if(c.y > confettiCanvas.height){
            confetti[i] = {
                x: Math.random()*confettiCanvas.width,
                y: -10,
                r: c.r,
                d: c.d,
                color: c.color,
                tilt: Math.random()*10-10,
                tiltAngleIncremental: c.tiltAngleIncremental,
                tiltAngle: 0
            }
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

const minSpeed = 20;
const maxSpeed = 200;
let typingSpeed = maxSpeed - parseInt(speedSlider.value) + minSpeed;

let paraIndex = 0;
let charIndex = 0;
let typingTimeout;

typewriterText.innerHTML = ""; // Ensure empty at start

function typeParagraph() {
    typewriterText.style.opacity = 1;
    if(paraIndex < paragraphs.length){
        if(charIndex < paragraphs[paraIndex].length){
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

speedSlider.addEventListener("input", ()=>{
    typingSpeed = maxSpeed - parseInt(speedSlider.value) + minSpeed;
});

showFullTextBtn.addEventListener("click", ()=>{
    clearTimeout(typingTimeout);
    typewriterText.innerHTML = paragraphs.join("<br><br>");
});

typeParagraph();

/*********************
 * PAGE 2 - FALLING HEART EMOJIS
 *********************/
const heartsCanvas = document.getElementById('heartsCanvas');
const ctx2 = heartsCanvas.getContext('2d');

function resizeHeartsCanvas() {
    heartsCanvas.width = heartsCanvas.offsetWidth;
    heartsCanvas.height = heartsCanvas.offsetHeight;
}
window.addEventListener('resize', resizeHeartsCanvas);
resizeHeartsCanvas();

const heartEmojis = ["❤️", "💖", "💕"];
let hearts = [];
const heartCount = 50;

for (let i = 0; i < heartCount; i++){
    hearts.push({
        x: Math.random()*heartsCanvas.width,
        y: Math.random()*heartsCanvas.height,
        r: Math.random()*25 + 15,
        emoji: heartEmojis[Math.floor(Math.random()*heartEmojis.length)],
        tilt: Math.random()*10-10,
        tiltAngleIncremental: Math.random()*0.05+0.02,
        tiltAngle:0
    });
}

function drawHearts(){
    ctx2.clearRect(0,0,heartsCanvas.width,heartsCanvas.height);
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";
    hearts.forEach((h,i)=>{
        ctx2.font = `${h.r}px sans-serif`;
        ctx2.fillText(h.emoji,h.x,h.y);

        h.tiltAngle += h.tiltAngleIncremental;
        h.y += 0.5 + Math.cos(h.tiltAngle);
        h.x += Math.sin(h.tiltAngle)*0.5;

        if(h.y > heartsCanvas.height){
            hearts[i] = {
                x: Math.random()*heartsCanvas.width,
                y:-10,
                r:h.r,
                emoji: heartEmojis[Math.floor(Math.random()*heartEmojis.length)],
                tilt: Math.random()*10-10,
                tiltAngleIncremental: h.tiltAngleIncremental,
                tiltAngle:0
            }
        }
    });
    requestAnimationFrame(drawHearts);
}
drawHearts();