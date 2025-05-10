+ [Добавление сайта на сервер](#a7)
+ [hosts для развертки на боевом с БД](#a6)
+ [VSCode Snippets](#a1)
+ [pm2](#a2)
+ [Предотвращение скролла, зума, хайлайта кнопок Safari](#a3)
+ [Применение PHP внутри .html](#a4)
+ [Вывод компонента php](#a5)

### <a name="a7"></a> Команды для добавления сайта на сервер
```
sudo mkdir -p /var/www/PROJECTNAME/html
sudo chown -R $USER:$USER /var/www/PROJECTNAME/html

add DNS subdomain

/etc/nginx/sites-available/all-projects
server {
    listen 80;
    server_name PROJECTNAME.cyberqostya.ru;

    root /var/www/PROJECTNAME/html;
    index index.html;

    error_log /var/log/nginx/PROJECTNAME.error.log;

    location / {
        try_files $uri $uri/ =404;
    }
}

sudo nginx -t
sudo systemctl reload nginx

sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx (выбрать ALL)
(sudo certbot --nginx -d PROJECTNAME.cyberqostya.ru)
```
***

### <a name="a6"></a> hosts
C:\Windows\System32\drivers\etc  
```
87.228.27.58 zagorodny.tv
```
***

### <a name="a1"></a> VSCode Snippets
```
	"Document Query": {
		"prefix": "dq",
		"body": [
			"document.querySelector('$1')"
		]
	},
	"React Component": {
		"prefix": "ed",
		"body": [
			"import style from './$1.module.scss';\n",
			"export default function $1() {",
			"\treturn (",
			"\t\t<section className={ style.${1/(.*)/${1:/downcase}/} }></section>",
			"\t);",
			"}"
		]
	},
	"useState": {
		"prefix": "uses",
		"body": [
			"const [$1, set${1/(.{1})/${1:/upcase}/}] = useState($2);"
		]
	}
```
***

### <a name="a2"></a> pm2
```
pm2 start npm --name strapi -- start
pm2 start "npm run dev" --name myAppName
```
***

### <a name="a3"></a> Safari приколы
```
body {
  overflow: hidden;
  height: 100svh;
}
body > * {
  position: fixed;
  height: 100%;
} // скролл для обновления (потянуть вниз)

touch-action: manipulation; // зум по двойному тапу

-webkit-tap-highlight-color: transparent; // хайлайт нажатой кнопки
```
***

### <a name="a4"></a> Применение PHP внутри .html
```AddHandler application/x-httpd-php .html .htm```
***

### <a name="a5"></a> Вывод компонента php
```<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/Header/Header.php'; ?>```
