// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap, polygons;
//import { crime } from './crimes.js'
//crimes.js var crime;

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 42.361145, lng: -71.057083},
    mapTypeControl : false
  });

  polygons = [];
  windows = {};

  for (var geocode in window.cells) (function (geocode){
    var cell = window.cells[geocode];
    var centerlat = cell[0];
    var centerlon = cell[1];
    var errorlat = cell[2];
    var errorlon = cell[3];
    var numcrimes = cell[4];
    var lamps = cell[5];
    var max = cell[6];
    var min = cell[7];
    var mediandist = cell[8];
    var coords = [{lat: centerlat + errorlat, lng: centerlon + errorlon},
                  {lat: centerlat - errorlat, lng: centerlon + errorlon},
                  {lat: centerlat - errorlat, lng: centerlon - errorlon},
                  {lat: centerlat + errorlat, lng: centerlon - errorlon},
                  {lat: centerlat + errorlat, lng: centerlon + errorlon},];



    var polygon = new google.maps.Polygon({
      paths: coords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.05,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: Math.min(1, mediandist / 150),
      map: map,
      lamps: lamps,
      medians: mediandist,
      numcrimes: numcrimes,
      geocode: geocode,
    });

    var infowindow;
    if (numcrimes >= 1) {
      infowindow = new google.maps.InfoWindow({
        content: "This region has the following properties:" +
                 "<ul><li>Approximately " + numcrimes + " crimes have occured in the past 3 years. </li>" +
                 "<li>There are " + lamps + " registered street lamps in this area. </li>" +
                 "<li>The median distance from a streetlamp to any one crime was about "  + mediandist + "meters. </li>" +
                 "<li>In the worst case, a crime occured approximately " + max + " meters from a streetlamp. </li>" +
                 "<li>The closest a crime got to a street lamp was approximately " + min + " meters from a lamp.</li></ul>",
      });
    }
    else {
      infowindow = new google.maps.InfoWindow({
        content: "This region has the following properties:" +
                 "<ul><li>Approximately no crimes have occured here.</li>" +
                 "<li>There are " + lamps + " registered street lamps in this area.</li></ul>",
      });
    }

    windows[geocode] = infowindow;

    polygon.addListener('rightclick', function(event) {
      var win = windows[polygon.geocode];
      win.setPosition(event.latLng);
      win.open(map);
    });

    polygons.push(polygon);
    //polygon.setPaths(coords);
    /*marker = new google.maps.Marker({
    position: new google.maps.LatLng(centerlat,centerlon),
    map: map,
    logo: 'logo.png',
  });*/
})(geocode);

  /*heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(window.crimes),
    map: map
  });*/

}

function toggleCells() {
  for (var i = 0; i < polygons.length; i++) {
    var polygon = polygons[i];
    polygon.setVisible(polygon.getVisible() ? false : true);
  }
}

function recomputeOpacity() {
  for (var i = 0; i < polygons.length; i++) {
    var polygon = polygons[i];
    var opacity;
    if (document.getElementById("crime").checked) {
      opacity = Math.min(1, polygon.numcrimes / 1500);
    }
    else if (document.getElementById("lamp").checked) {
      opacity = Math.min(1, polygon.lamps / 120);
    }
    else {
      opacity = Math.min(1, polygon.medians / 150);
    }

    polygon.setOptions({
        fillOpacity: opacity,
    });
  }
}
