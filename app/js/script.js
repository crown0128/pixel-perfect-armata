const navButton = document.querySelector(".header__button");
const upButton = document.querySelector(".page-footer__button");
const downButton = document.querySelector(".page-header__arrow");
const nav = document.querySelector(".header__navigation");
const evaluationSection = document.querySelector(".evaluation");
const pageHeader = document.querySelector(".page-header");

navButton.addEventListener("click", ({ target }) => {
  target.classList.toggle("header__button--open");
  nav.classList.toggle("header__navigation--open");
});

upButton.addEventListener("click", () => pageHeader.scrollIntoView());
downButton.addEventListener("click", () => evaluationSection.scrollIntoView());
