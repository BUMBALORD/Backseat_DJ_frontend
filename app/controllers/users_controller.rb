enable :sessions

get '/' do
  p $session
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

get '/users/session' do
  p params
  response = HTTParty.get("http://localhost:3000/session", body: {user_name: params["username"]}).parsed_response
  p response
  session[:user_id] = response["id"]
  p session[:user_id]
redirect "http://localhost:3000"
end

get'/users/redirect' do
  redirect "/users/#{session[:user_id]}/playlists"
end
