#Backseat DJ Frontend
###Created by David Hallinan, Brandon Chan, Katie Eaton, Leandra Kim, and Silas Kwong.

Backseat DJ is a mobile app designed to allow the passengers in a car besides shotgun to collaboratively vote on songs to play, songs to skip, and songs to repeat.  This app was created using the SoundCloud API including SoundCloud O-Auth.

*NOTE: This is the back end version, "Backseat DJ Frontend" is needed to work with this app.*

The backend is designed in rails-api with a decoupled architecture with desire to be implimented with a native iOS and Android Framework, or using Ionic framework to bring this app to life.  The backend is designed with a postgresql database for most for the users, playlists, and songs.  The votes is linked with Firebase in order to have multiple users vote simultaneously.

The front end consists of a mobile first css library using a Sinatra skeleton framework with desire to be implimented with a native iOS and Android Framework, or using Ionic framework to bring this app to life.


####We are deployed to Heroku so checkout our app.

This app was created as a final project for DevBootcamp Rock Doves 2015.