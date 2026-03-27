// =======================
// SLIDES DATA
// =======================
const slides = [
    "i made something random\njust because i felt like it",
    "you’re actually pretty interesting\n(not in a weird way 😅)",
    "your art has personality,\nthat’s rare",
    "psych students like u are scary tho\nlike… you can read people damn 😭",
    "but also kinda cool\nbecause you understand people deeper",
    "this isn’t anything serious,\njust appreciation",
    "lowkey hoping this made you smile a bit??"
];

let current = 0;
let typingSpeed = 35;
let isTyping = false;
let musicStarted = false;

// Cache elements
const slideCard = document.getElementById("slideCard");
const slideText = document.getElementById("slideText");
const questionCard = document.getElementById("questionCard");
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const revealScreen = document.getElementById("revealScreen");
const bgMusic = document.getElementById("bgMusic");

// =======================
// TYPEWRITER EFFECT
// =======================
function typeText(text, i = 0) {
    if (i === 0) {
        isTyping = true;
        slideText.innerHTML = "";
    }

    if (i < text.length && isTyping) {
        slideText.innerHTML += text.charAt(i);
        setTimeout(() => typeText(text, i + 1), typingSpeed);
    } else if (i >= text.length) {
        isTyping = false;
    }
}

// =======================
// INITIAL LOAD
// =======================
window.onload = () => {
    typeText(slides[0]);
};

// =======================
// CARD CLICK HANDLER
// =======================
if (slideCard) {
    slideCard.addEventListener("click", () => {
        // Start music on first interaction
        if (!musicStarted && bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => console.log("Music blocked by browser:", e));
            musicStarted = true;
        }

        // Finish typing current slide if clicked while typing
        if (isTyping) {
            isTyping = false;
            slideText.innerHTML = slides[current];
            return; 
        }

        current++;

        if (current >= slides.length) {
            slideCard.classList.add("hidden"); 
            questionCard.classList.remove("hidden");
            return;
        }

        typeText(slides[current]);
    });
}

// =======================
// NO BUTTON BEHAVIOR
// =======================
let noSize = 1;

function moveNo() {
    const x = Math.random() * 150 - 75;
    const y = Math.random() * 150 - 75;

    // FIXED: Added backticks below
    noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noSize})`;
    noSize -= 0.1;

    if (noSize <= 0.4) {
        noBtn.innerText = "okay fine 😅";
        noBtn.style.transform = `translate(0px, 0px) scale(1)`; 
        noBtn.onclick = showReveal; 
        noBtn.removeEventListener("mouseover", moveNo);
        noBtn.removeEventListener("touchstart", moveNo);
    }
}

if (noBtn) {
    noBtn.addEventListener("mouseover", moveNo);
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        moveNo();
    });
}

// =======================
// FINAL REVEAL
// =======================
if (yesBtn) {
    yesBtn.addEventListener("click", showReveal);
}

function showReveal() {
    if (!revealScreen) return;
    revealScreen.classList.remove("hidden");
    setTimeout(() => {
        revealScreen.classList.add("show");
    }, 10);

    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(() => {});
    }
}