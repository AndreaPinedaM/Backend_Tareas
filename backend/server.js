const express = require('express')

/* A package that allows to color the console.log() messages. */
const colors = require('colors')

/* Loading the environment variables from the .env file. */
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

/* Loading the file db.js from the folder config. */
const connectDB =require('./config/db')

/* The above code is setting the port to 5000 if the environment variable PORT is not set. */
const port = process.env.PORT || 5000


connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded( {extended: false} ))

/* Loading the routes */
app.use('/api/tareas', require('./routes/tareasRoutes')) 
app.use('/api/users', require('./routes/userRoutes')) 

app.use(errorHandler)

app.listen(port, ()=> 
    console.log(`Server iniciado en el puerto ${port}`) 
)


