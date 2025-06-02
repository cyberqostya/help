document.addEventListener("DOMContentLoaded", () => {
  const cookieLink = "/zhashita.html";
  const cookieName = "cookieAgreement";

  function createCookie(name, value, days = 1) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  function findCookie(name) {
    return document.cookie.split("; ").find((cookie) => cookie.startsWith(name));
  }

  const createNode = () => {
    return `
      <div class="cookiemik">
        <p class="cookiemik__text">На сайте осуществляется обработка пользовательских данных с использованием Cookie в соответствии с <a href="${cookieLink}">Условиями обработки пользовательских данных</a>. Вы можете запретить сохранение Cookie в настройках своего браузера.</p>
        <button class="cookiemik__button">Хорошо</button>
      </div>

      <style>
        .cookiemik {
          position: fixed;
          display: block;
          max-width: 636px;
          left: 24px;
          bottom: 24px;
          padding: 16px 24px;
          background: #fff;
          box-shadow: rgba(7, 17, 46, 0.15) 0px 4px 20px 0px, rgba(13, 18, 34, 0.15) 0px 0px 10px 0px;
          z-index: 10000000000;
          border-radius: 8px;
          box-sizing: border-box;

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px 24px;

          opacity: 0;
          animation: show .4s 2s;
          animation-fill-mode: forwards;
        }
        @keyframes show {
          to { opacity: 1 }
        }

        .cookiemik__text {
          font-size: 18px;
          margin: 0;
          line-height: 1.2;
	        color: #000;
        }

        .cookiemik__button {
          padding: 12px 24px;
          font-weight: 400;
          font-size: 18px;
          letter-spacing: -0.4px;
          border-radius: 8px;
          border: none;
          cursor: pointer;

          color: #2f3441;
          background: #e9ecef;
        }

        @media (width < 1024px) {
          .cookiemik {
            flex-direction: column;
            left: 8px;
            bottom: 8px;
            width: calc(100% - 16px);
            max-width: none;
          }
          .cookiemik__button, .cookiemik__text {
            font-size: 14px;
            width: 100%;
          }
        }
      </style>
    `;
  };

  // Работа
  if (findCookie(cookieName)) return;

  const cookieString = createNode();
  document.body.insertAdjacentHTML("beforeend", cookieString);

  const cookieNode = document.querySelector(".cookiemik");
  const button = cookieNode.querySelector(".cookiemik__button");

  button.addEventListener("click", () => {
    createCookie(cookieName, true, 365);
    cookieNode.style.display = "none";
  });
});
