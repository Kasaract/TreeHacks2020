import React from 'react';
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker
} from 'react-google-maps';

import mapStyles from './mapStyles';
import * as pointData from './locations.json';

const Map = () => (
	<GoogleMap
		defaultZoom={10}
		defaultCenter={{ lat: 40.712776, lng: -74.005974 }}
		defaultOptions={{ styles: mapStyles }}
	>
		{pointData.spots.map(spot => (
			<Marker key={spot.id} position={{ lat: spot.lat, lng: spot.lng }} />
		))}
	</GoogleMap>
);

const WrappedMap = withScriptjs(withGoogleMap(Map));

const DisplayGoogleMap = () => (
	<div style={{ width: '100vw', height: '100vh' }}>
		<WrappedMap
			googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${'AIzaSyC3LxcAOwU1ooKUK4gIwGx91LVuKD3k_0g'}`}
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `100%` }} />}
			mapElement={<div style={{ height: `100%` }} />}
		/>
	</div>
);

export default DisplayGoogleMap;