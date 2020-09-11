const express = require('express')
const config = require('./config')
const { port } = config;
const routes = require('./src/routes')
const bodyParser = require('body-parser')
require('./src/middlewares/auth')
require('express-group-routes');
const cors = require('cors')

const mongoConnection = require('./src/connections/orgMongo')

const app = express()

app.use(cors())
/*
app.group("/apis/sps/helloworld/v1", (router) => {
    router.use(routes)
});*/

app.use(bodyParser.json())

app.use(routes)

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
    mongoConnection()
})