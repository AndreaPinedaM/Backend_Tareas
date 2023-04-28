const asyncHandler = require ('express-async-handler')
//importar el modelo 
const Tarea = require('../models/tareaModel')

const getTareas = asyncHandler(async(req, res) =>{

    const tareas = await Tarea.find({user: req.user.id})

    res.status(200).json(tareas)
})

const setTareas = asyncHandler(async(req, res) =>{

    if(!req.body.texto){
        // res.status(400).json({mensaje: 'Favor de teclear la descripción de la tarea'})
        res.status(400)
        throw new Error('Favor de teclear una descripción para la tarea')
    }

    const tarea = await Tarea.create({
        //el valor de texto será la información que se encuentre en el campo nombre (input)
        texto: req.body.texto,
        //Determina el ususario que crea la tarea
        user: req.user.id
    })

    res.status(201).json(tarea)
})

const updateTareas = asyncHandler(async(req, res) =>{

    const tarea = await Tarea.findById(req.params.id)

    //Verificamos que la tarea exista
    if(!tarea){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    //Verificamos que la tarea partenece al usuario del token
    if(tarea.user.toString() != req.user.id){
        res.status(401)
        throw new Error ('Acceso no autorizado. El usuario y token no coinciden')
    }

    const tareaModificada = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(tareaModificada)
})

const deleteTareas = asyncHandler(async(req, res) =>{
    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw new Error('Tarea no encontrada')
    }

    //Verificamos que la tarea partenece al usuario del token
    if(tarea.user.toString() != req.user.id){
        res.status(401)
        throw new Error ('Acceso no autorizado. El usuario y token no coinciden')
    }

    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id)

    res.status(200).json({
        id: req.params.id
    })
})


module.exports ={
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}

