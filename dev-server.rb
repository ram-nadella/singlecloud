require "sinatra"

set :public_folder, "/Users/ram/code/misc/singlecloud"

get "/*" do
  File.read "index.html"
end