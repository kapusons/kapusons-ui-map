
`kapusons-ui-map` is a Kapusons implementation of interactive maps through GeoJson data. It uses [Google Maps API](https://developers.google.com/maps/). It allows you to easily render polygons over a google map.   

## Features

### GeoJson data
`kapusons-ui-map` comes with two json libraries for italy regions and for all the world's states until 2015.

## Installation

### Setup development environment

```
git clone git@github.com:KapusonsSRL/kapusons-ui-map.git
npm install
bower install
gulp serve
```

### As a Bower package

```
bower install kapusons-ui-map --save
```

## Implementation
  * kapusons-ui-map.js file loads GeoJSON data consisting of polygon coordinates, markers (items), and supplmentary information.
  ```
  var configuration = {
  "dataSource": "json/regioni.json",
  "mapOptions": {
    "center": {lat: 41.913355, lng: 12.484130},
    "zoom": 6,
    "scrollwheel": false,
    "gestureHandling": 'cooperative',
    "mapTypeControlOptions": {
      "style": google.maps.MapTypeControlStyle.DEFAULT  
    }
  ```
  * Map canvas highlights the region and activates an informational window (map-tail) when the mouse coordinates are inside the region's polygon.
  * Clicking on a specific region opens an informational window that shows the GeoJSON items. Further clicking leads to another informational window.


### Heroku-Hosted Example Application
[Google Maps GeoJSON Implementation by Kapusons](https://kapusons-ui-map.herokuapp.com/)

## License

MIT (http://www.opensource.org/licenses/mit-license.php)

## To do list

* Improve mobile visualization
* Replace google maps infowindow component with a custom one
* Improve the configuration
* Improve the documentation
