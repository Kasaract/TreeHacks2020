import React, { useState, useEffect } from 'react';
import { Nav, NavItem, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import firebase from '../../services/firebase';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';
import * as articleData from './articles.json';
import * as cityData from './cities.json';
import * as countryData from './countries.json';
import newsapi from '../../services/newsapi';
import { Multiselect } from 'multiselect-react-dropdown';

import DisplayGoogleMap from './Map';
import axios from 'axios';

// let articleData = newsapi.getJSON('Austin');
const API_KEY = '&apiKey=7c4715d11f804f72a35100812d5e0c38';
const url = 'https://newsapi.org/v2/everything?';
const countryUrl = 'https://newsapi.org/v2/top-headlines?';
const centerZoom = cityData.default;
const countryCenterZoom = countryData.default;

var keys = [];
for (var k in centerZoom) keys.push(k);

var countryKeys = [];
for (var j in countryCenterZoom) countryKeys.push(j);

const Home = ({ history }) => {
	const [selectedArticle, setSelectArticle] = useState();
	const [articles, setArticles] = useState([]);
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('United States');
	const [center, setCenter] = useState({ lat: 37.09024, lng: -95.712891 });
	const [zoom, setZoom] = useState(4);
	const [categories, setCategories] = useState('');

	const categoryChoices = [
		'Business',
		'Entertainment',
		'General',
		'Health',
		'Science',
		'Sports',
		'Technology'
	];

	// useEffect(() => setArticles(articleData.articles.splice(0, 10)), []);
	useEffect(() => {
		console.log(
			`${countryUrl}country=${countryCenterZoom[country].abbrv}&sortBy=popularity${API_KEY}`
		);
		axios
			.get(
				`${countryUrl}country=${countryCenterZoom[country].abbrv}&sortBy=popularity${API_KEY}`
			)
			.then(res => {
				setArticles(res.data.articles);
			})
			.catch(err => console.log(err));
	}, [country]);
	useEffect(() => {
		if (country === 'United States' && city.length > 0) {
			axios
				.get(`${url}q=${city}&sortBy=popularity${API_KEY}`)
				.then(res => {
					setArticles(res.data.articles);
				})
				.catch(err => console.log(err));
		}
	}, [city, country]);
	useEffect(() => {
		if (
			categories.length > 0 &&
			city.length > 0 &&
			country === 'United States'
		) {
			axios
				.get(`${url}q=${city}+${categories[0]}&sortBy=popularity${API_KEY}`)
				.then(res => {
					setArticles(res.data.articles);
				})
				.catch(err => console.log(err));
		}
	}, [categories]); // eslint-disable-line react-hooks/exhaustive-deps

	// function onAddCategory(selectedList, selectedItem) {
	// 	setCategories([...categories, selectedItem]);
	// }

	// const onRemoveCategory = (selectedList, removedItem) => {
	// 	var categoriesClone = [...categories];
	// 	const index = categoriesClone.indexOf(removedItem);
	// 	categoriesClone.splice(index, 1);
	// 	setCategories(categoriesClone);
	// };

	// function onAddCity(selectedList, selectedItem) {
	// 	setCity(selectedItem);
	// 	if (cityData.default[city]) {
	// 		setCenter({
	// 			lat: cityData.default[city].lat,
	// 			lng: cityData.default[city].lng
	// 		});
	// 		setZoom(cityData.default[city].zoom);
	// 	}
	// }

	// const onRemoveCity = (selectedList, removedItem) => {};

	// function onAddCountry(selectedList, selectedItem) {
	// 	setCountry(selectedItem);
	// 	if (countryData.default[country]) {
	// 		setCenter({
	// 			lat: countryData.default[country].lat,
	// 			lng: countryData.default[country].lng
	// 		});
	// 		setZoom(countryData.default[country].zoom);
	// 	}
	// }

	// const onRemoveCountry = (selectedList, removedItem) => {};

	const onSignOut = () => {
		firebase.logout().then(() => history.push('/'));
	};

	const selectStyle = {
		multiselectContainer: {
			margin: 'auto',
			width: '7rem'
		},
		option: {
			padding: '3px 2px',
			fontSize: '0.85rem'
		}
	};

	const displayArticles = articles.map(article => {
		return (
			<ArticleCard
				key={article.title}
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

	const newCityLocation = city => {
		setCity(city);
		setCenter({
			lat: centerZoom[city].lat,
			lng: centerZoom[city].lng
		});
		setZoom(centerZoom[city].zoom);
	};
	const newCountryLocation = country => {
		setCountry(country);
		setCity('');
		setCenter({
			lat: countryCenterZoom[country].lat,
			lng: countryCenterZoom[country].lng
		});
		setZoom(countryCenterZoom[country].zoom);
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
					{/* <Link to="/settings">
						<NavItem className="my-1 ml-3 mr-5">Settings</NavItem>
					</Link> */}
				</Nav>
				<Row className="mr-3 ml-3">
					<Col sm={1} style={{ padding: '0' }}>
						{/* Country */}
						<div className="dropdown ml-2 my-2">
							<button
								className="btn-sm btn-secondary dropdown-toggle"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								{country}
							</button>
							<div
								className="dropdown-menu"
								style={{ minWidth: '7rem' }}
								aria-labelledby="dropdownMenuButton"
							>
								{console.log(JSON.stringify(countryKeys))}
								{countryKeys.map(country => (
									<div
										key={country}
										className="dropdown-item pl-2"
										onClick={() => newCountryLocation(country)}
									>
										{country}
									</div>
								))}
							</div>
						</div>

						{/* City */}
						{country === 'United States' && (
							<div className="dropdown ml-2 my-2">
								<button
									className="btn-sm btn-secondary dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									{city.length > 0 ? city : 'Select city:'}
								</button>
								<div
									className="dropdown-menu"
									style={{ minWidth: '7rem' }}
									aria-labelledby="dropdownMenuButton"
								>
									{keys.map(city => (
										<div
											key={city}
											className="dropdown-item pl-2"
											onClick={() => newCityLocation(city)}
										>
											{city}
										</div>
									))}
								</div>
							</div>
						)}

						{/* Category */}
						{city.length > 1 && (
							<div className="dropdown ml-2 my-2">
								<button
									className="btn-sm btn-secondary dropdown-toggle"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									{categories.length > 0 ? categories : 'Select category:'}
								</button>
								<div
									className="dropdown-menu"
									style={{ minWidth: '7rem' }}
									aria-labelledby="dropdownMenuButton"
								>
									{categoryChoices.map(category => (
										<div
											key={category}
											className="dropdown-item pl-2"
											onClick={() => setCategories(category)}
										>
											{category}
										</div>
									))}
								</div>
							</div>
						)}
					</Col>

					<Col sm={10} style={{ padding: '0', marginLeft: '1rem' }}>
						<DisplayGoogleMap
							center={center}
							zoom={zoom}
							articles={articles}
							selectedArticle={selectedArticle}
							onChangeSelectedArticle={setSelectArticle}
						/>
					</Col>
				</Row>
				<Row
					className="d-flex flex-wrap justify-content-around px-3"
					style={{ height: '45vh', overflow: 'auto' }}
				>
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
