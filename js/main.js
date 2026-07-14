/* ============================================================
   DAR NAJI — Expérience
   GSAP + ScrollTrigger + Lenis
   ============================================================ */

/* ------------------ CONFIGURATION ------------------
   ⚠️ À personnaliser : numéro WhatsApp au format
   international, sans "+" ni espaces (ex: "212612345678") */
const DARNAJI_CONFIG = {
  whatsappNumber: "212600000000",
  restaurantName: "Dar Naji"
};
/* ---------------------------------------------------- */

gsap.registerPlugin(ScrollTrigger);

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const dh = n => `${n} <small>Dh</small>`;

function waLink(msg) {
  return `https://wa.me/${DARNAJI_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/* ---------- Lenis ---------- */
const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

/* ---------- Loader ---------- */
function runLoader() {
  const tl = gsap.timeline();
  tl.to(".loader-ar", { opacity: 1, y: 0, duration: .8, ease: "power3.out" })
    .to($$(".loader-word span"), { opacity: 1, y: 0, duration: .9, stagger: .07, ease: "power3.out" }, "-=.3")
    .to(".loader-line", { width: 220, duration: .8, ease: "power2.inOut" }, "-=.4")
    .to(".loader-sub", { opacity: 1, duration: .6 }, "-=.5")
    .to("#loader", {
      opacity: 0, duration: .8, delay: .45, ease: "power2.inOut",
      onComplete: () => $("#loader").classList.add("done")
    });
}

/* ---------- Curseur ---------- */
(function cursor() {
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  if (!dot || matchMedia("(hover: none)").matches) return;
  let rx = innerWidth / 2, ry = innerHeight / 2;
  addEventListener("mousemove", e => {
    document.body.classList.add("has-mouse");
    gsap.set(dot, { x: e.clientX, y: e.clientY });
    rx = e.clientX; ry = e.clientY;
  });
  gsap.ticker.add(() => {
    const x = gsap.getProperty(ring, "x"), y = gsap.getProperty(ring, "y");
    gsap.set(ring, { x: x + (rx - x) * .14, y: y + (ry - y) * .14 });
  });
  const hoverables = "a, button, .dish-card, .carte-item";
  document.addEventListener("mouseover", e => {
    if (e.target.closest(hoverables)) ring.classList.add("is-active");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest(hoverables)) ring.classList.remove("is-active");
  });
})();

/* ---------- Héro : lecture au défilement ---------- */
(function heroScrub() {
  const canvas = $("#hero-canvas");
  const ctx = canvas.getContext("2d");
  const FRAME_COUNT = 120;
  const framePath = i => `assets/frames/frame_${String(i + 1).padStart(3, "0")}.jpg`;
  const images = new Array(FRAME_COUNT);
  const state = { frame: 0 };

  function sizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
  }
  sizeCanvas();
  addEventListener("resize", () => { sizeCanvas(); render(); });

  function render() {
    const img = images[Math.round(state.frame)] || images.find(Boolean);
    if (!img || !img.complete || !img.naturalWidth) return;
    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  const first = new Image();
  first.src = framePath(0);
  first.onload = () => { images[0] = first; render(); };
  let loaded = 0;
  for (let i = 1; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.src = framePath(i);
    img.onload = () => { images[i] = img; if (++loaded === FRAME_COUNT - 1) render(); };
  }

  gsap.to(state, {
    frame: FRAME_COUNT - 1,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: .6 },
    onUpdate: render
  });

  gsap.to(".hero-titles", {
    opacity: 0, y: -60, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "26% bottom", scrub: true }
  });
  gsap.to(".hero-scroll-cue", {
    opacity: 0, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "+=500", scrub: true }
  });

  gsap.to(".hero-dark", {
    opacity: 1, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "80% bottom", end: "bottom bottom", scrub: true }
  });
  gsap.fromTo(".hero-reveal",
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "85% bottom", end: "97% bottom", scrub: true }
    });

  gsap.from(".hero-ar, .hero-kicker, .hero-name, .hero-tag", {
    opacity: 0, y: 34, duration: 1.4, stagger: .15, delay: 2.1, ease: "power3.out"
  });
})();

/* ---------- Navigation ---------- */
ScrollTrigger.create({
  start: "top -80",
  onUpdate: self => $(".nav").classList.toggle("is-solid", self.scroll() > innerHeight * .8)
});
$$('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
  const target = $(a.getAttribute("href"));
  if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -60 }); }
}));

/* ---------- Bandeau ---------- */
(function marquee() {
  const track = $(".marquee-track");
  if (!track) return;
  track.innerHTML += track.innerHTML;
  gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
})();

/* ---------- Rendu : signatures ---------- */
$("#carousel-track").innerHTML = SIGNATURES.map(d => `
  <article class="dish-card" data-id="${d.id}">
    <div class="dish-art">${dishArtwork(d)}</div>
    <h3 class="dish-name">${d.name}</h3>
    <p class="dish-tagline">${d.tagline}</p>
    <p class="dish-price">${dh(d.price)}${d.unit ? ` <small>· ${d.unit}</small>` : ""}</p>
    <span class="dish-cta">Découvrir</span>
  </article>`).join("");

/* ---------- Rendu : la carte ---------- */
$("#carte-grid").innerHTML = MENU.map(cat => `
  <div class="carte-cat reveal">
    <h3>${cat.categorie}</h3>
    ${cat.plats.map(p => `
      <div class="carte-item">
        <span class="nom">${p.nom}</span>
        <span class="pts"></span>
        <span class="prix">${dh(p.prix)}</span>
      </div>
      ${p.detail ? `<p class="carte-detail">${p.detail}</p>` : ""}
    `).join("")}
  </div>`).join("");

/* ---------- Carrousel glissable ---------- */
(function carousel() {
  const track = $("#carousel-track");
  let offset = 0, startX = 0, startOffset = 0, dragging = false, moved = 0;

  const maxOffset = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
  const setX = (v, anim = true) => {
    offset = Math.max(Math.min(v, 0), -maxOffset());
    gsap.to(track, { x: offset, duration: anim ? .7 : .05, ease: "power3.out" });
  };
  const step = () => {
    const card = track.querySelector(".dish-card");
    return card ? card.offsetWidth + parseFloat(getComputedStyle(track).gap) : 350;
  };

  $("#car-prev").addEventListener("click", () => setX(offset + step() * 1.5));
  $("#car-next").addEventListener("click", () => setX(offset - step() * 1.5));

  track.addEventListener("pointerdown", e => {
    dragging = true; moved = 0;
    startX = e.clientX; startOffset = offset;
    track.classList.add("dragging");
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener("pointermove", e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    setX(startOffset + dx, false);
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("dragging");
    setX(Math.round(offset / step()) * step());
  };
  track.addEventListener("pointerup", end);
  track.addEventListener("pointercancel", end);

  track.addEventListener("click", e => {
    if (moved > 8) return;
    const card = e.target.closest(".dish-card");
    if (card) openDish(card.dataset.id);
  });
  addEventListener("resize", () => setX(offset));
})();

/* ---------- Fiche plat ---------- */
const overlay = $("#dish-overlay");
let currentDish = null;

function openDish(id) {
  const d = SIGNATURES.find(x => x.id === id);
  if (!d) return;
  currentDish = d;
  $("#ovl-art").innerHTML = `<div class="arch"></div>` + dishArtwork(d);
  $("#ovl-cat").textContent = "Plat signature";
  $("#ovl-name").textContent = d.name;
  $("#ovl-tagline").textContent = d.tagline;
  $("#ovl-desc").textContent = d.description;
  $("#ovl-saveurs").innerHTML = `
    <h4>Palette de saveurs</h4>
    ${Object.entries(d.saveurs).map(([tier, items]) => `
      <div class="saveur-tier">
        <span class="tier">${tier}</span>
        <span class="chips">${items.map(n => `<span class="chip">${n}</span>`).join("")}</span>
      </div>`).join("")}`;
  $("#ovl-price").innerHTML = `${dh(d.price)}${d.unit ? ` <small>· ${d.unit}</small>` : ""}`;
  overlay.classList.add("open");
  lenis.stop();
  gsap.fromTo("#ovl-art svg, #ovl-art img",
    { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: .18 });
  gsap.fromTo(".ovl-cat, .ovl-name, .ovl-tagline, .ovl-desc, .palette, .ovl-buy",
    { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .07, ease: "power3.out", delay: .22 });
  gsap.fromTo("#ovl-saveurs .chip",
    { scale: .6, opacity: 0 }, { scale: 1, opacity: 1, duration: .5, stagger: .03, ease: "back.out(2)", delay: .55 });
}
function closeDish() {
  overlay.classList.remove("open");
  lenis.start();
}
$(".overlay-close").addEventListener("click", closeDish);
$(".overlay-backdrop").addEventListener("click", closeDish);
addEventListener("keydown", e => { if (e.key === "Escape") closeDish(); });

$("#ovl-wa").addEventListener("click", () => {
  if (!currentDish) return;
  const msg = `Salam Dar Naji ✨\nJe souhaite réserver / commander : ${currentDish.name} (${currentDish.price} Dh).`;
  open(waLink(msg), "_blank");
});

/* ---------- WhatsApp global ---------- */
const genericMsg = "Salam Dar Naji ✨ Je souhaite réserver une table.";
$$(".js-wa").forEach(el => {
  el.setAttribute("href", waLink(genericMsg));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

/* ---------- Révélations ---------- */
$$(".reveal").forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 88%" }
  });
});
gsap.utils.toArray(".dish-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0, y: 60, duration: 1, delay: (i % 4) * .08, ease: "power3.out",
    scrollTrigger: { trigger: ".signatures", start: "top 70%" }
  });
});

/* ---------- Boutons magnétiques ---------- */
$$(".btn-gold, .btn-wa-big, .carousel-arrow, .nav-wa").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const r = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * .18, y: (e.clientY - r.top - r.height / 2) * .18, duration: .4 });
  });
  btn.addEventListener("mouseleave", () => gsap.to(btn, { x: 0, y: 0, duration: .5, ease: "elastic.out(1, .5)" }));
});

/* ---------- Init ---------- */
$("#footer-year").textContent = new Date().getFullYear();
runLoader();
