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
app.use(express.json())

app.get('/verify-user', (req, res) => {
   res.send(`
   
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify your email</title>
      <style>
         body {
            background-color: rgb(238, 229, 229);
            height: 100%;
         }
   
         #info {
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
         }
      </style>
   </head>
   
   <body>
      <div id="info">
         <button id="post-btn" title="Verify Email" type="submit">Verify Email</button>
   
         <h2 id="result"></h2>
      </div>
   
   </body>
   <script>
      button = document.getElementById('post-btn')
      h2 = document.getElementById('result')
      button.addEventListener('click', async _ => {
         let urlString = window.location.href;
         let paramString = urlString.split('?')[1];
         let params_arr = paramString.split('&');
   
         let data = {
            verificationToken: '',
            email: ''
         }
   
         for (let i = 0; i < params_arr.length; i++) {
            let pair = params_arr[i].split('=');
            // console.log("Key is:", pair[0]);
            // console.log("Value is:", pair[1]);
   
            if (pair[0] == 'verificationToken') {
               data['verificationToken'] = pair[1]
            } else if (pair[0] == 'email') {
               data['email'] = pair[1]
            }
   
            // console.log('Data gotten  = : ', data);
         }
         try {
            fetch("/api/auth/verify-email", {
               method: "POST",
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
            }).then(res => {
               h2.textContent = "Email is verified";
               // console.log("Request complete! response:", res.json());
            });
         } catch (error) {
            console.log(error);
         }
   
      });
   </script>
   
   </html>
   `)
})

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