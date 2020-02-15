import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyCBpDzAUiRY8nyiaNadyUIcjLTJxW41dhU',
	authDomain: 'recap-treehacks.firebaseapp.com',
	databaseURL: 'https://recap-treehacks.firebaseio.com',
	projectId: 'recap-treehacks',
	storageBucket: 'recap-treehacks.appspot.com',
	messagingSenderId: '850049162557',
	appId: '1:850049162557:web:a28bd788c9a5bd4f197954',
	measurementId: 'G-WQNV4C9JMW'
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.database = app.database();
		this.uiConfig = {
			signInFlow: 'popup',
			signInOptions: [
				app.auth.GoogleAuthProvider.PROVIDER_ID,
				app.auth.FacebookAuthProvider.PROVIDER_ID,
				app.auth.TwitterAuthProvider.PROVIDER_ID
			]
		};
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	async logout() {
		await this.auth.signOut();
		return null;
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password);
		return this.auth.currentUser.updateProfile({
			displayName: name
		});
	}

	async addNewUserToDB() {
		var newUser = this.database.ref('users').push();
		await newUser.set({
			username: this.auth.currentUser.displayName,
			email: this.auth.currentUser.email,
			saved: 'saved',
			preferences: 'preferences',
			notifications: 'notifications'
		});
		return null;
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve);
		});
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName;
	}

	getUIConfig() {
		return this.uiConfig;
	}

	getAuth() {
		return this.auth;
	}
}

export default new Firebase();
