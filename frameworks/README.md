+ [VSCode Snippets](#a1)
+ [pm2](#a2)

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
