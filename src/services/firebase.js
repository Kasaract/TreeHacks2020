import app from 'firebase/app';
import 'firebase/auth';

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
		let user = this.auth.currentUser;
		this.writeUserData(user.userId, user.name, user.email);
		return user.updateProfile({
			displayName: name
		});
	}

	writeUserData(userId, name, email) {
		this.database.ref('users/' + userId).set({
			username: name,
			email: email
		});
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve);
		});
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName;
	}
}

export default new Firebase();
