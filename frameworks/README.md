+ [VSCode Snippets](#a1)
+ [pm2](#a2)
+ [Предотвращение скролла, зума, хайлайта кнопок Safari](#a3)

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
