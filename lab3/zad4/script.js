// getElementById – kontener galerii
const gallery = document.querySelector(".gallery");

// querySelectorAll – wszystkie obrazki
const images = document.querySelectorAll(".gallery img");

// querySelector – selektor CSS
const headerTitle = document.querySelector(".site-header h1");

// closest – poruszanie się w górę drzewa DOM
gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;
});


// Zmiana tytułu galerii
headerTitle.textContent = "Moja strona multimedialna (JS)";

// Hover – klasy CSS
images.forEach(img => {
    img.addEventListener("mouseenter", () => {
        img.classList.add("img-hover");
    });
    img.addEventListener("mouseleave", () => {
        img.classList.remove("img-hover");
    });
});

// Style inline
gallery.computedStyleMap.gap = "20px";

// Atrybuty + data-*
images.forEach((img, index) => {
    img.setAttribute("data-index", index);
    img.dataset.title = img.alt;
});


// Tworzenie lightboxa dynamicznie
const overlay = document.createElement("div");
overlay.classList.add("js-lightbox");
overlay.innerHTML = `
    <button class="lb-close">x</button>
    <button class="lb-prev">◀</button>
    <button class="lb-next">▶</button>
    <img>
    <p class="lb-caption"></p>
    `;
document.body.appendChild(overlay);

const lbImg = overlay.querySelector("img");
const lbCaption = overlay.querySelector(".lb-caption");

let currentIndex = 0;

// Event delegation – jedno nasłuchiwanie
gallery.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (!img) return;

    e.preventDefault(); //blokuje CSS :target
    currentIndex = Number(img.dataset.index);
    openLightbox();
});

function openLightbox() {
    const img = images[currentIndex];
    lbImg.src = img.src.replace("w=400", "w=800");
    lbCaption.textContent = img.dataset.title;
    overlay.classList.add("active");
}

function closeLightbox() {
    overlay.classList.remove("active");
}

//Zamknięcie
overlay.querySelector(".lb-close").addEventListener("click", closeLightbox);

//Klik poza obrazem
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
});

//Nawigacja 
overlay.querySelector(".lb-next").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox();
});
overlay.querySelector(".lb-prev").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox();
});

//Klawiatura
document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") overlay.querySelector(".lb-next").click();
    if (e.key === "ArrowLeft") overlay.querySelector(".lb-prev").click();
});