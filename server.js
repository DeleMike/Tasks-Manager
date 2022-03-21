require('dotenv').config()
require('express-async-errors');

const path = require('path');
const express = require('express')
const app = express()
const cors = require('cors')

const connectDb = require('./db/connect')

// app routes
const authRoute = require('./routes/auth')
const tasksRoute = require('./routes/tasks')

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const port = process.env.PORT || 5000

// middleware
app.use(express.static('./public'))
app.use('/verify-user', express.static('public\\verify-user.html'))
app.use(express.json())


app.use('/api/auth', authRoute)
app.use('/api/tasks', tasksRoute)



app.use(notFound)
app.use(errorHandler)

app.use(cors())

//connect to db then run server
const start = () => {
   try {
      //connect db
      connectDb(process.env.MONGO_URI)
      app.listen(port, () => console.log(`server running on http://localhost:${port}`))
   } catch (error) {
      console.log('Error happened while connecting to database: ' + error);
   }
}

start()