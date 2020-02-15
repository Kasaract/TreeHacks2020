import React, { useState, useEffect } from 'react';

import firebase from './services/firebase';
import Loader from './components/Loader';
import ArticleCard from './components/ArticleCard';
import './App.css';
import Routes from './Routes';

function App() {
	const [firebaseInitialized, setFirebaseInitialized] = useState(false);

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val);
		});
	});

	return firebaseInitialized !== false ? <Routes /> : <Loader />;
}

export default App;
