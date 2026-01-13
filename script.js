/* =========================
   GALLERY CAROUSEL
========================= */

const track = document.querySelector(".carousel-track");
const images = track ? Array.from(track.children) : [];

let index = 0;
let startX = 0;
let isDragging = false;
let slideInterval;

/* Auto slide (adjust speed here ⬇️) */
function startAutoSlide() {
    slideInterval = setInterval(moveToNext, 3500); // 3.5 seconds per slide
}

function moveToNext() {
    if (!images.length) return;
    index++;
    if (index >= images.length) {
        index = 0;
    }
    updateSlide();
}

function moveToPrev() {
    if (!images.length) return;
    index--;
    if (index < 0) {
        index = images.length - 1;
    }
    updateSlide();
}

function updateSlide() {
    const slideWidth = images[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

/* TOUCH SWIPE SUPPORT */
if (track) {
    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(slideInterval);
    });

    track.addEventListener("touchend", e => {
        if (!isDragging) return;

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (diff > 50) moveToNext();
        if (diff < -50) moveToPrev();

        isDragging = false;
        startAutoSlide();
    });

    /* PAUSE ON HOVER (desktop) */
    track.addEventListener("mouseenter", () => clearInterval(slideInterval));
    track.addEventListener("mouseleave", startAutoSlide);
}

/* Start carousel */
startAutoSlide();

/* =========================
   MOBILE NAV (HAMBURGER)
========================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    /* Close menu when a link is clicked */
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}
