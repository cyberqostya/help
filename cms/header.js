// Header scroll hide
{
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".header");
  let timeout;

  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 1000) return;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }

      lastScrollY = currentScrollY;
    }, 20);
  });
}
