import React, { useState, useEffect } from 'react';
import { Nav, NavItem, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import firebase from '../../services/firebase';
import Layout from '../../components/Layout';
import ArticleCard from '../../components/ArticleCard';
import * as articleData from './articles.json';
import * as cityData from './cities.json';
import newsapi from '../../services/newsapi';
import { Multiselect } from 'multiselect-react-dropdown';

import DisplayGoogleMap from './Map';
import axios from 'axios';

// let articleData = newsapi.getJSON('Austin');
const API_KEY = '&apiKey=7c4715d11f804f72a35100812d5e0c38';

const url = 'https://newsapi.org/v2/everything?';

// const centerZoom = {
// 	'New York City': {
// 		lat: 40.712776,
// 		lng: -74.005974,
// 		zoom: 9
// 	},
// 	'Los Angeles': {
// 		lat: 34.052235,
// 		lng: -118.243683,
// 		zoom: 9
// 	}
// // };
// console.log(cityData);
// console.log(cityData.default);

const centerZoom = cityData.default;

var keys = [];
for (var k in centerZoom) keys.push(k);

const Home = ({ history }) => {
	const [selectedArticle, setSelectArticle] = useState();
	const [articles, setArticles] = useState([]);
	const [city, setCity] = useState('New York City');
	const [center, setCenter] = useState({ lat: 40.712776, lng: -74.005974 });
	const [zoom, setZoom] = useState(10);
	const [categories, setCategories] = useState([]);

	const categoryChoices = [
		'business',
		'entertainment',
		'general',
		'health',
		'science',
		'sports',
		'technology'
	];

	useEffect(() => setArticles(articleData.articles.splice(0, 10)), []);
	useEffect(() => {
		axios
			.get(`${url}q=${city}&sortBy=popularity${API_KEY}`)
			.then(res => {
				setArticles(res.data.articles);
			})
			.catch(err => console.log(err));
	}, [city]);
	useEffect(() => {
		if (categories.length > 0) {
			axios
				.get(`${url}q=${city}+${categories[0]}&sortBy=popularity${API_KEY}`)
				.then(res => {
					setArticles(res.data.articles);
				})
				.catch(err => console.log(err));
		} else {
			axios
				.get(`${url}q=${city}&sortBy=popularity${API_KEY}`)
				.then(res => {
					setArticles(res.data.articles);
				})
				.catch(err => console.log(err));
		}
	}, [categories]); // eslint-disable-line react-hooks/exhaustive-deps

	function onAddCategory(selectedList, selectedItem) {
		setCategories([...categories, selectedItem]);
	}

	const onRemoveCategory = (selectedList, removedItem) => {
		var categoriesClone = [...categories];
		const index = categoriesClone.indexOf(removedItem);
		categoriesClone.splice(index, 1);
		setCategories(categoriesClone);
	};

	function onAddCity(selectedList, selectedItem) {
		setCity(selectedItem);
		console.log(selectedItem);
		console.log(cityData.default[city]);
		if (cityData.default[city]) {
			setCenter({lat: cityData.default[city].lat, lng: cityData.default[city].lng});
		}
		
		console.log(city);
	}

	const onRemoveCity = (selectedList, removedItem) => {
		
	};

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
			fontSize: '0.9rem'
		}
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
			lat: centerZoom[city].lat,
			lng: centerZoom[city].lng
		});
		setZoom(centerZoom[city].zoom);
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
				<Row className="mr-3 ml-3">
					<Col sm={1} style={{ padding: '0' }}>
						<div className="dropdown ml-2">
							<button
								className="btn-sm btn-secondary dropdown-toggle"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								{city}
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
										onClick={() => newLocation(city)}
									>
										{city}
									</div>
								))}
							</div>
						</div>
									
						<Multiselect
							options={Object.keys(cityData.default)}
							isObject={false}
							// singleSelect
							// options={categoryChoices} // Options to display in the dropdown
							onSelect={onAddCity} // Function will trigger on select event
							onRemove={onRemoveCity} // Function will trigger on remove event
							placeholder="Select city:" // Property name to display in the dropdown options
							selectionLimit={1}
							style={selectStyle}
						/>

						<Multiselect
							options={categoryChoices}
							isObject={false}
							// options={categoryChoices} // Options to display in the dropdown
							onSelect={onAddCategory} // Function will trigger on select event
							onRemove={onRemoveCategory} // Function will trigger on remove event
							placeholder="Select topics:" // Property name to display in the dropdown options
							selectionLimit={7}
							style={selectStyle}
						/>
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
