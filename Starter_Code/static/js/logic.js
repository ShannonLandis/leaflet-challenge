// Creating the map object
let myMap = L.map("map", {
  center: [40.0000, -20.0000],
  zoom: 2.5
});


  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


  
// Store our API endpoint as url.
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";


d3.json(url).then(function(response) {
  
  console.log(response); // this tells it to display the data in the console in inspect
  features = response.features;

  // Define a markerSize() function that will give each city a different radius based on the earthquake magnitude.
  function markerSize(mag) {
    return mag * 25000;
  }


  // The function that will determine the color of a marker based on the depth of the earthquake
  function depthColor(depth) {
    if (depth < 1) return "GreenYellow";
    else if (depth < 8) return "Green";
    else if (depth < 12) return "CornflowerBlue";
    else if (depth < 18) return "Gold";
    else if (depth < 25) return "DarkOrange";
    else if (depth < 50) return "Red";
    else return "white";
  }



  // set marker limit to length of features in data
  let marker_limit = features.length;


  for (let i = 0; i < marker_limit; i++) {

    let location = features[i].geometry;
    let properties = features[i].properties
    let id = features[i].id;

    
    if(location){
      L.circle([location.coordinates[1], location.coordinates[0]],
      {
        radius:  markerSize(properties.mag),
        color:  depthColor(location.coordinates[2]),
        fillcolor:  depthColor(location.coordinates[2]),
        fillopacity: 0.0,
      }).bindPopup(`<h2>Magnitude: ${properties.mag} -  Depth:  ${location.coordinates[2]}</h2> <hr> <h3>ID: ${id}</h3> <hr> <h3>Place: ${properties.place.toLocaleString()}</h3>`).addTo(myMap);
      //radius: markerSize(d3[i].mag)
      //.bindPopup(`<h2>${properties.mag}</h2> <hr> <h3>Population: ${location.id.toLocaleString()} Place: ${properties.place.toLocaleString()}</h3> `)
  }

  }

  function depthColor(depth) {
    if (depth < 1) return "GreenYellow";
    else if (depth < 8) return "Green";
    else if (depth < 12) return "CornflowerBlue";
    else if (depth < 18) return "Gold";
    else if (depth < 25) return "DarkOrange";
    else if (depth < 50) return "Red";
    else return "white";
  }




});



