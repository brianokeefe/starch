require 'thor'

module Starch
  class Generator < Thor
    include Thor::Actions

    attr_accessor :name

    map ['-v', '--version'] => :version

    # gem root relative to here
    source_root File.expand_path File.join(__FILE__, '..', '..', '..')

    desc 'new [NAME]', 'Scaffold a new site named [NAME]'
    def new(name)
      # make sure name can be used in ERB
      @name = name

      say 'Generating skeleton', :yellow
      directory 'skel', name

      say 'Running `npm install`', :yellow
      system "cd #{name}; npm install"

      say "#{name} created", :green
    end

    desc 'version', 'Show version'
    def version
      say Starch::VERSION
    end
  end
end

