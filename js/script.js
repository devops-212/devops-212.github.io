document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");

  const links = document.querySelectorAll("a.nav-btn");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      document.body.classList.remove("fade-in");
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  });
});

function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");
}