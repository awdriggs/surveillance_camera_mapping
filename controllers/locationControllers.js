import Location from '../models/Location.js';

// Ctonroller for posting a new location
export const addLocation = async (req, res) => {
  console.log("adding a location");
  console.log(req.body);
  try {
    console.log("trying");
    const { type, location, tags } = req.body; //destructuring

    // Create a new user
    const newLocation = new Location({ type, location, tags});
    await newLocation.save();

    res.status(201).json({
      message: 'User created successfully',
      location: newLocation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
};

// Controller for getting all locations 
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find(); // Fetch all users from the database
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching locations',
      error: error.message,
    });
  }
};
 
//Controller for getting locations by type 
