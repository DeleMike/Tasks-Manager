require('dotenv').config()
require('express-async-errors');

const path = require('path');
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const connectDb = require('./db/connect')

// app routes
const authRoute = require('./routes/auth')
const tasksRoute = require('./routes/tasks')
const verifyRoute = require('./routes/verify-user')
const resetPasswordRoute = require('./routes/reset-password') 

const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const port = process.env.PORT || 5000

app.use(cookieParser(process.env.TOKEN_SECRET));

// middleware
app.use(express.static('./public'))
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(verifyRoute)
app.use(resetPasswordRoute)
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