import React from 'react';
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker
} from 'react-google-maps';

import mapStyles from './mapStyles';
import * as pointData from './locations.json';

const Map = ({ center, zoom }) => (
	<GoogleMap
		defaultZoom={12}
		defaultCenter={{ lat: 40.754954, lng: -73.995338 }}
		defaultOptions={{ styles: mapStyles }}
		center={center}
		zoom={zoom}
	>
		{pointData.spots.map(spot => (
			<Marker key={spot.id} position={{ lat: spot.lat, lng: spot.lng }} />
		))}
	</GoogleMap>
);

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
