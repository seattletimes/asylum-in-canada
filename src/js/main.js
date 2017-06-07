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
  // marker.bindPopup(m.place);
});


var gotoMarker = function(i, zoom = 7) {
  map.flyTo(markers[i].marker.getLatLng(), zoom);
};

gotoMarker(0, 3);

//qsa for buttons
var beginButton = $.one(".begin");
var backButton = $.one(".back");
var nextButton = $.one(".next");

var sidebar = $.one(".sidebar");
var sidebarContent = $.one(".next-location");
var sidebarPlace = $.one(".place");

// console.log(markers);

var onClickButton = function(e) {
  var change = e.target.classList.contains("next") ? 1 : -1;
  index += change;
  if (index >= markers.length) index = markers.length - 1;
  if (index < 0) index = 0;

  if (markers[index].zoom) {
    gotoMarker(index, markers[index].zoom)
  } else {
    gotoMarker(index);
  }
  sidebarPlace.innerHTML = markers[index].place;
  sidebarContent.innerHTML = markers[index].description;
  sidebar.setAttribute("data-index", index);
};

backButton.addEventListener("click", onClickButton);
nextButton.addEventListener("click", onClickButton);

// var bounds = [[51.4594161, -129.9099509], [49.386911, 29.313132]];
// map.fitBounds(bounds);

