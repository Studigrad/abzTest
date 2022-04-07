const mongoose = require('mongoose');
const { isRequired } = require('nodemon/lib/utils');
const User = require('./models/users')


process.env.MONGODB_URI = 'mongodb+srv://studigrad:Il26032002@cluster0.ey5mg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


 mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

 mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

async function Func (){

    const newUser = new User({
        name: 'Martin',
        email: 'martin@gmail.com',
        phone:'380123456712',
        position_id: 3,
        photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
    });
    
    try{
        await newUser.save()
    }catch(e){
        console.log(e.message)
    }
    
    mongoose.connection.close()
}

//Func();

async function Func2 (){

    const newUser = new User({
        name: 'Martin',
        email: 'martin@gmail.com',
        phone:'380123456712',
        position_id: 3,
        photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
    });
    
    await User.insertMany([
        {
            name: 'Martin',
            email: 'martin@gmail.com',
            phone:'380123456712',
            position_id: 3,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: 'Leo',
            email: 'leo@gmail.com',
            phone:'380321456712',
            position_id: 5,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: 'Mikey',
            email: 'Mikey@gmail.com',
            phone:'380654321712',
            position_id: 6,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: "Jhon",
            email: "jhon@example.com",
            phone: "+380955388485",
            position_id: 4,
            photo: "https://dictionary.cambridge.org/ru/images/thumb/man_noun_002_22206.jpg?version=5.0.230"
        },
        {
            name: 'Ilya',
            email: 'Ilya@gmail.com',
            phone:'380126346712',
            position_id: 7,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: 'Maks',
            email: 'Maks@gmail.com',
            phone:'380998765432',
            position_id: 8,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: 'Vadim',
            email: 'Vadim@gmail.com',
            phone:'380123987612',
            position_id: 9,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: "Egor",
            email: "Egor@example.com",
            phone: "+380456541287",
            position_id: 10,
            photo: "https://dictionary.cambridge.org/ru/images/thumb/man_noun_002_22206.jpg?version=5.0.230"
        },
        {
            name: 'Ira',
            email: 'Ira@gmail.com',
            phone:'380433146121',
            position_id: 11,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: 'Anna',
            email: 'Anna@gmail.com',
            phone:'380111111113',
            position_id: 12,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: 'Eva',
            email: 'Eva@gmail.com',
            phone:'380999999999',
            position_id: 13,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: "Katya",
            email: "Katya@example.com",
            phone: "+380888888812",
            position_id: 14,
            photo: "https://dictionary.cambridge.org/ru/images/thumb/man_noun_002_22206.jpg?version=5.0.230"
        },
        {
            name: 'Kat',
            email: 'Kat@gmail.com',
            phone:'380666666666',
            position_id: 15,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: 'Zina',
            email: 'Zina@gmail.com',
            phone:'380761823020',
            position_id: 16,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: 'Kler',
            email: 'Kler@gmail.com',
            phone:'380444444444',
            position_id: 17,
            photo:'https://i.guim.co.uk/img/media/33c508e9f0c30a90df363e3b5cc3925f0b70f5b6/0_0_3600_2159/master/3600.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=6c1e047f1edc4a54f1770458201ed69e'
        },
        {
            name: "Kris",
            email: "Kris@example.com",
            phone: "380874023750",
            position_id: 18,
            photo: "https://dictionary.cambridge.org/ru/images/thumb/man_noun_002_22206.jpg?version=5.0.230"
        }
    ]).then(function(){
        console.log('All iserted')
    }).catch(function(e){
        console.log(e)
    })
    
    mongoose.connection.close()
}
Func2();