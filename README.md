# Doq
Easy documentation using markdown.

## Usage

### Simple example
```javascript
var doq = require('doq');

doq({
    templates: [
        { name: 'templates/header.html' },
        { name: 'templates/index.md' },
        { name: 'templates/footer.html' },
    ],
    output: 'index.html',
});
```

### Livereload example
```javascript
var doq        = require('doq')
  , debug      = true
  , livereload = ''
;

if (debug)
	livereload = '<script src="http://localhost:' + livereloadPort + '/livereload.js"></script>';

doq({
	  templates: [
		{ name: 'templates/header.html', data: { livereload: livereload, }},
		{ name: 'index.md' },
		{ name: 'templates/footer.html' },
	],
	output: 'index.html',
	debug: debug,
	templateRoot: 'templates/',
});
```

## Command line usage

```
Usage:
  doq [--output=<output>] [--data=<data>] [--debug] <templates>...
  doq -h | --help
  doq --version
```

### Simple example:
```
doq header.html content.md footer.html --output index.html
```
