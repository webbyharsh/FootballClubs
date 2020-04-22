# FootballClubs- App made using react-native and firebase
The footballclubs app gives you names of all the football clubs in a particular state that you choose from a dropdown menu.
It is made using react-native technology whose main advantage is that you can use same piece of code for application development in android
web as well as IOS development.
## About Frontend
The front end of the app is made using react-native.
The react-native's latest react-native CLI has been used for this project. The official documentation provided by react-native has been refered during
the developement. https://reactnative.dev/
the boilerplate code for the frontend was obtained by ### 'npx react-native FootballsClub init'

## About Backend
The backbone of this app is the backend which is created using node.js as a server sided scripting language and Firebase database.
### API rules provided by the backend

1. To access the clubs of a particular state (we get only 10 results in a single api call)
	### API end-point(GET) : https://hyclubs.herokuapp.com/api/getclubs/:statename/:end-element-index
   ex. fetch('https://hyclubs.herokuapp.com/api/getclubs/Kerala/0')
2. To like a particular club of a particular state
	### API end-point(GET) : https://hyclubs.herokuapp.com/api/like/:statename/:clubname
3. To dislike a particular club of a particular state
	### API end-point(GET) : https://hyclubs.herokuapp.com/api/dislike/:statename/:clubname
4. To get total clubs count in a particular state
	### API end-point(GET): https://hyclubs.herokuapp.com/api/totalclubs/:statename

