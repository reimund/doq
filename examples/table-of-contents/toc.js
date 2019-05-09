var doq = require('../../index.js');

doq({
    templates: [
        { name: __dirname + '/templates/body.md' },
	],
	sectionNumbers: true,
    output: 'index.html',
});