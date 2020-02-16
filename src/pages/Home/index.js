import React, { useState, useEffect } from 'react';
import { Nav, NavItem, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import firebase from '../../services/firebase';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';
import * as articleData from './articles.json';
import newsapi from '../../services/newsapi';

import DisplayGoogleMap from './Map';

// let articleData = newsapi.getJSON('Austin');

const centerZoom = {
	Default: {
		displayName: 'Default',
		lat: 38,
		lng: -95.712891,
		zoom: 4
	},
	'New+York+City': {
		displayName: 'New York City',
		lat: 40.712776,
		lng: -74.005974,
		zoom: 10
	},
	'Los+Angeles': {
		displayName: 'Los Angeles',
		lat: 34.052235,
		lng: -118.243683,
		zoom: 10
	}
};

var keys = [];
for (var k in centerZoom) keys.push(k);

const Home = ({ history }) => {
	const [selectedArticle, setSelectArticle] = useState();
	const [articles, setArticles] = useState([]);
	const [city, setCity] = useState('');
	const [center, setCenter] = useState({ lat: 38, lng: -95.712891 });
	const [zoom, setZoom] = useState(4);

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
				onClick={() => setSelectArticle(article)}
			/>
		);
	});

	const newLocation = city => {
		setCity(city);
		setCenter({
			lat: centerZoom[city.replace(/ /g, '+')].lat,
			lng: centerZoom[city.replace(/ /g, '+')].lng
		});
		setZoom(centerZoom[city.replace(/ /g, '+')].zoom);
	};

	if (!firebase.getCurrentUsername()) {
		return (
			<Layout>
				<Nav className="d-flex justify-content-end">
					<Link to="/register">
						<NavItem className="my-1 mx-3">Register</NavItem>
					</Link>
					<Link to="/login">
						<NavItem className="my-1 ml-3 mr-5">Login</NavItem>
					</Link>
					<Link to="/settings">
						<NavItem className="my-1 ml-3 mr-5">Settings</NavItem>
					</Link>
				</Nav>
				<Row>
					<Col sm={1}>
						<div className="dropdown ml-2">
							<button
								className="btn-sm btn-secondary dropdown-toggle"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								{city.length > 0
									? centerZoom[city].displayName
									: 'Select a city'}
							</button>
							<div
								className="dropdown-menu"
								style={{ minWidth: '7rem' }}
								aria-labelledby="dropdownMenuButton"
							>
								{keys.map(city => (
									<div
										key={city}
										className="dropdown-item p-0"
										onClick={() => newLocation(city)}
									>
										{centerZoom[city].displayName}
									</div>
								))}
							</div>
						</div>
					</Col>
					<Col>
						<DisplayGoogleMap
							center={center}
							zoom={zoom}
							articles={articles}
							selectedArticle={selectedArticle}
							onChangeSelectedArticle={setSelectArticle}
						/>
					</Col>
				</Row>
				{/* <Row className="d-flex justify-content-center my-3">
				</Row> */}
				<Row className="d-flex flex-wrap justify-content-around px-3">
					{displayArticles}
				</Row>
			</Layout>
		);
	}

	firebase.addNewUserToDB();
	return (
		<Layout>
			<Nav className="d-flex justify-content-end">
				<Link to="/saved">
					<NavItem className="my-3 mx-3">Saved Articles</NavItem>
				</Link>
				<a href="#">
					<NavItem className="my-3 mx-3" onClick={() => onSignOut()}>
						Log out
					</NavItem>
				</a>
			</Nav>
			<h4>LOGGED IN!</h4>
			<h2>Hello {firebase.getCurrentUsername()}</h2>
			<Row className="d-flex justify-content-center my-3">
				<DisplayGoogleMap
					center={center}
					zoom={zoom}
					articlesLength={articles.length}
				/>
			</Row>
			<Row className="d-flex flex-wrap justify-content-around px-3">
				{displayArticles}
			</Row>
		</Layout>
	);
};

export default Home;
