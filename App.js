
const jimp = require('jimp');
var fileName = 'phcertificate.png';
var imageCaption = "Jhankar Mhabub";
var loadedImage;
var imgur = require('imgur');

imgur.setClientId('81c9941fb465a67');
var UploadImage = (name)=>{
        imgur.uploadFile(name)
        .then(function (json) {
            console.log(json.data.link);
        })
        .catch(function (err) {
            console.error(err.message);
        });
    }
  
jimp.read(fileName)
    .then(image=>{
        loadedImage =image;
        return jimp.loadFont(jimp.FONT_SANS_128_BLACK)
    }).then(font=>{
      return loadedImage.print(font, loadedImage.bitmap.width-1150,1300,imageCaption).resize(800, jimp.AUTO).write("output.png");
    }).then(()=>{
        UploadImage("output.png")
    }).catch(err => {
        console.error(err);
      });

console.log("after calling the fs")