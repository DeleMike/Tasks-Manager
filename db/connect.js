const mongoose = require('mongoose')

/**
 * Connect to database
 */ 
const connectDB = (url) => {
   return mongoose.connect(url, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }),
   ()=> console.log('Connected to db!');
 }
 
 module.exports = connectDB