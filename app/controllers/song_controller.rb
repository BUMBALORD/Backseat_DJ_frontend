
get '/songs/:id' do
  p params
  erb :"songs/show"
end
