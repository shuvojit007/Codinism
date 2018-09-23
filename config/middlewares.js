const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression =require('compression');
const helmet = require('helmet');

const isDev = process.env.NODE_ENV == "development";
const isProd = process.env.NODE_ENV == "production";

module.exports =(app)=> {
    if (isProd) {
        app.use(compression());
        app.use(helmet());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
 

    if (isDev) {
        app.use(morgan('dev'));
    }

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