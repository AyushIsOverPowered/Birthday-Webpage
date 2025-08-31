// Next Button
document.getElementById('nextBtn').addEventListener('click', () => {
    alert("Page 2 coming soon!"); // Placeholder for navigation
});

// Confetti Animation
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
const confettiCount = 100;

for (let i = 0; i < confettiCount; i++) {
    confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * confettiCount,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c, i) => {
        ctx.beginPath();
        ctx.lineWidth = c.r / 2;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
        ctx.stroke();

        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
        c.tilt = Math.sin(c.tiltAngle) * 15;

        if (c.y > canvas.height) {
            confetti[i] = {
                x: Math.random() * canvas.width,
                y: -10,
                r: c.r,
                d: c.d,
                color: c.color,
                tilt: Math.random() * 10 - 10,
                tiltAngleIncremental: c.tiltAngleIncremental,
                tiltAngle: 0
            };
        }
    });
    requestAnimationFrame(drawConfetti);
}

drawConfetti();

// Resize Canvas on Window Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
