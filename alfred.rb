require 'rubygems'
%w(sinatra rack-flash datamapper dm-mysql-adapter haml sass logger).each { |gem| require gem }
Dir.entries('./helpers').each do |helper|
  require File.join('./helpers', helper) if helper =~ /.rb$/
end

require 'sinatra/reloader' if development?

set :sessions, true
set :show_exceptions, false
use Rack::Flash
use Rack::MethodOverride

configure do
  set :app_file, __FILE__
  set :root, File.dirname(__FILE__)
  set :static, :true
  set :public, Proc.new { File.join(root, "public") }
  LOGGER = Logger.new("alfred.log")
end

# DataMapper.setup(:default, 'mysql://localhost/hfw')

Dir.entries('./helpers').each do |helper|
  m = /^(.+)\.rb$/.match(helper)
  if m
    eval("helpers Sinatra::#{m[1].capitalize + 'Helper'}")
  end
end

before do

end

# The routes!

get '/alfred.css' do
  headers 'Content-Type' => 'text/css; charset=utf-8'
  sass :"sass/alfred"
end
  
get '/' do
  redirect '/doma'
end

get '/doma' do
  haml :doma
end
