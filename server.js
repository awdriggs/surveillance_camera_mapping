

// Secrets
import dotenv from 'dotenv';
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// DB Bizness
import mongoose from 'mongoose';
import Location from './model/Location.js';

mongoose.connect(`mongodb+srv://${username}:${password}@undersurveillancedata.6wo4x.mongodb.net/?retryWrites=true&w=majority&appName=underSurveillanceData`);

//Test data for the DB
// const loc = new Location({

//   type: 'doorbell',

//   location: {
//     type: "Point",
//     coordinates : [4.88776136323474, 52.351874359231466]
//   },

//   tags: ['private', 'ring'],

// });

// // Insert the article in our MongoDB database

// await loc.save();

// // Find a single location 

// const locationTest = await Location.findOne({});
// console.log(locationTest);

 


