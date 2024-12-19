const toggle = document.getElementById("nav-toggle"),
  nav = document.getElementById("nav-menu"),
  header = document.querySelector("header");

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
