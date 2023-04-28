/* `const mongoose = require('mongoose')` is importing the Mongoose library, which is a popular Object
Data Modeling (ODM) library for MongoDB and Node.js. It allows developers to define schemas for
their data and provides a simple API for interacting with MongoDB databases. */
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    // Definir los campos que va a tener la coleccion
    name: { //nombre del campo
        type: String,
        required: [true, 'Por favor ingresa un nombre']
    },
    email: { //nombre del campo
        type: String,
        required: [true, 'Por favor ingresa un email'],
        unique: true  //el email debe ser único, no debe existir dos registros con el mismo
    },
    password: { //nombre del campo
        type: String,
        required: [true, 'Por favor ingresa una contraseña']
    }
    }, {
        /* Adding a createdAt and updatedAt field to the schema. */
        timestamps: true
})

module.exports = mongoose.model('User', userSchema)