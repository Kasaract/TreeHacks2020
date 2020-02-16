import React from 'react';
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker
} from 'react-google-maps';

import mapStyles from './mapStyles';
import * as pointData from './locations.json';

const Map = ({ center, zoom, articlesLength }) => {
	var fillerArray = new Array(articlesLength);
	return (
		<GoogleMap
			defaultZoom={4}
			defaultCenter={{ lat: 38, lng: -95.712891 }}
			defaultOptions={{ styles: mapStyles }}
			center={center}
			zoom={zoom}
		>
			{fillerArray.map(num => (
				<Marker key={num} position={center} />
			))}
		</GoogleMap>
	);
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const DisplayGoogleMap = ({ center, zoom }) => (
	<div style={{ width: '85vw', height: '50vh' }}>
		<WrappedMap
			googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${'AIzaSyC3LxcAOwU1ooKUK4gIwGx91LVuKD3k_0g'}`}
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `100%` }} />}
			mapElement={<div style={{ height: `100%` }} />}
			center={center}
			zoom={zoom}
		/>
	</div>
);

export default DisplayGoogleMap;
