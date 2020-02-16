import React, { useState, useEffect } from 'react';
import { Nav, NavItem, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import firebase from '../../services/firebase';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';

import * as articleData from './articles.json';
import DisplayGoogleMap from './Map';

const Home = ({ history }) => {
	const [articles, setArticles] = useState([]);
	const [center, setCenter] = useState({ lat: 40.712776, lng: -74.005974 });
	const [zoom, setZoom] = useState(12);

	useEffect(() => setArticles(articleData.articles.splice(0, 10)), []);

	const onSignOut = () => {
		firebase.logout().then(() => history.push('/'));
	};

	const displayArticles = articles.map(article => {
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
					<Link to="/settings">
						<NavItem className="my-3 ml-3 mr-5">Settings</NavItem>
					</Link>
				</Nav>
				<h4>NOT LOGGED IN</h4>
				<Row>
					<button
						onClick={() => {
							setCenter({ lat: 56.130367, lng: -106.346771 });
							setZoom(3);
						}}
					>
						Canada
					</button>
					<button
						onClick={() => {
							setCenter({ lat: 23.634501, lng: -102.552788 });
							setZoom(5);
						}}
					>
						Mexico
					</button>
					<button
						onClick={() => {
							setCenter({ lat: 38, lng: -95.712891 });
							setZoom(4);
						}}
					>
						United States
					</button>
					<div>{JSON.stringify(center)}</div>
				</Row>
				<Row className="d-flex justify-content-center my-3">
					<DisplayGoogleMap center={center} zoom={zoom} />
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
				<a href="#">
					<NavItem className="my-3 mx-3" onClick={() => onSignOut()}>
						Log out
					</NavItem>
				</a>
			</Nav>
			<h4>LOGGED IN!!</h4>
			<h2>Hello {firebase.getCurrentUsername()}</h2>
			<Row className="d-flex justify-content-center my-3">
				{/* <DisplayGoogleMap /> */}
			</Row>
			<Row className="d-flex flex-wrap justify-content-around px-3">
				{displayArticles}
			</Row>
		</Layout>
	);
};

export default Home;
