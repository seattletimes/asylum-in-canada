// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
require("component-leaflet-map");

var $ = require("./lib/qsa");

//templates
var locationErbil = require("./_locationErbil.html");
var locationNewYork = require("./_locationNewYork.html");
var locationSeattle = require("./_locationSeattle.html");
var locationBlaine = require("./_locationBlaine.html");
var locationVancouver = require("./_locationVancouver.html");
var introTemplate = require("./_intro.html");

var pages = {
  0 : locationErbil,
  1 : locationNewYork,
  2 : locationSeattle,
  3 : locationBlaine,
  4 : locationVancouver,
  "first": introTemplate
};

// console.log(pages);

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

console.log(markers); // markers array

var gotoMarker = function() {
  map.flyTo(markers[index].marker.getLatLng());
};

gotoMarker();


//qsa for buttons
var beginButton = $.one(".begin");
var backButton = $.one(".back");
var nextButton = $.one(".next");

var sidebarContent = $.one(".next-location");

backButton.classList.add("hidden");
nextButton.classList.add("hidden");

beginButton.addEventListener("click", function(e) {
  gotoMarker(index);
  sidebarContent.innerHTML = pages[index];
  beginButton.classList.add("hidden");
  backButton.classList.remove("hidden");
  nextButton.classList.remove("hidden");
});

backButton.addEventListener("click", function(e) {
  if (index > 0) {
    index = index- 1;
    gotoMarker(index);
    sidebarContent.innerHTML = pages[index];
  }

  if (index < 5) {
    nextButton.classList.remove("hidden");
  }

  if (index === 0) {
    sidebarContent.innerHTML = pages["first"];
    beginButton.classList.remove("hidden");
    backButton.classList.add("hidden");
    nextButton.classList.add("hidden");
  }
});

nextButton.addEventListener("click", function(e) {
  if (index < 4) {
    index = index+ 1;
    gotoMarker(index);
    sidebarContent.innerHTML = pages[index];
  }

  if (index === 4) {
    nextButton.classList.add("hidden");
  }

  // drawLine(markers[index], markers[index + 1]);
});



var prevCoords;


//line
var drawLine = function(location1, location2) {
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


