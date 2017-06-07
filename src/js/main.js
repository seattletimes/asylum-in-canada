// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("component-leaflet-map");

var $ = require("./lib/qsa");

var index = 0;

var mapElement = $.one("leaflet-map");
var map = mapElement.map;
var L = mapElement.leaflet;

window.markers.forEach(function(m, i) {
  var marker = L.marker([m.lat, m.lng], {
    icon: L.divIcon({className: "locationMarker"})
  });

  marker.data = m;
  m.marker = marker;

  marker.addTo(map);
  marker.bindPopup(m.name);
});

var gotoMarker = function() {
  map.flyTo(markers[index].marker.getLatLng());
};

gotoMarker();


//qsa for buttons
var backButton = $.one(".back");
var nextButton = $.one(".next");




//line
var drawLine = function(location1, location2, region) {
  var segments = 30;

  var pointList = [];

  var x1 = location1[1] * 1;
  var y1 = location1[0] * 1;
  var x2 = location2[1] * 1;
  var y2 = location2[0] * 1;

  var dx = (x1 - x2) / segments;
  var dy = (y1 - y2) / segments;
  var length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

  for (var i = 0; i < segments + 1; i++) { 
    if (dx < 0) {
      var lat = y1 - (dy * i) + Math.sin(Math.PI / segments * i) * length * 5;
      var lng = x1 - (dx * i) + Math.sin(Math.PI / segments * i) * length * 5;
    } else {
      var lat = y1 - (dy * i) - Math.sin(Math.PI / segments * i) * length * 5;
      var lng = x1 - (dx * i) - Math.sin(Math.PI / segments * i) * length * 5;
    }

    var coords = new L.LatLng(lat, lng);
    var prevLat;
    var prevLng;

    pointList.push(coords);
  }

  var polyline = new L.Polyline(pointList, {
    color: "#888",
    weight: 3,
    opacity: .8
  });

  return polyline;
};


