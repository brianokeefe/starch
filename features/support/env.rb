require 'coveralls'
Coveralls.wear!

require 'aruba/cucumber'
require 'starch'

Before do
  @aruba_timeout_seconds = 500
end

