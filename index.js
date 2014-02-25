var   marked   = require('marked')
    , fs       = require('fs')
    , path     = require('path')
    , toq      = require('toq')
    , Mustache = require('mustache')
;

var Doq = function(options)
{
	this.templates = options.templates;
	this.output    = options.output;
}

Doq.prototype = function()
{
	var render = function(template) {
		var   extension = path.extname(template.name)
			, result    = null
			, text      = fs.readFileSync(template.name, { encoding: 'utf8' })
		;

		if ('.html' == extension) {
			// Use Mustache.
			result = Mustache.render(text, template.data);
		}
		else if ('.md' == extension) {
			// Use marked.
			result = marked(text);
		}

		return result;
	};

	var generate = function() {
		var output = '';

		this.templates.forEach(function(template) {
			output += render.call(this, template);
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
		, sanitize: true
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
