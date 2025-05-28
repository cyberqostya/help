| Оглавление                                     |
| ---------------------------------------------- |
| [Цели](#a5)                                    |
| [Подключение к СПА сеткам](./CPA/)             |
| [Инфоблок для дат акций](#a4)                  |
| [Подключение кастомных стилей и скриптов](#a3) |
| [Цветная консоль](#a2)                         |
| [Дать права папке и подфайлам](#a1)            |

# <a name="a6"></a> Плашка Cookie

```
document.addEventListener('DOMContentLoaded', () => {
  const cookieLink = '/zhashita.html';
  const cookieName = 'cookieAgreement';

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
          box-shadow: rgba(30, 75, 210, 0.15) 0px 4px 20px 0px, rgba(30, 75, 210, 0.15) 0px 0px 10px 0px;
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
  }

  // Работа
  if (findCookie(cookieName)) return;

  const cookieString = createNode();
  document.body.insertAdjacentHTML('beforeend', cookieString);

  const cookieNode = document.querySelector('.cookiemik');
  const button = cookieNode.querySelector('.cookiemik__button');

  button.addEventListener('click', () => {
    createCookie(cookieName, true, 365);
    cookieNode.style.display = 'none';
  });
});
```

# <a name="a5"></a> Цели

```
window.addEventListener('load', () => {
  const counterID = 100297886;

	function goym(name) {
		ym(counterID, 'reachGoal', name);
		console.log('Выполнилась цель ' + name);
	}

  // На телефоны
	document.querySelectorAll('a[href*=tel]').forEach(i => {i.addEventListener('click', () => { goym('goal_phone_success'); })});

  // На кнопки с нужным названием
	const oneClickBuy = [...document.querySelectorAll('span.btn.one_click')].filter(i => i.innerHTML.toLowerCase().includes('купить в 1 клик'));
	if(oneClickBuy.length) oneClickBuy.forEach(i => i.addEventListener('click', () => { goym('goal_1click_success'); }));

  // На формы при успешном сабмите
  document.querySelectorAll('form').forEach(i => {
    const btn = i.querySelector('button');
    if(btn) {
      btn.addEventListener('click', (e) => {
        if(i.checkValidity()) goym('SEND_FORM');
      })
    }
  });
})
```

# <a name="a4"></a> Инфоблок для дат акций

- Сначала создать ифноблок "Акции"
- в нем контент "Даты" с символьным кодом `dati` и создать поле "Значение" в разделе "Свойства" с символьным кодом "value"
- элемент "Дата окончания акций" с символьным кодом `promotion_expire_date`
- Затем добавить код ниже в header.php или в local/php_interface/init.php
- Несколько значений в одном инфоблоке настроек

```
// Создаёт константу SITE_SETTINGS из значений в адм. панели: Контент/Акции/Даты/Дата окончания акций
$settingsFromAdminPanel = [];
CModule::IncludeModule('iblock');
$res = CIBlockElement::GetList([], ['IBLOCK_CODE' => 'dati'], false, false, ['IBLOCK_ID', 'ID', 'CODE', 'PROPERTY_*']);
while ($setting = $res->GetNextElement()) {
  $fields = $setting->GetFields();
  $props = $setting->GetProperties();

  foreach ($props as $prop) {
	$settingsFromAdminPanel[$prop['CODE']] = $prop['VALUE'];
  }

}
define('SITE_SETTINGS', $settingsFromAdminPanel);
```

Вывод:
`SITE_SETTINGS['promotion_expire_date']`

---

# <a name="a3"></a> Регистрация кастомных стилей и скриптов

```
// Регистрация кастомных стилей и скриптов
// Без необходимости сбрасывать кеш
function enqueue_versioned_script( $handle, $src = false, $deps = array(), $in_footer = false ) {
	wp_enqueue_script( $handle, get_stylesheet_directory_uri() . $src, $deps, filemtime( get_stylesheet_directory() . $src ), $in_footer );
}
function enqueue_versioned_style( $handle, $src = false, $deps = array(), $media = 'all' ) {
	wp_enqueue_style( $handle, get_stylesheet_directory_uri() . $src, $deps = array(), filemtime( get_stylesheet_directory() . $src ), $media );
}
// Функция регистрации
function register_custom_data() {
  enqueue_versioned_script( 'custom-scripts', '/assets/js/custom-scripts.js', array(), true );
  enqueue_versioned_style( 'custom-styles', '/assets/css/custom-styles.css' );
}
add_action( 'wp_enqueue_scripts', 'register_custom_data' );
```

## Для добавление к определенным страницам

> is_page() - для страниц
>
> is_single() - для записей

Добавить в Функция регистрации (см. выше)

```
  if(is_page(9)) {
    enqueue_versioned_script( 'glavnaya-scripts', '/assets/js/pages/glavnaya.js', array(), true );
  }
```

---

# <a name="a2"></a> Цветная консоль

```
function mik(...messages) {
  const styles = "background: #3F51B5; color: #FFF; padding: 5px 8px; font-size: 11px; border-radius: 4px; line-height: 1.5";
  const formatted = messages.map(message => typeof message === 'object' ? JSON.stringify(message) : String(message)).join(' ');
  console.debug("%c" + formatted, styles);
}
```

---

# <a name="a1"></a> Дать права папке и подфайлам

```
sudo chown -R www-data:www-data [name]
chmod -R 777 [name]
```

---
