const express = require('express')

/* A package that allows to color the console.log() messages. */
const colors = require('colors')

/* middleware that allows cross-origin resource sharing. 
It enables a web application running at one origin (domain) to access
resources from a server at a different origin. This is useful when building APIs that will be
accessed by clients from different domains. */
const cors = require('cors')

/* Loading the environment variables from the .env file. */
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

/* Loading the file db.js from the folder config. */
const connectDB =require('./config/db')

/* The above code is setting the port to 5000 if the environment variable PORT is not set. */
const port = process.env.PORT || 5000


connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( {extended: false} ))

/* Loading the routes */
app.use('/api/tareas', require('./routes/tareasRoutes')) 
app.use('/api/users', require('./routes/userRoutes')) 

app.use(errorHandler)

app.listen(port, ()=> 
    console.log(`Server iniciado en el puerto ${port}`) 
)


