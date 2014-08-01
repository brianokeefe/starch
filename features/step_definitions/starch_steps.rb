Then /^the output should contain the current version of starch$/ do
  step %(the output should contain "#{Starch::VERSION}"\n)
end
