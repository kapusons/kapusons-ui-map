var configuration = {
	"dataSource": "json/world.subset.json", 
	"showLeftColumn": false,
	"mapOptions": {
		"center": {
			lat: 38.513456, lng: 44.523900
		},
		"zoom": 4,
		"scrollwheel": false,
		"gestureHandling": 'cooperative',
    	"mapTypeControlOptions": {
	    	"style": google.maps.MapTypeControlStyle.DEFAULT  
		},
		"styles": [
		    {
		    	"featureType": "all",
		    	"elementType": "labels",
		    	"stylers": [
		    		{ "visibility": "off" }
		    	]
		    }
		]
	},
	"styles": {
		"feature": {
			"fillColor": "#3367D6",
			"fillColorSelected": "#4285F4",
			"strokeWeight": 0.8,
			"strokeColor": '#ffffff',
			"fillOpacity": 1
		}
	}
}