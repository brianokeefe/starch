# Starch
[![Gem Version](https://badge.fury.io/rb/starch.svg)](http://badge.fury.io/rb/starch)

Starch is an opinionated skeleton generator for basic static site development.
It will get you going on new sites quickly by generating the meat and *potatoes*
of your toolchain. Starch gets you:

* A simple directory structure
* Barebones `bower.json` and `package.json` files for easily saving bower and
  npm dependencies
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

    mysite
    ├── Gruntfile.js
    ├── app
    │   └── assets
    |       ├── files
    |       ├── fonts
    |       ├── images
    │       ├── js
    │       └── stylesheets
    │           └── main.scss
    ├── bower.json
    ├── node_modules
    │   └── ...
    └── package.json

* Your site's HTML can live anywhere in the `app` directory (preferably outside
  of `assets`)
* Javascript and Coffeescript should live in `app/assets/js/`
  * Javascript files should have a `.js` extension and Coffeescript files should
    have a `.coffee` extension
* SASS should live in `app/assets/stylesheets/`
  * The only SASS file that will be compiled is
    `app/assets/stylesheets/main.scss`. This file should be used to import the
    rest of your SASS.
* Images, fonts, and any other static assets should live in `images`, `fonts`,
  and `files` (all in `app/assets`), respectively. These files will be copied
  1:1 without any additional processing.

By default, your site will be built 1:1 with the `app` directory, so you can
reference assets in your site like: `/assets/images/spuds.png`.

### Grunt tasks

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
