const express = require('express')
const User = require('../models/User')

const router = express.Router()

//create user
router.post('/register', async(request, response) => {
    const { email } = request.body
    try{
        if(await User.findOne({ email }))
            return response.status(400).send({error:'Usuario já cadastrado'})
        const user = await User.create(request.body)
        user.password = undefined
        return response.send({user})
    }catch(err){
        return response.status(400).send({error:'Falha ao registrar'})
    }
})

//update user
router.put('/:id', async(request, response) => {
    if(request.body.name == '' || request.body.email == ''){
        return response.status(400).send({error:'Todos campos são obrigatorios'})
    }
    const { email, name } = request.body
    try{
        const user = await User.findByIdAndUpdate(request.params.id, {
            name,
            email
            //retorna o novo
        }, {new: true})
        return response.send(user)
    }catch(err){
        return response.status(400).send({error:'Falha ao atualizar user'})
    }
})

//list users
router.get('/list', async(request, response) => {
    try{
        const users = await User.find();
        return response.send({ users })
    }catch(err){
        return response.status(400).send({error:'Falha ao retornar users '})
    }
})

//show user
router.get('/:id', async(request, response) => {
    try{
        const user = await User.findById(request.params.id);
        return response.send({ user })
    }catch(err){
        return response.status(400).send({error:'Falha ao retornar o user '})
    }
})

//delete user
router.delete('/:id', async(request, response) => {
    try{
        const user = await User.findByIdAndRemove(request.params.id);
        return response.send({response: "Usuario removido com sucesso"} )
    }catch(err){
        return response.status(400).send({error:'Falha ao excluir o user '})
    }
})

module.exports = (app) => app.use('/user', router)