/* ============================================================
   Tender Tokens Studio — script.js
   gallery generation · prompt shuffle · paper confetti ·
   scroll reveal · gentle hero parallax/cursor-tilt
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ============================================================
     COLLECTION — one tile per real piece
     To add a new piece:
       1. save a large photo as images/token-NN.jpg (about 1600px on the long side)
       2. save a small copy as images/thumbs/token-NN.jpg (about 640px)
       3. add a line to TOKENS below: file name, caption, and a short
          description of the image for screen readers (alt).
     Tiles appear in the order listed. The count in the section title
     updates itself.
     ============================================================ */
  var TOKENS = [
    { file: "token-11.jpg", cap: "till the cows come home", alt: "Watercolor sketchbook spread: striped sky and hills with tiny cows, lettered 'till the cows come home' in red brush script" },
    { file: "token-12.jpg", cap: "nairobi + a kenyan chai", alt: "Marker spread: a portrait with a big blue afro and pink glasses lettered 'Nairobi Kenya', and a glass mug lettered 'Kenyan chai'" },
    { file: "token-13.jpg", cap: "cowrie 101", alt: "Sketchbook spread: labelled drawings of the dorsal and ventral sides of a cowrie shell beside a marker drawing of a baobab and the sea, lettered 'Kinondo Kwetu'" },
    { file: "token-14.jpg", cap: "maybe we can keep in touch", alt: "Pink bubble lettering across a spread: 'maybe we can keep in touch — Timothy, server'" },
    { file: "token-15.jpg", cap: "kenya, taped down", alt: "Collage spread of receipts, shop slips, ads, and KLM boarding passes held down with yellow tape" },
    { file: "token-16.jpg", cap: "every label from the trip", alt: "Collage spread of green Mayers sparkling water labels, laundry slips, an order slip, and rehydration salt packets" },
    { file: "token-17.jpg", cap: "the long way to nairobi", alt: "Collage spread of Lufthansa boarding passes, a restaurant receipt, green packaging scraps, and a Kenya eTA page with an elephant at sunset" },
    { file: "token-18.jpg", cap: "baobab, morning", alt: "Marker drawing of a baobab trunk, thin trees, the sea, and a table and chairs on sand" },
    { file: "token-19.jpg", cap: "get inspired, create away", alt: "Pink hatched spread with teal and red blob shapes and the words 'get inspired, create away'" },
    { file: "token-20.jpg", cap: "blob bouquets", alt: "Two pages of colorful four-petal blob flowers drawn in marker" },
    { file: "token-21.jpg", cap: "hello, hello, hello", alt: "Rows of puffy orange, yellow, and pink marker letters spelling hello" },
    { file: "token-22.jpg", cap: "i ♥ mallorca (and sardines)", alt: "Collage spread of I-heart-Mallorca napkins, a Sa Pedra napkin, sardine-print paper, and black-and-kraft polka-dot paper" },
    { file: "token-23.jpg", cap: "mallorca, by coaster", alt: "Collage spread of hotel and restaurant coasters, Font Major water labels, and a Coca-Cola label from Mallorca" },
    { file: "token-24.jpg", cap: "sóller", alt: "Spread with a bold Sóller tram poster, a Ses Oliveres card, a Valldemossa parking ticket, water labels, and a Mandarina Socks tag" },
    { file: "token-25.jpg", cap: "schlok's, bagels + lox", alt: "Collage of Schlok's napkins with red grid, black fish illustrations, and a bagel-fish logo" },
    { file: "token-26.jpg", cap: "berkeley · sf · oakland", alt: "Collage spread with a green half-circle cityscape, Bay Area city name strips, red grid napkins, and the name Christine lettered on green" },
    { file: "token-27.jpg", cap: "hi! (world cup coasters)", alt: "Spread with red 'hi!' lettering on orange texture beside cut-up World Cup beer coasters" },
    { file: "token-28.jpg", cap: "love is love, plus gems", alt: "Spiral sketchbook collage of rainbow beer-can labels, gemstone stickers, and gold confetti dots" },
    { file: "token-29.jpg", cap: "ranger of the lost art", alt: "A small white tin collaged with vintage park ranger sticker scraps and a printed note about national park window stickers" },
    { file: "token-30.jpg", cap: "the residents, production bible v1.0", alt: "Hand-lettered cover page in lilac and coral: 'The Residents Production Bible v1.0, Develop. Complt. July 19, 2026'" },
    { file: "token-01.jpg", cap: "blue marker mood", alt: "Sketchbook spread of calligraphy practice in blues and purples" },
    { file: "token-02.jpg", cap: "warm marker practice", alt: "Sketchbook spread of calligraphy practice in pinks, oranges, and yellows" },
    { file: "token-03.jpg", cap: "tender tokens, again", alt: "A page of 'tender tokens' lettered over and over in different styles" },
    { file: "token-04.jpg", cap: "sticker evidence", alt: "Mustard sketchbook cover covered in stickers" },
    { file: "token-05.jpg", cap: "tiny wrapper, huge feeling", alt: "Collage spread of pink paper scraps and citrus stickers" },
    { file: "token-06.jpg", cap: "receipt saved", alt: "Collage spread of pink receipts, washi tape, and a flamingo sticker" },
    { file: "token-07.jpg", cap: "palm springs mood", alt: "Bubble letters spelling Palm Springs on a green background" },
    { file: "token-08.jpg", cap: "happy hands", alt: "Bubble lettering 'happy hands' over warm striped marker" },
    { file: "token-09.jpg", cap: "hi, baby!", alt: "Notes and a pink-and-green 'hi, baby!' lettered on a page" },
    { file: "token-10.jpg", cap: "kept because cute", alt: "A page of 'calligraphy' lettered in fading greens" }
  ];

  var countEl = document.getElementById("tokenCount");
  if (countEl) countEl.textContent = TOKENS.length;

  function buildGallery() {
    var gallery = document.getElementById("gallery");
    if (!gallery) return;
    var frag = document.createDocumentFragment();

    TOKENS.forEach(function (t, i) {
      var n = i + 1;
      var rot = (Math.random() * 6 - 3).toFixed(2); // -3..3 deg

      var tile = document.createElement("figure");
      tile.className = "tile";
      tile.style.transform = "rotate(" + rot + "deg)";
      tile.setAttribute("data-base-rot", rot);

      var pin = document.createElement("span");
      pin.className = "pin";
      pin.setAttribute("aria-hidden", "true");

      var num = document.createElement("span");
      num.className = "tile-num";
      num.textContent = "#" + n;

      var photo = document.createElement("button");
      photo.type = "button";
      photo.className = "tile-photo";
      photo.setAttribute("data-index", i);
      photo.setAttribute("aria-label", "Look closer: " + t.cap);

      var img = document.createElement("img");
      img.src = "images/thumbs/" + t.file;
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = t.alt;
      photo.appendChild(img);

      var capEl = document.createElement("figcaption");
      capEl.className = "tile-cap";
      capEl.textContent = t.cap;

      tile.appendChild(pin);
      tile.appendChild(num);
      tile.appendChild(photo);
      tile.appendChild(capEl);
      frag.appendChild(tile);
    });
    gallery.appendChild(frag);

    gallery.addEventListener("click", function (e) {
      var b = e.target.closest(".tile-photo");
      if (b) openLightbox(parseInt(b.getAttribute("data-index"), 10), b);
    });

    // unrotate on hover, restore base rotation on leave
    gallery.addEventListener("mouseover", function (e) {
      var t = e.target.closest(".tile");
      if (t) t.style.transform = "rotate(0deg) translateY(-6px) scale(1.03)";
    });
    gallery.addEventListener("mouseout", function (e) {
      var t = e.target.closest(".tile");
      if (t) t.style.transform = "rotate(" + t.getAttribute("data-base-rot") + "deg)";
    });
  }
  buildGallery();

  /* ============================================================
     LIGHTBOX — tap a page to look closer
     ============================================================ */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbIndex = 0, lbReturnFocus = null;

  function showToken(i) {
    lbIndex = (i + TOKENS.length) % TOKENS.length;
    var t = TOKENS[lbIndex];
    lbImg.src = "images/" + t.file;
    lbImg.alt = t.alt;
    lbCap.textContent = "#" + (lbIndex + 1) + " · " + t.cap;
  }
  function openLightbox(i, from) {
    if (!lb) return;
    lbReturnFocus = from || null;
    showToken(i);
    lb.hidden = false;
    document.body.classList.add("lb-open");
    document.getElementById("lbClose").focus();
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.classList.remove("lb-open");
    lbImg.removeAttribute("src");
    if (lbReturnFocus) lbReturnFocus.focus();
  }
  if (lb) {
    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lbPrev").addEventListener("click", function () { showToken(lbIndex - 1); });
    document.getElementById("lbNext").addEventListener("click", function () { showToken(lbIndex + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showToken(lbIndex - 1);
      else if (e.key === "ArrowRight") showToken(lbIndex + 1);
    });
    // swipe on phones
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) showToken(lbIndex + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ============================================================
     TENDER PROMPT — shuffle
     ============================================================ */
  var PROMPTS = [
    "what did you almost throw away today?",
    "what wrapper deserves a second life?",
    "what tiny thing felt weirdly important?",
    "save one scrap from today and name the feeling.",
    "which receipt tells a secret little story?",
    "what label is too cute to recycle?",
    "what did you keep just because?",
    "what did the trip leave in your pockets?"
  ];
  var promptText = document.getElementById("promptText");
  var shuffleBtn = document.getElementById("shuffleBtn");
  var lastPrompt = 0;
  if (promptText && shuffleBtn) {
    shuffleBtn.addEventListener("click", function () {
      var idx;
      do { idx = Math.floor(Math.random() * PROMPTS.length); }
      while (idx === lastPrompt && PROMPTS.length > 1);
      lastPrompt = idx;

      if (prefersReduced) {
        promptText.textContent = PROMPTS[idx];
        return;
      }
      promptText.classList.add("swap");
      setTimeout(function () {
        promptText.textContent = PROMPTS[idx];
        promptText.classList.remove("swap");
      }, 250);
    });
  }

  /* ============================================================
     PAPER CONFETTI — on CTA click (tiny scraps)
     ============================================================ */
  var CONFETTI_COLORS = ["#C97857", "#D89A7A", "#AAB39A", "#85758C", "#00A9C8", "#FBF8F1"];
  function burstConfetti(x, y) {
    if (prefersReduced) return;
    var count = 18;
    for (var i = 0; i < count; i++) {
      (function (i) {
        var p = document.createElement("span");
        p.className = "confetti-piece";
        var c = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        p.style.background = c;
        if (i % 4 === 0) p.style.borderRadius = "50%";
        p.style.left = x + "px";
        p.style.top = y + "px";
        document.body.appendChild(p);

        var angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
        var dist = 60 + Math.random() * 90;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist - 40; // bias upward
        var rot = (Math.random() * 720 - 360) + "deg";

        p.animate(
          [
            { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
            { transform: "translate(" + dx + "px," + (dy + 140) + "px) rotate(" + rot + ")", opacity: 0 }
          ],
          { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" }
        ).onfinish = function () { p.remove(); };
      })(i);
    }
  }
  document.querySelectorAll(".js-confetti").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var r = btn.getBoundingClientRect();
      burstConfetti(r.left + r.width / 2, r.top + r.height / 2);
      // let the mailto proceed normally
    });
  });

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ============================================================
     HERO — gentle parallax + cursor-follow tilt
     ============================================================ */
  var collage = document.getElementById("collage");
  var spread = document.getElementById("collageSpread");
  if (collage && spread && !prefersReduced) {
    var targetRX = 0, targetRY = 0, curRX = 0, curRY = 0, raf = null;

    function loop() {
      curRX += (targetRX - curRX) * 0.08;
      curRY += (targetRY - curRY) * 0.08;
      spread.style.transform =
        "rotate(2.2deg) perspective(800px) rotateX(" + curRX.toFixed(2) +
        "deg) rotateY(" + curRY.toFixed(2) + "deg)";
      if (Math.abs(targetRX - curRX) > 0.05 || Math.abs(targetRY - curRY) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else { raf = null; }
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }

    collage.addEventListener("mousemove", function (e) {
      var r = collage.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      targetRY = px * 12;
      targetRX = -py * 10;
      kick();
    });
    collage.addEventListener("mouseleave", function () {
      targetRX = 0; targetRY = 0; kick();
    });

    // subtle scroll parallax on floating scraps
    var floats = collage.querySelectorAll(".float");
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y > 700) return;
      floats.forEach(function (f, i) {
        var depth = (i + 1) * 0.04;
        f.style.marginTop = (-y * depth) + "px";
      });
    }, { passive: true });
  }
})();

/* Liquid Metal reel: hold still for people who prefer reduced motion */
(function () {
  var v = document.getElementById("liquidMetal");
  if (!v) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    v.removeAttribute("autoplay");
    v.pause();
    v.controls = true;
  }
})();
