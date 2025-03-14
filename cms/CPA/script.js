(() => {
  // ИНТЕГРАЦИЯ СО СПА СЕТКАМИ

  // Вспомогательные функции
  function mik(...messages) {
    const styles = "background: #3F51B5; color: #FFF; padding: 5px 8px; font-size: 11px; border-radius: 4px; line-height: 1.5";
    const formatted = messages.map((message) => (typeof message === "object" ? JSON.stringify(message) : String(message))).join(" ");
    console.debug("%c" + formatted, styles);
  }
  function createCookie(name, value, days = 1) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";

    mik("Создалась CPA кука - " + `${name}=${value}`);
  }
  function findCookie(name) {
    return document.cookie.split("; ").find((cookie) => cookie.startsWith(name));
  }

  // Узнаем с какого CPA к нам зашли
  const urlParams = new URLSearchParams(window.location.search);
  const utm_source = urlParams.get("utm_source");

  let cpabody = () => {}; // Замыкание для передачи phoneInput из другой области видимости

  const createCpabody = {
    cpaex: (click_id) => {
      cpabody = (phoneInput) => ({
        params: {
          click_id,
          goal_id: 5615,
          track_id: phoneInput.value.replace(/\D/g, ""),
        },
        url: "https://go.cpaex.ru/track/goal-by-click-id?",
      });
    },

    gdeslon: (token) => {
      cpabody = (phoneInput) => ({
        params: {
          order_id: phoneInput.value.replace(/\D/g, ""),
          token,
          order_total: "1",
        },
        url: "https://gdeslon.ru/api/v1/postbacks/?",
      });
    },
  };

  switch (utm_source) {
    // CPA Exchange
    case "cpaex":
      createCookie("last_source", utm_source);
      createCookie("last_source_cpadata", urlParams.get("click_id"));

      createCpabody[utm_source](urlParams.get("click_id"));
      break;

    // CPA gdeslon
    case "gdeslon":
      createCookie("last_source", utm_source);
      createCookie("last_source_cpadata", urlParams.get("utm_content"));

      createCpabody[utm_source](urlParams.get("utm_content"));
      break;

    case null:
      const cookie = findCookie("last_source");
      if (!cookie) return;

      // Работа по Last Cookie Wins
      mik(`Переход по НЕпартнерской ссылке, но до этого был переход с ${cookie}`);
      createCpabody[cookie.split("=")[1]](findCookie("last_source_cpadata").split("=")[1]);
      break;
  }

  // Отправка постбека
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (event) {
      if (!event.target.checkValidity()) return;

      const phoneInput = this.querySelector('input[type="tel"]') || this.querySelector("input");

      mik(`submit произошел | ${findCookie("last_source").split("=")[1]} | phone - ${phoneInput.value}`);

      fetch(`./cpasender.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cpabody(phoneInput)),
      })
        .then((response) => response.json())
        .then((result) => {
          mik("Ответ от сервера: ", result);
        })
        .catch((error) => console.error("Вот такая ошибка в catch:", error));
    });
  });
})();
