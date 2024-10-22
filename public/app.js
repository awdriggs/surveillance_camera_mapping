console.log("frontend working bro");

//form data
let newSighting = {
  location: {},
  type: "",
  tags: [],
};


//listeners and such
let geoButton = document.querySelector('#get-geoid');

geoButton.addEventListener('click', () => {
  console.log('get geo location');
  getGeolocation()
    .then((location) => {

      //add to the sightings data obj
      newSighting.location =  {
        type: "Point",
        coordinates : [location.longitude, location.latitude]
      }

      // console.log('Latitude:', location.latitude);
      // console.log('Longitude:', location.longitude);
      console.log(newSighting);

      document.querySelector('#geoid').innerHTML = `latitude: ${location.latitude} longitude: ${location.longitude}`

      submitButton.disabled = false; //activate the submit button
    })
    .catch((error) => {
      console.error('Error getting geolocation:', error.message);
    });
});

//add tags
let addTag  = document.querySelector('#tag');
addTag.addEventListener('click', () => {
  let tag = document.querySelector('#tag-input');
  newSighting.tags.push(tag.value);
  document.querySelector('#tags').innerHTML += tag.value + " ";
  tag.value = ""
});

//push to the servre
let submitButton = document.querySelector('#push');
submitButton.disabled = true; //having to force this for some reason
submitButton.addEventListener('click', ()=> {

  //add type to data
  newSighting.type = document.querySelector('input[name="options"]:checked').value;

  console.log('push data', newSighting);
  //push to sever
  //clear form inputs
  document.querySelector('#tags').innerHTML = '';
  document.querySelector('#geoid').innerHTML = '';

  postData('/api/locations', newSighting)
    .then(responseData => {
      console.log('Response from server:', responseData);
      //render a new location
      displayLocation(responseData.location)

      submitButton.disabled = true; //having to force this for some reason

      //clear newSighting data
      newSighting = {
        location: {},
        type: "",
        tags: [],
      };    //clear
    })
    .catch(error => {
      console.error('Error:', error);
    });
})

//async api function
async function getAllLocations(url) {
  try {
    const response = await fetch(url); // Await the API response

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Await and parse the response as JSON
    return data; // Return the data
  } catch (error) {
    console.error('Error fetching data:', error); // Handle any errors
  }
}

async function getGeolocation() {
  // Create a promise that resolves with the user's geolocation
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    // Get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Resolve with the position (latitude and longitude)
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        // Reject the promise with the error
        reject(error);
      }
    );
  });
}

//push new location to mongodb
async function postData(url = '', data = {}) {
  try {
    // Send a POST request to the specified URL with the provided data
    const response = await fetch(url, {
      method: 'POST', // Specifies the HTTP method
      headers: {
        'Content-Type': 'application/json' // The content type is set to JSON
      },
      body: JSON.stringify(data) // Convert JavaScript object to a JSON string
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse and return the response JSON data
    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error during POST request:', error);
    throw error;
  }
}

// fetch all locations
const apiUrl = 'api/locations';
getAllLocations(apiUrl).then(data => {
  console.log(data); // Log the data to the console
  for(let d of data){
    displayLocation(d); //display each location
  }
});

// render all locations
function displayLocation(loc){
  console.log(loc);
  // debugger;

  let wrapper = document.createElement("article");

  let type = document.createElement("h3");
  type.innerHTML = loc.type;
  wrapper.append(type);

  let geolocation = document.createElement("p");
  geolocation.innerHTML = `latitude: ${loc.location.coordinates[1]} longitude: ${loc.location.coordinates[0]}`
  wrapper.append(geolocation);

  let tags = document.createElement("p");
  tags.innerHTML = loc.tags.join(", ")
  wrapper.append(tags);

  document.querySelector("#locations").append(wrapper);
}



