const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // referencia al esquema 
        required: true //Los datos se obtendran del token
    },
    // Definir los campos que va a tener la coleccion
    texto: { //nombre del campo
        type: String,
        required: [true, 'Por favor teclea una tarea']
    }
    }, {
        /* Adding a createdAt and updatedAt field to the schema. */
        timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)