/* `const asyncHandler = require ('express-async-handler')` is importing the `express-async-handler`
package, which is a utility function that simplifies error handling in asynchronous Express
middleware. It allows you to catch errors and forward them to Express's default error handler
without having to write try-catch blocks or call `next(err)` manually. */
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//importar el modelo 
const User = require('../models/userModel')

const loginUser = asyncHandler(async(req, res) =>{
    //Desestructurar la info. del body request
    const {email, password} = req.body

    if(!email || !password){
        res.status(400)
        throw new Error('Favor de llenar los datos requeridos')
    }

    //Verificar que el usuario exista
    const user = await User.findOne({email})

    //Comparar el hash del password y el usuario
    if(user && (await bcrypt.compare(password, user.password))){ //Compara el string que recibo en el body vs el password hasheado
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Credenciales Incorrectas')
    }
})

const registerUser = asyncHandler(async(req, res) =>{
    //Desestructurar el body request
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Favor de verificar que esten completos los datos')
    }

    //Verificamos que el email sea único
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('Ese email ya fue registrado')
    }

    //Hash al password con sal
    const salt = await bcrypt.genSalt(10) //10 rondas para generar la sal
    const hashedPassword = await bcrypt.hash(password, salt)

    //Crear usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error("No se pudo crear el usuario, datos incorrectos")
    }
})

const getMyData = asyncHandler(async(req, res) =>{

    // res.json({message: 'Mis datos'})
    res.json(req.user)
})

const updateUser = asyncHandler(async(req, res) =>{
    res.status(200).json({
        "mensaje" : `Modificar/actualizar el usuario ${req.params.id}`
    })
})

const deleteUser = asyncHandler(async(req, res) =>{
    res.status(200).json({
        "mensaje" : `Eliminar usuario ${req.params.id}`
    })
})

/**
 * This function generates a JSON Web Token (JWT) with a given ID and a 30-day expiration time using a
 * secret key stored in an environment variable.
 * @param id - The `id` parameter is the unique identifier of the user for whom the token is being
 * generated. This identifier is typically used to retrieve user information from a database or other
 * data source.
 * @returns The function `generateToken` is returning a JSON Web Token (JWT) that contains the `id`
 * parameter passed to the function as a payload, signed with the `JWT_SECRET` environment variable and
 * set to expire in 30 days.
 */
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports ={
    loginUser,
    getMyData,
    registerUser,
    updateUser,
    deleteUser
}

