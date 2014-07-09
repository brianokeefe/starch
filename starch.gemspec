# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'starch/version'

Gem::Specification.new do |spec|
  spec.name          = 'starch'
  spec.version       = Starch::VERSION
  spec.authors       = ["Brian O'Keefe"]
  spec.email         = ['brian@bokstuff.com']
  spec.summary       = %q{An opinionated skeleton for basic static sites.}
  spec.description   = spec.summary
  spec.homepage      = 'https://github.com/brianokeefe/starch'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ['lib']

  spec.add_dependency 'thor'

  spec.add_development_dependency 'bundler', '~> 1.6'
  spec.add_development_dependency 'rake'
  spec.add_development_dependency 'aruba'
end
