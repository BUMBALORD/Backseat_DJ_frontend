enable :sessions

get '/' do
  erb :"users/index"
end

post '/users' do

  p params
  p params["user_name"]
  HTTParty.post("http://localhost:3000/users", body: {user_name: params["user_name"], password: params["password"]})

  redirect "/"
end

get '/callback.html' do
  p params
  erb :"users/callback"
end

get '/users' do
  erb :"users/users"
end

get '/users/new' do
  erb :"users/new"
end



# get '/users/:user_id/playlists' do
#   p params
#   @user = params[:user_id]
#   erb :"playlists/new"
# end
