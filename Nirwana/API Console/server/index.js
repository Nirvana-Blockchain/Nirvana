/* eslint consistent-return:0 */

var createError = require('http-errors')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens
var morgan = require('morgan')
var secret = require('./config')
const mongoose = require('mongoose');
const config = require('./config/db');
const express = require('express')
const logger = require('./logger')

const argv = require('./argv')
const port = require('./port')
const setup = require('./middlewares/frontendMiddleware')
const isDev = process.env.NODE_ENV !== 'production'
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
      ? require('ngrok')
      : false
const { resolve } = require('path')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
/**===========================================================================================
 * Routers
 * =========================================================================================== 
 */
var authRouter = require('./routes/AuthUser')

// If you need a backend, e.g. an API, add your custom backend-specific middleware here


app.set('superSecret', secret.secret) 

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

//===============================================================================
// JWT Verifier 
// oute middleware to authenticate and check token
//===============================================================================


const jwtverifier =  function(req, res , next) {

  
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token']

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' })		
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded	
                next()
            }
        })

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.'
        })
		
    }
}
let errorHandler = function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.send({'message': err.message, status: (err.status || 500)})
}
let nocache = function(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.header('Expires', '-1')
    res.header('Pragma', 'no-cache')
    next()
}

//app.use('/auth',jwtverifier, authRouter);
app.use('/api/auth', authRouter)


// In production we need to pass these values in instead of relying on webpack
setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

// Start your app.
app.listen(port, host, async err => {
    if (err) {
        return logger.error(err.message)
    }

    // Connect to ngrok in dev mode
    if (ngrok) {
        let url
        try {
            url = await ngrok.connect(port)
        } catch (e) {
            return logger.error(e)
        }
        logger.appStarted(port, prettyHost, url)
    } else {
        logger.appStarted(port, prettyHost)
    }
})
