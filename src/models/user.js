const mongoose = require('../database')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true
    }, 

    password:{
        type: String,
        required: true,
        select: false
    }
})
//ates de salvar
UserSchema.pre('save', async function(next){
    //gera hash para senha
    const hash = await bcrypt.hash(this.password, 10)
    //troca pass por hash
    this.password = hash
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User