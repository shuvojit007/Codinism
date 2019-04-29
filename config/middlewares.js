const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const isDev = process.env.NODE_ENV == "development";
const isProd = process.env.NODE_ENV == "production";

module.exports = (app) => {
    if (isProd) {
        app.use(compression());
        app.use(helmet());

    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    if (isDev) {
        app.use(morgan('dev'));
    }



    setHeaders(app) // Set headers
    settings(app) // Settings
    errorsHandler(app)


}

/** Settings */
const settings = (app) => {

    app.use(cors()) // Cors settings
    //  app.use('/images', app.static(`${__dirname}/assets/images`)); //Set static directory
}

/** Set headers */
const setHeaders = (app) => {
    app.use((req, res, next) => {
        res.removeHeader('X-Powered-By') // Remove express signature
        if (process.env.APP_NAME) res.setHeader('application', process.env.APP_NAME) // Set application name
        if (process.env.APP_VERSION) res.setHeader('Version', process.env.APP_VERSION) // Set application version
        next()
    })
}

/** Error handler */
const errorsHandler = (app) => {
    //catch 404 Errors and forward them to error handler
    app.use((err, req, res, next) => {
        const error = app.get('env') === 'development' ? err : {};
        const status = err.status || 500;
        //Respond to client
        res.status(status).json({
            error: {
                message: error.message
            }
        });
        //Respond to ourselves
        console.error(err);
    });
}