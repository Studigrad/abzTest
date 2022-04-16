const fs = require("fs");
const db = require("../mysql/sequelize");
const path = require('path');

const User = db.users;

const uploadFiles = async (req, res) => {
  try {
      const {name,email,phone,position_id} = req.body
    console.log(req.body)
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    User.create({
        name:name,
        email,
        phone,
        position_id,
      type: req.file.mimetype,
      data: fs.readFileSync(
        path.join(__dirname,'..','uploads',req.file.filename)
      ),
    }).then((image) => {
      fs.writeFileSync(
        path.join(__dirname,'..','tmp',image.name),
        image.data
      );
      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
 
};
module.exports = {
  uploadFiles,
};