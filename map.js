// JavaScript Document
var map;
var graphic;
var currLocation;
var watchId;
var graphicsArray = [];

var long;
var lat;

long = "-73.5673";
lat = "45.5017";

//if(!!navigator.geolocation) {
//navigator.geolocation;
//var pos = navigator.geolocation.getCurrentPosition();
//long = pos.longitude;
//lat = pos.latitude;
//}
//else {
//	long = "-73.5673";
//	lat = "45.5017";
//}


    require([
      "esri/map", 
      "esri/dijit/LocateButton",
      "esri/geometry/Point", 
        "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/graphic", "esri/Color", "dojo/domReady!",
		//Geometry Modules
  "esri/geometry/Geometry",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",
 
  //Graphic & Style Modules
  "esri/graphic",
  "esri/symbols/SimpleFillSymbol",
  "esri/InfoTemplate",
 
  "dojo/domReady!",
  "esri/geometry" 
    ], function(
      Map, LocateButton, Point,
        SimpleMarkerSymbol, SimpleLineSymbol,
        Graphic, Color, //Geometry Hooks
    Geometry,
    Polyline, 
    Polygon,
 
    //Graphic & Style Hooks
    SimpleFillSymbol,
    InfoTemplate
    )  {

      map = new Map("map", {
        center: [long, lat],
        zoom: 12,
        basemap: "streets"
      });
      
	  map.on("load", initFunc);
	        
      geoLocate = new LocateButton({
        map: map
      }, "LocateButton");
      geoLocate.startup();

	function orientationChanged() {
          if(map){
            map.reposition();
            map.resize();
          }
        }

        function initFunc(map) {
          if( navigator.geolocation ) {  
            navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
            //watchId = navigator.geolocation.watchPosition(showLocation, locationError); //Turns off watchPosition when commented
          } else {
            alert("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
          }
        }

        function locationError(error) {
          //error occurred so stop watchPosition
          if( navigator.geolocation ) {
            navigator.geolocation.clearWatch(watchId);
          }
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location not provided");
              break;

            case error.POSITION_UNAVAILABLE:
              alert("Current location not available");
              break;

            case error.TIMEOUT:
              alert("Timeout");
              break;

            default:
              alert("unknown error");
              break;
          }
        }

        function zoomToLocation(location) {
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          addGraphic(pt);
          map.centerAndZoom(pt, 15);
        }
	    
		
		
		
        function showLocation(location) {
          //zoom to the users location and add a graphic
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          if ( !graphic ) {
            addGraphic(pt);
          } else { // move the graphic if it already exists
            graphic.setGeometry(pt);
          }
          map.centerAt(pt);
        }
        
        function addGraphic(pt){
          var symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE, 
            12, 
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID,
              new Color([210, 105, 30, 0.5]), 
              8
            ), 
            new Color([210, 105, 30, 0.9])
          );
          graphic = new Graphic(pt, symbol);
          map.graphics.add(graphic);
        }
      });

function findClosest() {
	alert("No Locations loaded!");
}


function addPoint() {
          
		  var newPoint = new esri.geometry.Point(-73.5524, 45.5049);
          alert("something happened");
		  	  
        }