import React, { useState, useEffect } from 'react';
import { Nav, NavItem, Row, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import firebase from '../../services/firebase';
import newsapi from '../../services/newsapi';
import { getCenter } from '../../services/map';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';

// import * as articleData from './articles.json'; Remove Eventually
import DisplayGoogleMap from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const listOfCountries = ['UnitedStates', 'Canada', 'Mexico'];
let articleData = newsapi.getJSON('Austin');

const centerZoom = {
	Mexico: {
		lat: 23.634501,
		lng: -102.552788,
		zoom: 5
	},
	Canada: { lat: 56.130367, lng: -106.346771, zoom: 3 },
	UnitedStates: { lat: 38, lng: -95.712891, zoom: 4 }
};

const Home = ({ history }) => {
	const [articles, setArticles] = useState([]);
	const [selectedCountries, setSelectedCountries] = useState(['UnitedStates']);
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
			/>
		);
	});

	const handleDropdownOnClick = countryName => {
		setSelectedCountries([...selectedCountries, countryName]);
		var zoom = [];
		var coords = [];

		selectedCountries.forEach(selectedCountry => {
			coords.push({
				lat: centerZoom[selectedCountry].lat,
				lng: centerZoom[selectedCountry].lng
			});
			zoom.push(centerZoom[selectedCountry].zoom);
			console.log(coords);
			console.log(zoom);
		});

		console.log(coords);
		console.log(zoom);
		setCenter(getCenter(coords));
		setZoom(Math.max(zoom));
	};

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
				<div class="dropdown">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="countryDropdown"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						{
							listOfCountries.filter(
								country => !selectedCountries.includes(country)
							)[0]
						}
					</button>
					{/* <button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Dropdown button
					</button> */}
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						{listOfCountries
							.filter(country => !selectedCountries.includes(country))
							.map(country => (
								<a
									class="dropdown-item"
									href="#"
									onClick={() => handleDropdownOnClick(country)}
								>
									{country}
								</a>
							))}
					</div>
				</div>

				<Row>
					{selectedCountries.map(selectedCountry => (
						<span className="btn btn-primary">
							{selectedCountry}
							{` `}
							<FontAwesomeIcon
								icon={faMinus}
								onClick={() => [
									...selectedCountries.filter(
										country => country === selectedCountry
									)
								]}
							/>
						</span>
					))}
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

	firebase.addNewUserToDB();
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
