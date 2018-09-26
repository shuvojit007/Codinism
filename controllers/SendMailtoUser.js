const nodemailer = require("nodemailer");
const config = require('../config/config');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.nodemailer.email,
      pass: config.nodemailer.pass
    }
});

module.exports ={
    SendMailtoUser :async (req,res)=>{
            const mailOptions = {
                to: req.body.email, 
                subject: 'Welcome to Programming Hero. Here are 2 tips',
                html: `<h2>Welcome on board, ${req.body.name}!</h2>`+
                "<p>Here are 2 tips to become a Programmer. </p>"+
                "<p align='center'><br\/>------------------------------------ Tip - 1: -------------------------------------- </p>"
                +"<p></p>Just grab all those 3-5 minutes waiting time. In a bus stop🚏, restaurants 🍔, bank 🏦, or a date to arrive. Open the Programming Hero, and start playing. You will become fluent in code in a month. </p>"+
                "<p align='center'><br\/>------------------------------------ Tip - 2: -------------------------------------- </p>"
                +"<p>Take the challenge to open Programming Hero just for 5 minutes, every time you feel the urge to open a social media to waste your valuable time. If you can take this challenge for a week you will improve your life as well as your coding skill. </p>"+
                "<p align='center'><br\/>------------------------------------------------------------------------------</p>"+
                "<p> We can’t wait to see you as a Programming superhero.<br\/>Happy Programming.</p>"+
                "<p>Regards-<br\/>Team Programming Hero </p>"
            };
           await transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(422).json({success: false});
                } else {
                    
                    res.status(201).json({success: true});
                }
            });
    }
    
}
