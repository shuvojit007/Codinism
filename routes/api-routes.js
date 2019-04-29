
module.exports = (app) => {
    //Routers
    app.use('/crt', require('./certficate'));
    app.use('/newcrt', require('./v2/newcertificate'));
    app.use('/mail', require('./SendMail'));

};