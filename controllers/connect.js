
const mongoose = require('mongoose');

process.env.MONGODB_URI = 'mongodb+srv://studigrad:Il26032002@cluster0.ey5mg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const db = function(){
 mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

 mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});
}

module.exports = db