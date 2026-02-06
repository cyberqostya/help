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

// Burger
{
  // Open/close
  const btn = document.querySelector(".burger");
  const menu = document.querySelector(".burger-menu");

  let isBurgerActive = false;

  function render() {
    btn.classList[isBurgerActive ? "add" : "remove"]("_active");
    menu.classList[isBurgerActive ? "add" : "remove"]("_active");

    if (isBurgerActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.removeAttribute("style");
    }
  }

  // Open/close burger button
  btn.addEventListener("click", () => {
    isBurgerActive = !isBurgerActive;
    render();
  });

  // Change height while open sublinks
  {
    const menu = document.querySelector(".burger-menu__nav");
    const menuHeight = menu.clientHeight;

    menu.addEventListener("click", (e) => {
      const submenuOpener = e.target.closest(".burger-menu__link._sub"); // clicked to opener submenu
      const submenuCloser = e.target.closest(".burger-menu__sublinks-back"); // clicked to closer submenu
      const linkNeedCloseBurger = e.target.closest("a.burger-menu__link"); // clicked to link need to close burger

      if (linkNeedCloseBurger) {
        isBurgerActive = false;
        render();

        // clicked to sublink
        const sublinks = linkNeedCloseBurger.parentElement;
        if (sublinks.classList.contains("burger-menu__link-sublinks")) {
          sublinks.classList.remove("_active");
        }
      } else if (submenuCloser) {
        submenuCloser.parentElement.classList.remove("_active");
        menu.style.height = menuHeight + "px";
      } else if (submenuOpener) {
        submenuOpener.querySelector("nav").classList.add("_active");
        menu.style.height = submenuOpener.querySelector(".burger-menu__link-sublinks").clientHeight + "px";
      }
    });
  }

  //
  // Change contrast
  document.addEventListener("DOMContentLoaded", () => {
    // on /prijects/project-1 - page always white
    if (window.location.pathname.match(/\/projects\/.+/)) return;

    const sections = document.querySelectorAll("section");

    function isIntersecting(rect1, rect2) {
      return !(rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    }

    function checkIntersection() {
      if (window.innerWidth > 1000) return;

      const burgerRect = btn.getBoundingClientRect();
      let isOverLightSection = false;

      sections.forEach((section) => {
        const sectionRect = section.getBoundingClientRect();

        if (isIntersecting(burgerRect, sectionRect)) {
          // Is there intersection with image
          const bgImage = getComputedStyle(section).backgroundImage;
          if (!bgImage || bgImage == "none") {
            // Is there intersection with dark background
            const bgDark = getComputedStyle(section).backgroundColor;
            if (bgDark.includes("rgba") || bgDark.match(/\d+/g).every((i) => i > 50)) {
              isOverLightSection = true;
            }
          }
        }
      });

      if (isOverLightSection) {
        btn.classList.add("_dark");
      } else {
        btn.classList.remove("_dark");
      }
    }

    window.addEventListener("scroll", checkIntersection);
  });
}
