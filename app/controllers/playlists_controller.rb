require 'httparty'

get '/users/:user_id/playlists' do
 
  @user = params[:user_id]
  response = HTTParty.get("http://localhost:3000/users/#{params[:user_id]}/playlists").parsed_response
  @playlists = response["playlist"]
  @current_user = response["user"]
  

  erb :"playlists/index"
end


get '/users/:user_id/playlists/:id' do
  @playlist_id = params[:id]
  @user =  params[:user_id]
  response = HTTParty.get("http://localhost:3000/users/#{params[:user_id]}/playlists").parsed_response
  @playlist = response["playlist"]

  erb :"playlists/show"
end



