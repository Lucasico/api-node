const express = require('express')
const User = require('../models/User')
const yup = require('yup')
const asyncHandler = require('express-async-handler')
const router = express.Router()

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(15)
})

router.post('/register', asyncHandler(async(request, response) => {
    const { email } = request.body
    schema.isValid(request.body)
    .then(function (valid) {
        if(valid){
            const user = User.create(request.body)
            response.status(200).send({status:'cadastro realizado com sucesso'});       
        } else {
            response.status(400).send({error:'Todos os dados são obrigatorios'});
        }   
    });
}))

//update user
router.put('/:id', asyncHandler(async(request, response) => {
    if(request.body.name == '' || request.body.email == ''){
        return response.status(400).send({error:'Todos campos são obrigatorios'})
    }
    const { email, name } = request.body
    const user = await User.findByIdAndUpdate(request.params.id, {
        name,
        email
            //retorna o novo
    }, {new: true})
    return response.send(user)
}))

//list users
router.get('/list', asyncHandler(async(request, response) => {
    const users = await User.find();
    return response.send({ users })    
}))

//show user
router.get('/:id', asyncHandler(async(request, response) => {
    const user = await User.findById(request.params.id);
    return response.send({ user })
}))

//delete user
router.delete('/:id', asyncHandler(async(request, response) => {
    const user = await User.findByIdAndRemove(request.params.id);
    return response.send({response: "Usuario removido com sucesso"} )
}))

module.exports = (app) => app.use('/user', router)