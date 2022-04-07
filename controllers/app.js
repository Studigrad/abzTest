const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session'); 
const path = require('path');
const User = require('../models/users')
const fs = require('fs');
const tinity = require('./tinify')
let multer = require('multer');


//const client = redis.createClient()

const port = process.env.PORT ?? 8050
router = express();
router.set('view engine', 'ejs');
router.set('views', path.join(__dirname,'..','views'))
router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'));
router.use(express.static(path.join(__dirname, '..','public')))
router.use(express.json());
router.use(session({ secret: 'secret' }))


// set up multer for storing uploaded files
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });


function MakePage(foundUser,page){
    const array = [...foundUser]
    let result = [];
        while (array.length) {
            result.push(array.splice(0, page));
        }        
    return result;
}

router.get('/',(req,res)=>{
    console.log(req.session)
     res.redirect('/users')
    //res.end('<h1>Hello World</h1>')
})

router.get('/token',(req,res)=>{
    if(req.session.id){
      return res.json({
            "success": true,
            "token":req.session.id
        })  
    } 
    else{
      return res.json({
            "success": false,
            "token":req.session.id
        })
    }
})

router.get('/users',async(req,res)=>{
    let link = process.env.URL || `http://localhost:${port}/users?page=`

    const foundUser = await User.find();
    
    let page = req.query.page || 1
    const offset = req.query.offset || 1
    const count = req.query.count || 5
    let prev = null
    let next = 2

    const result = MakePage(foundUser,count)

    if(page>result.length){
        return res.status(404).json({
            error:'You are out of pages'
        })
    }

    if(page>1){
        prev = parseInt(page)-1
        next = parseInt(page)+1
    } else{ prev = null }

    let response = {
        success: true,
        page: page,
        total_pages: result.length,
        total_users: foundUser.length,
        count: count,
        links: 
        {
            next_url: link+`${next}&offset=${offset}&count=${count}`,
            prev_url: link+`${prev}&offset=${offset}&count=${count}`
        },
        users: result[page-1],
        prev:prev
        }

        if(req.header('Accept').includes('application/json')){
            res.json(response)
        } else{
            res.render('index',{response})
        }

})

router.post('/users',upload.single('photo'),async(req,res,next)=>{   

    const token = req.headers.token || req.session.id
    const {name,email,phone,position_id,photo} = req.body
    let buf = ''
    try{
         buf = await tinity(req.file.filename)
    }catch(e){
        return res.status(400).json({
            "success": false,
            "message": "Photo is required"
          })
    }
    
    if(token==req.session.id){        
        const newUser = new User({
            name,
            email,
            phone,
            position_id,
            photo:
            {
                data: fs.readFileSync(path.join(__dirname,'..','uploads',buf)),
                contentType: 'image/jpeg'
            }
        })

        try{
            const result = await newUser.save()
        }catch(e){
            
            if(e.code!=11000){
                
                return res.status(400).json({
                    "success": false,
                    "message": e.message
                  })
            }else{
                return res.status(400).json({
                    "success": false,
                    "message": "User with this phone ,name or email already exist"
                  })
            }
            
        }
        
        return   res.json({
            "success" : true,
            "user_id" : newUser._id,
            "message" : "New user successfully registered"
        })
        
    }else{
        return  res.status(400).json({
            "success": false,
            "message": "The token expired."
        })
    }

})

router.get('/users/:id',async(req,res)=>{

    const {id} = req.params
      
    const foundUser = User.findById(id).then(function(user){
        if(req.header('Accept').includes('application/json')){
            return res.json({success : true,user:user})
        } else{
            return res.render('user',{user})
        }
        
    }).catch(function(e){
        return res.status(404).json({"success": false,
        "message": "The user with the requested identifier does not exist",
        "fails": {
          "user_id" : e.message
        }})
    })
    
})
router.post('/users/:id',async(req,res)=>{
    const {id} = req.params
    const result = await User.findByIdAndDelete(id)
    res.redirect('/users')
})
/*
router.get('/rusers/:id',async(req,res)=>{

    const {id} = req.params

    const foundUser = User.findById(id).then(function(user){
        return res.end(`<img src="data:image/${user.photo.contentType};base64,
        ${user.photo.data.toString('base64')}">`)
    }).catch(function(e){
        return res.status(404).json({"success": false,
        "message": "The user with the requested identifier does not exist",
        "fails": {
          "user_id" : e.message
        }})
    })
    
})
*/
router.get('/positions',async(req,res)=>{
    const positions = { 1: {id:1,name:'Security'}, 2: {id:2,name:'Designer'}, 3: {id:3,name:'Content manager'}, 4: {id:4,name:'Lawyer'} }
    const foundUser = await User.find()
    let array = []
    let result = []
    for(let position of foundUser){
        array.push(position.position_id)
    }
    let uniqueArray = [...new Set(array)]
    for(let position of uniqueArray){
        try{       
            if(position == positions[position].id){
                result.push({
                    id:positions[position].id,
                    name:positions[position].name
                })
            }
        }catch(e){ }     
    }
    if(result){
        return res.json({
            "success" : true,
            "positions" : result
          })
    }else{
        return res.json({
            "success" : false,
            "positions" : 'Positions not found'
          })
    }
    
})


module.exports = router