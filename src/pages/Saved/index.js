import React from 'react';
import { Nav, NavItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import firebase from '../../services/firebase';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';

// import * as savedArticles from './savedarticles.json';
import DisplayGoogleMap from '../Home/Map';


const Saved = ({ history }) => {
	const onSignOut = () => {
		firebase.logout().then(() => history.push('/'));
	};
	// if (firebase.getCurrentUsername) {
		let savedArticles = firebase.getSavedArticlesJSON();
	// }

	const displayArticles = savedArticles.articles.map(article => {
		return (
			<ArticleCard
				key={article.publishedAt}
				title={article.title}
				author={article.author}
				source={article.source.name}
				preview={article.description}
				image={article.urlToImage}
				link={article.url}
			/>
		);
	});

	if (!firebase.getCurrentUsername()) {
		return (
			<Layout>
				<Nav className="d-flex justify-content-end">
					<Link to="/register">
						<NavItem className="my-3 mx-3">Register</NavItem>
					</Link>
					<Link to="/login">
						<NavItem className="my-3 ml-3 mr-5">Login</NavItem>
					</Link>
				</Nav>
				<h4>NOT LOGGED IN</h4>
				<Row className="d-flex justify-content-center my-3">
					<DisplayGoogleMap zoom={70} />
				</Row>
				<Row className="d-flex flex-wrap justify-content-around px-3">
					{displayArticles}
				</Row>
			</Layout>
		);
	}

	return (
		<Layout>
			<Nav className="d-flex justify-content-end">
				<Link to="/">
					<NavItem className="my-3 mx-3">Home</NavItem>
				</Link>
				<a href="#">
					<NavItem className="my-3 ml-3 mr-5" onClick={() => onSignOut()}>
						Log out
					</NavItem>
				</a>
			</Nav>
			<h4>LOGGED IN!!</h4>
			<h2>Hello {firebase.getCurrentUsername()}</h2>
			<Row className="d-flex justify-content-center my-3">
				<DisplayGoogleMap zoom={70} />
			</Row>
			<Row className="d-flex flex-wrap justify-content-around px-3">
				{displayArticles}
			</Row>
		</Layout>
	);
};

export default Saved;
