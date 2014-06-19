
abort "Please use Ruby 2.1.2 to build Ember.js!" if RUBY_VERSION !~ /^2\.1\.2/

require "bundler/setup"
require "erb"
require 'rake-pipeline'
require "colored"

def pipeline
  Rake::Pipeline::Project.new("Assetfile")
end



desc "Build"
task :dist do
  puts "Building "
  pipeline.invoke
  puts "Done"
end

desc "Clean build artifacts from previous builds"
task :clean do
  puts "Cleaning build..."
  pipeline.clean
  puts "Done"
end


task :default => :dist
