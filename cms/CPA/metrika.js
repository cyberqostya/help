window.addEventListener("load", () => {
  const counter = window.Ya.Metrika2.counters()[0].id;

  function goym(name) {
    ym(counter, "reachGoal", name);
    console.log("Выполнилась цель " + name);
  }

  // На телефоны
  document.querySelectorAll("a[href*=tel]").forEach((i) => {
    i.addEventListener("click", () => {
      goym("goal_phone_success");
    });
  });

  // На кнопки с нужным названием
  const oneClickBuy = [...document.querySelectorAll("span.btn.one_click")].filter((i) => i.innerHTML.toLowerCase().includes("купить в 1 клик"));
  if (oneClickBuy.length)
    oneClickBuy.forEach((i) =>
      i.addEventListener("click", () => {
        goym("goal_1click_success");
      })
    );

  // На формы при успешном сабмите
  document.querySelectorAll("form").forEach((i) => {
    const btn = i.querySelector("button");
    if (btn) {
      btn.addEventListener("click", (e) => {
        if (i.checkValidity()) goym("SEND_FORM");
      });
    }
  });
});
