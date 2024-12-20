const header = document.querySelector("header");
const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const next_btn = document.querySelector(".next-btn");
const prev_btn = document.querySelector(".prev-btn");

/* --------------- Grab elements from DOM --------------- */

/* --------------- Sticky Navbar --------------- */

/* --------------- Reveal Animation --------------- */
let sr = ScrollReveal();

sr.reveal(".showcase-info", { delay: 300, distance: "60px", duration: 1500 });
sr.reveal(".showcase-image", {
  origin: "top",
  delay: 400,
  distance: "60px",
  duration: 1500,
});

sr.reveal(".about-info", { origin: "top", delay: 200, distance: "60px" });
sr.reveal(".text-grid", { origin: "top", delay: 500, distance: "20px" });
sr.reveal(".about-grid", { origin: "bottom", delay: 700, distance: "30px" });
sr.reveal(".portfolio-title", {
  origin: "bottom",
  delay: 300,
  distance: "30px",
});
sr.reveal(".filter-btns", { origin: "bottom", delay: 300, distance: "30px" });
sr.reveal(".portfolio-gallery", {
  origin: "bottom",
  delay: 600,
  distance: "300px",
});

document.addEventListener("DOMContentLoaded", () => {
  var reg = document.getElementById("typed-element");

  var typewriter = new Typewriter(reg, {
    loop: true,
    delay: 50,
    deleteSpeed: 30,
  });

  typewriter
    .pauseFor(1500)
    .typeString(
      "Building the <strong>future</strong>, one line of <strong>code</strong> at a time."
    )
    .pauseFor(1500)
    .deleteAll()
    .typeString(
      "Innovating with <strong>purpose</strong>, developing with <strong>passion</strong>."
    )
    .pauseFor(1500)
    .deleteAll()
    .typeString(
      "Turning <strong>visions</strong> into <strong>reality</strong> through <strong>clean code</strong>."
    )
    .pauseFor(1500)
    .deleteAll()
    .start();
  const toggle = document.getElementById("nav-toggle"),
    nav = document.getElementById("nav-menu"),
    logo = document.getElementById("principal-logo");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show-menu");
    console.log("scroll: ", window.scrollY);
    header.classList.toggle("ch-bg-header");

    toggle.classList.toggle("show-icon");
  });

  const handleOutsideModal = (event) => {
    console.log("class: ", event.target.className);
    console.log("innerwidth: ", window.innerWidth);
    if (window.innerWidth < 1071) {
      if (
        event.target.className == "nav-menu show-menu" ||
        event.target.className == "nav-link"
      ) {
        nav.classList.toggle("show-menu");
        toggle.classList.toggle("show-icon");
        header.classList.toggle("ch-bg-header");
      }
    }
  };
  nav.addEventListener("click", handleOutsideModal);

  function stickyNavbar() {
    header.classList.toggle("scrolled", window.scrollY > 0);
    const icon1 = toggle.getElementsByClassName("common-icon")[0];
    const icon2 = toggle.getElementsByClassName("common-icon")[1];
    icon1.classList.toggle("change-color-icon", window.scrollY > 0);
    icon2.classList.toggle("change-color-icon", window.scrollY > 0);
    logo.classList.toggle("change-color-icon", window.scrollY > 0);
  }
  window.addEventListener("scroll", stickyNavbar);
});

/* --------------- Skills Progress Bar Animation --------------- */

/* --------------- Services Counter Animation --------------- */

/* --------------- Portfolio Filter Animation --------------- */
let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

/* --------------- Modal Pop Up Animation Animation --------------- */
let currentIndex = 0;

zoom_icons.forEach((ic, i) => {
  ic.addEventListener("click", () => {
    prt_section.classList.add("open-modal");
    document.body.classList.add("stop-scrolling");
    currentIndex = i;
    console.log(`images: ${images}, and the index of image its: ${i}`);
    changeImage(currentIndex);
  });
});

modal_overlay.addEventListener("click", (event) => {
  console.log("Target overlay: ", event.target.className);
  if (
    event.target.className === "modal-overlay" ||
    event.target.className === "slider-wrap"
  ) {
    prt_section.classList.remove("open-modal");
    document.body.classList.remove("stop-scrolling");
  }
});

prev_btn.addEventListener("click", () => {
  console.log("currentIndex prev: ", currentIndex);
  if (currentIndex === 0) {
    currentIndex = 1;
  } else {
    currentIndex--;
  }
  changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
  console.log("currentIndex next: ", currentIndex);
  if (currentIndex === 2) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentIndex);
});

function changeImage(index) {
  console.log("te current index real: ", index);
  images.forEach((img) => img.classList.remove("show-image"));
  console.log(images[index]);
  images[index].classList.add("show-image");
}
