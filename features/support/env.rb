require 'coveralls'
Coveralls.wear!

require 'aruba/cucumber'

Before do
  @aruba_timeout_seconds = 500
end

