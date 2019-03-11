
// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap, streetLightMap;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 42.361, lng: -71.057},
   //mapTypeIds: google.maps.MapTypeId.SATELLITE
   //mapTypeControlStyle: { style: DEFAULT},
  // mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP]},
   mapTypeControl : false
   //disableDefaultUI: true
  // mapTypeControlStyle: {style: DROPDOWN_MENU}

  });


  heatmap = new google.maps.visualization.HeatmapLayer({
      data: getPoints(crimes),
      map: map
    });


  var marker, i;


for (i = 0; i < lights.length; i++) {
marker = new google.maps.Marker({
position: new google.maps.LatLng(lights[i], lights[i+1]),
      map: map,
      icon: 'pixel.png',
});

google.maps.event.addListener(marker, 'click', (function (marker, i) {
return function () {
	infowindow.setContent(locations[i][0]);
	infowindow.open(map, marker);
}
})(marker, i));
}


   // Add a style-selector control to the map.
   var styleControl = document.getElementById('style-selector-control');
   map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);

   // Set the map's style to the initial value of the selector.
   var styleSelector = document.getElementById('style-selector');
   map.setOptions({styles: styles[styleSelector.value]});

   // Apply new JSON when the user selects a different style.
   styleSelector.addEventListener('change', function() {
     map.setOptions({styles: styles[styleSelector.value]});
   });




}


function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 500 Points
// Heatmap data: 500 Points


var test = [37.759732, -122.406484,37.758910, -122.406228,37.758182, -122.405695,37.757676, -122.405118,37.757039, -122.404346,37.756335, -122.403719,37.755503, -122.403406,37.754665, -122.403242,37.753837, -122.403172,37.752986, -122.403112,37.751266, -122.403355];
var newa = [];
var newb = [];

function getPoints(arrayInput) {
  for (var i = 0; i < arrayInput.length; i = i + 2) {
       var thing =  new google.maps.LatLng(arrayInput[i], arrayInput[i+1]);
       newa.push(thing);
  }
  return newa;
}

function plotPoints(arrayInput) {

  for (var i = 0; i < arrayInput.length; i = i + 2) {
        var thing = new google.maps.LatLng(arrayInput[i], arrayInput[i+1]);
        newb.push(thing);
  }
  return newb;
}

// Styles
var styles = {
  default: null,

  retro: [
    {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{color: '#c9b2a6'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'geometry.stroke',
      stylers: [{color: '#dcd2be'}]
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [{color: '#ae9e90'}]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#93817c'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{color: '#a5b076'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#447530'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#f5f1e6'}]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: '#fdfcf8'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#f8c967'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#e9bc62'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{color: '#e98d58'}]
    },
    {
      featureType: 'road.highway.controlled_access',
      elementType: 'geometry.stroke',
      stylers: [{color: '#db8555'}]
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [{color: '#806b63'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.fill',
      stylers: [{color: '#8f7d77'}]
    },
    {
      featureType: 'transit.line',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#ebe3cd'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [{color: '#dfd2ae'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{color: '#b9d3c2'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#92998d'}]
    },
    {heatmap: {
      enabled: true
    }}
  ],
  huskymode: [
      {elementType: 'geometry', stylers: [{color: '#ff0000'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#000000'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#000000'}]},
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{color: '#808080'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#000000'}]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#808080'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#000000'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#000000'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{color: '#808080'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#808080'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{color: '#808080'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#000000'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{color: '#000000'}]
      },
      {
          featureType: 'transit.line',
          elementType: 'labels.icon',
          icon: 'husky.png'
        },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#808080'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{color: '#ff0000'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        icon: 'husky.png',
        stylers: [{color: '#000000'}]
      },
      {
          featureType: 'all',
          elementType: 'all',
          icon: 'husky.png'
        },
        {
          parking: {
            icon: 'husky.png'
          },
          library: {
            icon: 'husky.png'
          },
          info: {
            icon: 'husky.png'
          }
        },
      {heatmap: {
        enabled: true
      }}
    ],
  hiding: [
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [{visibility: 'off'}]
    }

  ]
};
