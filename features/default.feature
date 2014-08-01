Feature: starch default command

  Scenario: Get the current version of starch
    When I run `bundle exec starch --version`
    Then the output should contain the current version of starch
