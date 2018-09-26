
module.exports = (app)=>{
    //Routers
    app.use('/crt', require('./certficate'));
    app.use('/mail', require('./SendMail'));
  
};