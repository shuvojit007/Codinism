const jimp = require('jimp');
const imgur = require('imgur');
const randomstring = require("randomstring");
const config = require('../config/config');
const fs = require('fs')
var fileName = 'phcertificate.png';

imgur.setClientId(config.imgur);
module.exports={
    GenerateCertificate : async (req,res,next)=>{
     try {

       var imagename= randomstring.generate();
        var loadedImage = await jimp.read(fileName);
        var font = await jimp.loadFont(jimp.FONT_SANS_128_BLACK);
        await loadedImage.print(font, loadedImage.bitmap.width-1100,1300,req.body.name).resize(800, jimp.AUTO).write(imagename+".png");
        var result = await imgur.uploadFile(imagename+".png")
        res.status(200).send(result.data.link)
        await fs.unlink(imagename+".png");
        
    } catch(e) {
        res.status(500).json({
            message: 'Something Went Wrong',
            error: e
        })
    }
}
    
}