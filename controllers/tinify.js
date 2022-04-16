const tinify = require("tinify");
let multer = require('multer');
const fs = require('fs');
const path = require('path');
tinify.key = "r2ZvMMvvRdGPPLrhkHKp2Mvx0SbqSszt";


 async function tinity(name) {
     
    const newName = 'opt-'+name
    const file = path.join(__dirname,'..','uploads',name)
    const newFile = path.join(__dirname,'..','uploads',newName)
    var arrayOfStrings = name.split('.');

        const source = tinify.fromFile(file);
        const resized = source.resize({
            method: "fit",
            width: 70,
            height: 70
          });
         const res =  await resized.toFile(path.join(__dirname,'..','uploads',name))
       
         if(res){
           return name
       }
        return name   
      
    /*
    fs.readFile(file, function(err, sourceData) {
    if (err) throw err;
    tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
        if (err) throw err;
        return resultData
        });
    });
    */
}

module.exports = tinity