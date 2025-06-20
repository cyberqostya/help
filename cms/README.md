| Оглавление                                     |
| ---------------------------------------------- |
| [Квадратьик Чекбокс](./checkboxSquare.html)    |
| [Плашка Cookie](./cookiePlate.js)              |
| [Цели](./metrika.js)                           |
| [Подключение к СПА сеткам](./CPA/)             |
| [Инфоблок для дат акций](#a4)                  |
| [Подключение кастомных стилей и скриптов](#a3) |
| [Цветная консоль](#a2)                         |
| [Дать права папке и подфайлам](#a1)            |

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
