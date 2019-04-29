
const puppeteer = require('puppeteer')
const imgur = require('imgur');
const randomstring = require("randomstring");
const config = require('../../config/config');
imgur.setClientId(config.imgur);

/** Certificate body */
const certificateBody = (req) => {
    

    const data = req.body;
    const backgound = `${req.protocol}://${req.get('host')}/images/crt_sign.png` // Set background
    const text = data.name ? data.name : "Your Awesome Name Here" // Custom text

    console.log(backgound)
    return `
    <div style="  @import url('https://fonts.googleapis.com/css?family=Poppins');
       font-family:'Poppins', sans-serif;
    
       background-image: url('${backgound}');
       background-repeat: no-repeat; 
       background-size: cover; height: 100%; 
       ">
      <div style="height: 100%; display: flex; 
      flex-direction: column; 
      justify-content: space-around; 
      align-items: center">
        <p style="width: 70%;
          margin: 95px 0px 0px 0px; padding: 0;  
          font-size: 50px;  
          font-weight:bold;
          text-transform: uppercase;
          color: #6d24a0;
          text-align: center">${text}</p>
      </div>
    <div>

    <style>
        body{ margin: 0px; }
    </style>
  `
}

module.exports = {
    generateCertificate: async (req, res) => {
        try {
            const browser = await puppeteer.launch() // Initiates browser
            const page = await browser.newPage() // Set new page
            await page.setContent(certificateBody(req)) // Set content
            const buffer = await page.screenshot({ fullPage: true });
            await browser.close() // Close browser

            //  console.log(Buffer.from(buffer).toString('base64'))

            var result = await imgur.uploadBase64
                (Buffer.from(buffer).toString('base64'))

            //    res.setHeader('Content-Disposition', 'attachment; filename=certificate.png');
            //    res.status(200).send(buffer);

            res.status(200).send({ data: result.data.link })


        } catch (e) {
            res.status(500).json({
                message: 'Something Went Wrong' + e,
                error: e
            })
        }
    }

}

