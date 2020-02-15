export default [
	{
		featureType: 'all',
		stylers: [{ color: '#d6d6d6' }]
	},
	{
		featureType: 'water',
		stylers: [{ color: '#FFFFFF' }]
	},
	{
		featureType: 'administrative.country',
		stylers: [{ color: '#FFFFFF' }]
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text',
		stylers: [{ color: '#9c9c9c' }]
	},
	{
		featureType: 'administrative.country',
		elementType: 'labels.text.stroke',
		stylers: [{ visibility: 'off' }]
	},
	{
		featureType: 'administrative.province',
		elementType: 'labels.text',
		stylers: [{ color: '#bdbdbd' }]
	},
	{
		featureType: 'administrative.province',
		elementType: 'labels.text.stroke',
		stylers: [{ visibility: 'off' }]
	},
	{
		featureType: 'administrative.province',
		elementType: 'geometry.stroke',
		stylers: [{ color: '#FFFFFF' }]
	},
	{
		featureType: 'poi',
		stylers: [{ visibility: 'off' }]
	},
	{
		featureType: 'transit',
		stylers: [{ visibility: 'off' }]
	}
];
