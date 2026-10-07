 const slides =
document.querySelectorAll(".slide");

const currentSlide =
document.getElementById("currentSlide");

const totalSlides =
document.getElementById("totalSlides");

const progressBar =
document.getElementById("progressBar");

let index = 0;

let isAnimating = false;

let autoSlide;

/* =========================
TOTAL SLIDES
========================= */

totalSlides.textContent =
String(slides.length).padStart(2, "0");

/* =========================
LETTER ANIMATION
========================= */

slides.forEach(slide => {

const title =
    slide.querySelector(".animated-title");

const text =
    title.textContent.trim();

title.innerHTML = "";

[...text].forEach((char, i) => {

    const span =
        document.createElement("span");

    span.classList.add("letter");

    span.textContent =
        char === " "
            ? "\u00A0"
            : char;

    span.style.animationDelay =
        `${i * 0.055 + 0.2}s`;

    title.appendChild(span);

});

});

/* =========================
SHOW SLIDE
========================= */

function showSlide(newIndex) {

if (isAnimating) return;

isAnimating = true;


const oldSlide =
    slides[index];


index = newIndex;


if (index >= slides.length) {

    index = 0;

}


if (index < 0) {

    index =
        slides.length - 1;

}


const newSlide =
    slides[index];


oldSlide.classList.remove("active");

oldSlide.classList.add("previous");


setTimeout(() => {

    oldSlide.classList.remove("previous");

    newSlide.classList.add("active");

}, 50);


currentSlide.textContent =
    String(index + 1).padStart(2, "0");


progressBar.style.height =
    `${((index + 1) / slides.length) * 100}%`;


setTimeout(() => {

    isAnimating = false;

}, 1000);

}

/* =========================
NEXT
========================= */

function nextSlide() {

showSlide(index + 1);

resetAutoSlide();

}

/* =========================
PREVIOUS
========================= */

function previousSlide() {

showSlide(index - 1);

resetAutoSlide();

}

/* =========================
AUTO SLIDE
========================= */

function startAutoSlide() {

autoSlide =
    setInterval(() => {

        showSlide(index + 1);

    }, 6000);

}

function resetAutoSlide() {

clearInterval(autoSlide);

startAutoSlide();

}

/* =========================
MOUSE WHEEL
========================= */

window.addEventListener(
"wheel",
function(event) {

    if (event.deltaY > 0) {

        nextSlide();

    } else {

        previousSlide();

    }

},
{ passive: true }

);

/* =========================
KEYBOARD
========================= */

document.addEventListener(
"keydown",
function(event) {

    if (event.key === "ArrowDown") {

        nextSlide();

    }

    if (event.key === "ArrowUp") {

        previousSlide();

    }

}

);

/* =========================
TOUCH / SWIPE
========================= */

let touchStart = 0;

let touchEnd = 0;

window.addEventListener(
"touchstart",
function(event) {

    touchStart =
        event.changedTouches[0].screenY;

}

);

window.addEventListener(
"touchend",
function(event) {

    touchEnd =
        event.changedTouches[0].screenY;

    handleSwipe();

}

);

function handleSwipe() {

const distance =
    touchStart - touchEnd;


if (Math.abs(distance) < 50)
    return;


if (distance > 0) {

    nextSlide();

} else {

    previousSlide();

}

}

/* =========================
CONTACT
========================= */

function contact() {

window.location.href =
    "tel:+916206149916";

}

/* =========================
START
========================= */

startAutoSlide();
