# Starch
[![Gem Version](https://badge.fury.io/rb/starch.svg)](http://badge.fury.io/rb/starch)
[![Code Climate](https://codeclimate.com/github/brianokeefe/starch.png)](https://codeclimate.com/github/brianokeefe/starch)
[![Build Status](https://travis-ci.org/brianokeefe/starch.svg?branch=master)](https://travis-ci.org/brianokeefe/starch)

Starch is an opinionated skeleton generator for basic static site development.
It will get you going on new sites quickly by generating the meat and *potatoes*
of your toolchain. Starch gets you:

* A simple directory structure
* Barebones `bower.json` and `package.json` files for easily saving bower and
  npm dependencies
* Templates, partials, and helpers via Handlebars
* PNG, JPG, and GIF optimization
* SASS compilation
* JS uglification
* Coffeescript compilation
* A preview server with livereload
* The ability to build a production-ready version of your site

## Prerequisites

* [NodeJS](http://nodejs.org) with `npm`

## Installation

    $ gem install starch

## Usage

To scaffold a new site named `mysite`:

    $ starch new mysite

Starch will create a directory `mysite` within the current directory that looks
like this:

    ├── Gruntfile.js
    ├── app
    │   ├── assets
    │   │   ├── files
    │   │   ├── fonts
    │   │   ├── images
    │   │   ├── js
    │   │   └── stylesheets
    │   │       └── main.scss
    │   ├── helpers.js
    │   ├── pages
    │   ├── partials
    │   └── templates
    │       └── default.hbt
    ├── bower.json
    ├── node_modules
    │   └── ...
    └── package.json

* Your site's HTML files should live in `app/assets/pages/` with `.html`
  extensions.
  * These files will be parsed with Handlebars.
  * You can include a YAML block (in between two lines of `---`) at the top of
    the file with frontmatter. The data provided here will be available in the
    file and in the file's template, via the `page` object.
* Partials should live in `app/assets/partials/` with `.hbp` extensions.
  * You can use partials in your HTML files and in your templates in standard
    Handlebars fashion ( `{{> my-partial-name}}` ).
    * If you want to use a partial that is deeply nested, you don't need to
      specify the path - just use the partial's name.
* Templates should live in `app/assets/templates/` with `.hbt` extensions.
  * `default.hbt` is the default template and needs to exist, otherwise you're
    gonna have a bad time.
  * You can change the template that a given `.html` file uses by specifying
    `template: some-template-name` in the file's frontmatter.
  * Use `{{{body}}}` in your templates where the HTML should be rendered.
* Any Handlebars helpers can live in `app/helpers.js`. In the exported object,
  each key/value pair should resemble `helperName: function(value) { ... }`.
* Javascript and Coffeescript should live in `app/assets/js/`.
  * Javascript files should have a `.js` extension and Coffeescript files should
    have a `.coffee` extension.
* SASS should live in `app/assets/stylesheets/`.
  * The only SASS file that will be compiled is
    `app/assets/stylesheets/main.scss`. This file should be used to import the
    rest of your SASS.
* Images in `app/assets/images/` with `.png`, `.jpg`, or `.gif` extensions will
  be optimized and copied 1:1 into the destination directory.
* Fonts, and any other static assets should live in `fonts` and `files`
  (located in `app/assets`), respectively. These files will be copied 1:1
  without any additional processing.

When your site is staged or built, the `assets` directory will be placed in the
root of the destination directory, alongside the rendered contents of the
`pages` directory. For example, `app/pages/index.html` will end up as
`/index.html`, and you can reference assets in your site like:
`/assets/images/spuds.png`.

### Grunt tasks - staging, building, cleaning

The entirety of the Starch toolchain is accessible through
[Grunt](http://gruntjs.com). There are quite a few tasks defined in the
Gruntfile, but there are only three that you should really care about:

* `grunt serve`: Builds your site for staging and starts a preview server on
  `http://0.0.0.0:8000`. `livereload` is enabled, so any time the `app`
  directory changes, the site will be automatically refreshed in your browser.
  Neat!
* `grunt build`: Builds your site for production into the `public_html`
  directory.
* `grunt clean`: Nukes the `staging` and `public_html` directories. You can be
  more specific with `grunt clean:staging` and `grunt clean:build`,
  respectively.

### It's just a scaffolder

Starch is meant to provide a solid starting point for new projects; however, it
may not always meet your particular needs. You're encouraged to modify the
generated Gruntfile (or anything else) to meet the requirements of your project.

## Contributing

1. Fork it ( https://github.com/brianokeefe/starch/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
