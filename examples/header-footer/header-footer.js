var doq = require('../../index.js');

doq({
    templates: [
        { name: __dirname + '/templates/header.html' },
        { name: __dirname + '/templates/body.md' },
        { name: __dirname + '/templates/footer.html', data: { myvar: 'value' }  },
    ],
    output: 'index.html',
});
