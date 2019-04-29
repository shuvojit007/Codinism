const express = require('express');
const app = express();
const appMiddlewares = require('../config/middlewares');
const apiRoutes = require('../routes/api-routes');

app.use('/images', express.static('public'));

appMiddlewares(app);

apiRoutes(app)

var port = process.env.PORT || 3000;
app.listen(port, err => {
    if (err) {
        throw err;
    } else {
        console.log(`
        Server is running on port: ${port}
        ---
        Running on ${process.env.NODE_ENV} || development
        ---
        Make Something Great`)
    }
})

