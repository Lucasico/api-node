const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//entender json no body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}))

require('./controllers/userController')(app);

app.listen(3000)