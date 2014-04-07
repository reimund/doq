var doq = require('../../index.js');

doq({
    templates: [
        { name: 'templates/header.html' },
        { name: 'templates/body.md' },
        { name: 'templates/footer.html' },
    ],
    output: 'index.html',
});
