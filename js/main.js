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
  const hoverables = "a, button, .carte-item";
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
