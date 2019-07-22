const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()

const mongodbConnection = require('./database/mongodb.connection')
const routes = require('./routes')
const port = process.env.PORT || 4000
/* 
    Middlewares
*/
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});


app.listen(port, () => console.log(`Server on port ${port}`))
mongodbConnection
    .then(() => {
        console.log('db connection success!');
    })
    .catch(error => console.log('connection fail!', error))

/**
 * Routes
 */
app.use('/api',routes)



