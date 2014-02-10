var   marked   = require('marked')
	, fs       = require('fs')
	, _        = require('underscore')
	, Mustache = require('mustache')
;

module.exports = function(options) {

	var   bodyText   = ''
		, headerText = ''
		, footerText = ''
		, result     = null
	;

	_.defaults(options, {
		  input: 'index.md'
		, output: 'index.html'
		, header: { name: false }
		, footer: { name: false }
	});

	if (!_.isEmpty(options.header.name))
		headerText = fs.readFileSync(options.header.name, { encoding: 'utf8' })

	if (!_.isEmpty(options.footer.name))
		footerText = fs.readFileSync(options.footer.name, { encoding: 'utf8' })

	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: true,
		smartLists: true,
		smartypants: false
	});

	bodyText = fs.readFileSync(options.input, { encoding: 'utf8' });

	result = Mustache.render(headerText, options.header.data)
		+ marked(bodyText)
		+ Mustache.render(footerText, options.footer.data);

	fs.writeFileSync(options.output, result, { encoding: 'utf8' });
	//console.log('Markdown\'ed text saved to ' + options.output + '.');
};
