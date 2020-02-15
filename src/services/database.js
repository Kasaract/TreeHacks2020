import app from 'firebase/app';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyCBpDzAUiRY8nyiaNadyUIcjLTJxW41dhU',
	authDomain: 'recap-treehacks.firebaseapp.com',
	databaseURL: 'https://recap-treehacks.firebaseio.com',
	storageBucket: 'recap-treehacks.appspot.com'
};

class Database {
	constructor() {
		app.initializeApp(config);
		this.database = app.database();
	}
	pushUserData(name) {
		this.database.ref('users').set({
			username: 'hi'
		});
	}

	// Update user init view
	// Update user init topics
	// Update user notifications
}

export default new Database();
