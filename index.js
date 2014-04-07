var marked   = require('marked')
  , fs       = require('fs')
  , path     = require('path')
  , toq      = require('toq')
  , Mustache = require('mustache')
;

var Doq = function(options)
{
	this.templates    = options.templates;
	this.templateRoot = options.templateRoot;
	this.output       = options.output;
}

Doq.prototype = function()
{
	var renderPartials = function(str) {
		var tagName     = '';
		var result      = str;
		var partialTags = str.match(/\{\{\>\s?([a-zA-z_\.]+)\s?\}\}/gi)

		for (i in partialTags)
		{
			tagName              = partialTags[i].replace(/[\{\}\>\s]/g, '');
			var templateBasename = this.templateRoot + tagName;
			var templateFile     = null;

			if (fs.existsSync(templateBasename + '.md')) {
				templateFile = templateBasename + '.md';
			}
			else if (fs.existsSync(templateBasename + '.html')) {
				templateFile = templateBasename + '.html';
			}

			if (null != templateFile) {
				text   = renderPartials.call(this, fs.readFileSync(templateFile, { encoding: 'utf8' }));
				result = result.replace(partialTags[i], text);
			}
		}

		return result;
	};

	var render = function(template) {
		var   extension = path.extname(template.name)
			, result    = null
			, text      = fs.readFileSync(template.name, { encoding: 'utf8' })
		;

		text = renderPartials.call(this, text)

		if ('.html' == extension) {
			// Use Mustache.
			result = Mustache.render(text, template.data);
		}
		else if ('.md' == extension) {
			// Use marked.
			result = marked(Mustache.render(text, template.data));
		}

		return result;
	};

	var generate = function() {
		var output = '';
		var self   = this;

		this.templates.forEach(function(template) {
			output += render.call(self, template);
		});

		var toc   = toq(output, { sectionNumbers: false, flat: false });
		return output.replace('<p>@@TOC@@</p>', toc.toc);

		return parts[0] + toc.toc + toc.contents;
	};

	return {
		  generate: generate
		, render: render
	};


}();

module.exports = function(options) {

	marked.setOptions({
		  renderer: new marked.Renderer()
		, gfm: true
		, tables: true
		, breaks: false
		, pedantic: false
		, sanitize: false
		, smartLists: true
		, smartypants: false
	});

	var   doq    = new Doq(options)
		, result = doq.generate()
	;

	if (doq.output)
		fs.writeFileSync(doq.output, result, { encoding: 'utf8' });
	else
		return result;
};
