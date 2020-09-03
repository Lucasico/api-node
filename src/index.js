const express = require('express')
const bodyParser = require('body-parser')
//refatorar pra tirar controller do router
//const routes = requeri('./routes')
const app = express()

//entender json no body
app.use(express.json());

require('./controllers/userController')(app)

app.listen(3000)