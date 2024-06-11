/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", {
  interval: 200,
});
sr.reveal(".skills__data, .work__img, .contact__input", {
  interval: 200,
});

/*SCROLL SKILLS*/
sr.reveal(".skills__subtitle", {});
sr.reveal(".skills__text", {});
sr.reveal(".skills__data", {
  interval: 200,
});
sr.reveal(".skills__img", {
  delay: 600,
});

// Lazy load images
document.addEventListener("DOMContentLoaded", function () {
  const lazyImages = document.querySelectorAll("img.lazy");
  const lazyImageObserver = new IntersectionObserver(function (
    entries,
    observer
  ) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImageObserver.unobserve(lazyImage);
      }
    });
  });

  lazyImages.forEach(function (lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
});

// Asynchronously load non-critical scripts
function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = callback;
  document.head.appendChild(script);
}

// Example: Load Google Analytics script asynchronously
loadScript(
  "https://www.googletagmanager.com/gtag/js?id=G-3MLPC8S1ZV",
  function () {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "G-3MLPC8S1ZV");
  }
);

// Asynchronously load Google Tag Manager script
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-NJCR78XS");

// Asynchronously load Hotjar Analytics script
(function (h, o, t, j, a, r) {
  h.hj =
    h.hj ||
    function () {
      (h.hj.q = h.hj.q || []).push(arguments);
    };
  h._hjSettings = {
    hjid: 4988883,
    hjsv: 6,
  };
  a = o.getElementsByTagName("head")[0];
  r = o.createElement("script");
  r.async = 1;
  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
  a.appendChild(r);
})(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

// Plyr Player
// Change "{}" to your options:
// https://github.com/sampotts/plyr/#options
const player = new Plyr("#player", {});

// Expose player so it can be used from the console
window.player = player;

// Registering a Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  });
}

const wildanakpn = "my-site-cache-v1";
const urlsToCache = ["/", "/styles/main.css", "/script/main.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(wildanakpn).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Linkedin Tag Manager

(function () {
  // Create a script element
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";

  // Insert the script tag into the document
  var firstScript = document.getElementsByTagName("script")[0];
  firstScript.parentNode.insertBefore(script, firstScript);

  // Add the LinkedIn Insight tag script
  var _linkedin_partner_id = "6238212";
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(_linkedin_partner_id);
})();



/*==================== Vercel Storage ====================*/
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/welcome' };

export async function middleware() {
  const greeting = await get('greeting');
  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js
  return NextResponse.json(greeting);
}
/*==================== Vercel Storage ====================*/
