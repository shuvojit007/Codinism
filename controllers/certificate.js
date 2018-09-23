const jimp = require('jimp');
var imgur = require('imgur');
const config = require('../config/config');
var fileName = 'phcertificate.png';
imgur.setClientId(config.imgur);
module.exports={
    GenerateCertificate : async (req,res)=>{
     try {
        var loadedImage = await jimp.read(fileName);
        var font = await jimp.loadFont(jimp.FONT_SANS_128_BLACK);
        await loadedImage.print(font, loadedImage.bitmap.width-1000,1300,req.body.name).resize(800, jimp.AUTO).write('output.png');
        var result = await imgur.uploadFile("output.png")
        res.status(200).send(result.data.link)
    } catch(e) {
        res.status(500).json({
            message: 'Something Went Wrong',
            error: e
        })
    }
}
}