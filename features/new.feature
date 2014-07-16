Feature: scaffolding a site

  Scenario: Scaffold a new site
    When I run `bundle exec starch new foo`
    Then the following directories should exist:
      | foo |
      | foo/node_modules |
      | foo/app |
      | foo/app/assets/files |
      | foo/app/assets/fonts |
      | foo/app/assets/images |
      | foo/app/assets/js |
      | foo/app/assets/stylesheets |
      | foo/app/pages |
      | foo/app/partials |
      | foo/app/templates |
    And the following files should exist:
      | foo/Gruntfile.js |
      | foo/package.json |
      | foo/bower.json |
      | foo/app/assets/stylesheets/main.scss |
      | foo/app/templates/default.hbt |
    And the file "foo/package.json" should contain:
      """
      "name": "foo",
      """
    And the file "foo/bower.json" should contain:
      """
      "name": "foo",
      """
    And the output should contain "foo created"
