require 'httparty'
# get '/' do
#   # @playlist = Playlist.find(1).songs
#       ##placeholder for params[:id]
#   erb :"playlists/index"
# end

get '/users/:user_id/playlists' do
  @test = params[:user_id]
  erb :"playlists/index"
end


get '/users/:user_id/playlists/:id' do
  p params
  @playlist_id = params[:id]
  @user =  params[:user_id]

  response = HTTParty.get("http://localhost:3000/users/#{params[:user_id]}/playlists")
  p "*" * 100
  p response.parsed_response["data"]
  p "*" * 100
   response.parsed_response["data"].each do |xyz|
    if xyz["id"].to_i == params[:id].to_i
          p xyz
          p "*" * 100
    end
  end

  erb :"playlists/show"
end



