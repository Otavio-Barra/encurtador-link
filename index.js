const navMenu = document.querySelector("#navMenu");
const nav = document.querySelector("#nav");
navMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  nav.classList.toggle("active-menu");
});
