import React, { useEffect } from 'react';
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker,
	InfoWindow
} from 'react-google-maps';

import mapStyles from './mapStyles';
import * as pointData from './locations.json';
import { Card } from 'react-bootstrap';

const Map = ({
	center,
	zoom,
	articles,
	selectedArticle,
	onChangeSelectedArticle
}) => {
	useEffect(() => {
		const listener = e => {
			if (e.key === 'Escape') {
				onChangeSelectedArticle(null);
			}
		};
		window.addEventListener('keydown', listener);

		return () => {
			window.removeEventListener('keydown', listener);
		};
	}, [onChangeSelectedArticle]);

	return (
		<GoogleMap
			defaultZoom={4}
			defaultCenter={{ lat: 38, lng: -95.712891 }}
			defaultOptions={{ styles: mapStyles }}
			center={center}
			zoom={zoom}
		>
			{articles.map(article => (
				<Marker key={article.publishedAt} position={center} />
			))}

			{!!selectedArticle && (
				<InfoWindow
					onCloseClick={() => {
						onChangeSelectedArticle(null);
					}}
					position={center}
				>
					{/* <Card>
				<h2>{selectedArticle.title}</h2>
				<p>{selectedArticle.description}</p>
			</Card> */}

					<Card
						className="my-3 mx-1"
						style={{ width: '16rem', overflow: 'hidden', borderRadius: '1rem' }}
					>
						<a
							href={selectedArticle.url}
							target="_blank"
							rel="noreferrer noopener"
						>
							<Card.Img variant="top" src={selectedArticle.urlToImage} />
						</a>
						<Card.Body className="p-2">
							<a
								href={selectedArticle.url}
								target="_blank"
								rel="noreferrer noopener"
							>
								<Card.Title style={{ fontSize: '1.05rem' }}>
									{selectedArticle.title}
								</Card.Title>
							</a>
							<Card.Text style={{ fontSize: '0.85rem' }}>
								{selectedArticle.description}
							</Card.Text>
						</Card.Body>
					</Card>
				</InfoWindow>
			)}
		</GoogleMap>
	);
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const DisplayGoogleMap = ({
	center,
	zoom,
	articles,
	selectedArticle,
	onChangeSelectedArticle
}) => (
	<div style={{ width: '85vw', height: '50vh' }}>
		<WrappedMap
			googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${'AIzaSyC3LxcAOwU1ooKUK4gIwGx91LVuKD3k_0g'}`}
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `100%` }} />}
			mapElement={<div style={{ height: `100%` }} />}
			center={center}
			zoom={zoom}
			articles={articles}
			selectedArticle={selectedArticle}
			onChangeSelectedArticle={onChangeSelectedArticle}
		/>
	</div>
);

export default DisplayGoogleMap;
