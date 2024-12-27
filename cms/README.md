+ [Инфоблок для дат акций](#a20)
+ [Редирект 404 error.php](#a1)
+ [console.log в PHP](#a2)
+ [Не работает SVG](#a3)
+ [Shortcode](#a4)
+ [Подключение кастомных .php](#a5)
+ [htaccess](#a6)
+ [GoogleSheets](#a7)
+ [grep](#a8)
+ [Подключение кастомных стилей и скриптов](#a9)
+ [Пустые ТЕМЫ Wordpress](https://underscores.me/)
+ [Вывести меню из Wordpress](#a10)
+ [Вывести (title) (url) Wordpress](#a11)
+ [Вывести год php](#a12)
+ [Вывести кастомные посты](#a13)
+ [Вывести категории](#a14)
+ [Хлебные крошки](#a15)
+ [Цветная консоль](#a16)

+ [Дать права папке и подфайлам](#a17)
+ [Related Post](#a18)
+ [Логирование ошибок php](#a19)





### <a name="a20"></a> Инфоблок для дат акций
- Сначала создать ифноблок "Акции" 
- в нем контент "Даты" с символьным кодом `dati` и создать поле "Значение" в разделе "Свойства" с символьным кодом "value"
- элемент "Дата окончания акций" с символьным кодом `promotion_expire_date`
- Затем добавить код ниже в header.php или в local/php_interface/init.php
```
// Создаёт константу SITE_SETTINGS из значений в адм. панели: Контент/Акции/Даты/Дата окончания акций
$settings = [];
CModule::IncludeModule('iblock');
$res = CIBlockElement::GetList([], ['IBLOCK_CODE' => 'dati'], false, false, ['IBLOCK_ID', 'ID', 'CODE', 'PROPERTY_*']);
while ($setting = $res->GetNextElement()) {
  $fields = $setting->GetFields();
  $props = $setting->GetProperties();
  $settings[$fields['CODE']] = $props['value']['VALUE'];
}
define('SITE_SETTINGS', $settings);
```

Вывод:
`SITE_SETTINGS['promotion_expire_date']`
***

### <a name="a1"></a> Редирект 404 error.php
```
if (($this->error->getCode()) == '404') {
  header("HTTP/1.0 404 Not Found");
  $url=JURI::root()."index.php/404";
  $data = file_get_contents($url) or die("Cannot open URL");
  echo $data;
  break;
}
```
***



### <a name="a2"></a> PHP
```
print_r($array);
var_dump()
```
***



### <a name="a3"></a> SVG
```
<?xml version="1.0" encoding="utf-8"?>

// загрузка новых типов медиафайлов
function wph_add_mime_types($mimes)
{
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'wph_add_mime_types');
```
***



### <a name="a4"></a> Shortcode
```
// Хлебные крошки
add_shortcode('h1', function ($atts = false) {
	return '<h1>' . $atts[name] . '</h1>';
}); 
```
***



### <a name="a5"></a> Подключение кастомных .php к function.php
```
require_once( dirname(__FILE__) . '/custom-php/pansions-cards-shortcode.php');
```
***



### <a name="a6"></a> .htaccess
```
Redirect 301 /was.php http://www.site.ru/new.php
RedirectMatch 301 ^/news/(.+?)(-[0-9]+)?$ /blog/$1
```
***



### <a name="a7"></a> GoogleSheets
<font size = 6>_Хеш в адресной строке таблицы_: https:// docs.google.com/spreadsheets/d/***1CRiCYbXh5pcjOTPAG6Xe7vV-ZKT3CjFa8sTVeImdpJ0***/edit#gid=0</font>
```
function doGet(e) {
  var sheet = SpreadsheetApp.openById("хеш в адресной строке таблицы");
  var n = sheet.getLastRow() + 1;
  
  var date = new Date().toLocaleString('ru', {
    timeZone: 'Europe/Moscow',
    year:'2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  sheet.getRange("A" + n).setValue(date);
  sheet.getRange("B" + n).setValue(e.parameter.name);
}

```
#### Отправка параметров
```
https://script.google.com/macros/s/AKfycbyxR4zFYq9FYXLNF5r1HZD8pWRvPDHj257fHaf5PlhPW1IeTdLIb5DVJ_ja-anqyZ-rsg/exec?name=${formName}&email=${formEmail}
```
***



#### <a name="a8"></a> grep
```grep -iRl "smth" wp-content```
***



### <a name="a9"></a> Регистрация кастомных стилей и скриптов
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
#### Для добавление к определенным страницам
> is_page() - для страниц
> 
> is_single() - для записей

Добавить в Функция регистрации (см. выше)
```
  if(is_page(9)) {
    enqueue_versioned_script( 'glavnaya-scripts', '/assets/js/pages/glavnaya.js', array(), true );
  }
```
***



### <a name="a10"></a> Вывести меню из Wordpress
```
$menu = (wp_get_nav_menu_items('header'));
foreach ($menu as $key => $item) :
  <a href="<?php echo $item->url ?>"><?php echo $item->title ?></a>
<?php endforeach; ?>

# Зарегистрировать меню в functions.php, потом поставить галочку отображения в (Внешний вид) - (Меню) - (Область отображения)
register_nav_menus(
  array(
    'header' => 'Шапка',
  )
);
```
***



#### <a name="a12"></a> Вывести год php
```
<?php echo date('Y') ?>
```
***


#### <a name="a13"></a> Вывести кастомные посты
```
<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri() ?>/assets/css/slidermain.css">
<section class="slidermain">
  <div class="slidermain__inner">
    <?php
    $the_query = new WP_Query(array(
      'posts_per_page' => -1,
      'post_type' => 'slidermain',
    ));

    while ($the_query->have_posts()) : $the_query->the_post();
    ?>
      <div class="slidermain__slide">
        <p class="slidermain__weight"><?php the_field('weight'); ?></p>
        <h3 class="slidermain__title"><?php the_title(); ?></h3>
      </div>
    <?php
    endwhile;
    wp_reset_postdata();
    wp_reset_query();
    ?>
  </div>
</section>
<script src="<?php echo get_template_directory_uri() ?>/assets/js/slidermain.js"></script>
```
***


#### <a name="a14"></a> Вывести категории товаров
```
<?php
    $categories = get_terms(array(
      'taxonomy' => 'product_cat',
      'hide_empty' => false
    ));

    foreach ($categories as $category) :
      if ($category->term_id == 15) continue;
    ?>

      <a class="catalogdirection__link" href="<?php echo get_term_link($category) ?>">
        <?php echo $category->name ?>
      </a>

    <?php endforeach; ?>
```
***


#### <a name="a15"></a> Хлебные крошки
```
<div class="breadcrumbs">
  <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri() ?>/assets/css/breadcrumbs.css">

  <nav class="breadcrumbs__inner">
    <a class="breadcrumbs__link" href="/">Главная</a>
    <div class="breadcrumbs__break">></div>

    <?php if ($atts != false) : ?>

      <?php if (count($atts) === 1) : ?>
        <?php
        preg_match('/([^\/]+\/?)/', $_SERVER['REQUEST_URI'], $matches)
        ?>
        <a class="breadcrumbs__link" href="/<?php echo $matches[0] ?>"><?php echo $atts['firstlevel']; ?></a>
        <div class="breadcrumbs__break"></div>
      <?php endif; ?>

    <?php endif; ?>

    <a class="breadcrumbs__link" href="<?php echo $_SERVER['REQUEST_URI'] ?>"><?php the_title(); ?></a>

  </nav>
</div>
```
***




### <a name="a16"></a> Цветная консоль
```
console.log('%cJavaScript - Добавление кнопки "Оставить заявку" в бургер для мобильных: %cРасширения - Модули - Телефоны для смартфона', 'background: #3F51B5; color: #FFF; padding: 5px; font-size: 10px', 'font-weight: bold; font-style: italic; padding: 5px; font-size: 10px;')
```
***




### <a name="a17"></a> Дать права папке и подфайлам
```
sudo chown -R www-data:www-data [name]
chmod -R 777 [name]
```
***




### <a name="a18"></a> Realted Post
```
add_shortcode( 'author-articles', function( $atts ) {
	
	$html = '';
	$author;
	$authorID;
	$the_query;
	
	// Related post - need 1
	if($atts['related']) {
		$the_query = new WP_Query(array(
			'orderby' => 'rand',
			'posts_per_page' => 1,
		));
	} 
	// Author page posts & Main page posts
	else {
		$args = array(
			'posts_per_page' => 4,
		);
		
		// AJAX Load more
		if($atts['offset']) {
			$args['offset'] = $atts['offset'];
			
			// Author page but AJAX
			if($atts['authorid']) {
				$args['author'] = $atts['authorid'];
			}
		}
		
		// Author page
		if($atts['author']) {
			$author = get_user_by( 'slug', get_query_var( 'author_name' ) );
			$authorID = $author->ID;
			$args['author'] = $authorID;
		}
		
		$the_query = new WP_Query($args);
	}
	
	// Get 4 articles, but show 3
	// if articles.length == 4, show 'loadmore' button
	$whileCounter = 0;
	while ($the_query->have_posts()) {
		if($whileCounter == 3) break;
		
		$the_query->the_post();
		
		// Related post
		if(!isset($author)) {
			$authorID = get_post_field( 'post_author', get_the_ID() );
		}
		
		$content = wp_strip_all_tags( get_the_content() );
		$intro = mb_substr( $content, 0, 100 ) . '...';
		// strpos( $content, '.' )
		
		$html .= ArticleCard(array(
			'author_name' => get_the_author_meta('display_name', $authorID),
			'author_image' => get_field('avatar', 'user_' . $authorID),
			'author_page' => get_author_posts_url($authorID),
			'date' => get_the_time('m.d.Y'),
			'title' => get_the_title(),
// 			'subtitle' => get_post_meta(get_the_id())[_yoast_wpseo_title][0],
			'preview' => get_the_post_thumbnail_url(get_the_ID(), 'large'),
// 			'intro' => get_post_meta(get_the_id())[_yoast_wpseo_metadesc][0],
			'intro' => $intro,
			'link' => get_the_permalink()
		));

		$whileCounter++;
	}
	
	// Need to add LoadMore button? 	
	if(!$atts['related']) {
		if($the_query->post_count == 4) {
			$html .= '<button class="loadMore">Load more</button>';
		}
	}
	
	wp_reset_query();
    wp_reset_postdata();
	return $html;
});
```
***



### <a name="a19"></a> Логирование ошибок php
```
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
```
***
