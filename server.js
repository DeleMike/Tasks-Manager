require('dotenv').config()

const express = require('express')
const app = express()

const connectDb = require('./db/connect')

// app routes
const authRoute = require('./routes/auth')

const port = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use('/api/user', authRoute)

//connect to db then run server
const start = () => {
   try {
      //connect db
      connectDb(process.env.MONGO_URI)
      app.listen(port, () => console.log(`server running on http://localhost:${port}`))
   } catch (error) {
      console.log('Error happened while connecting to database: '+ error);
   } 
}

start()