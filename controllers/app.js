const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session'); 
const path = require('path');
const User = require('../models/users')
const Position = require('../models/positions')
const fs = require('fs');
const tinity = require('./tinify')
let multer = require('multer');
const mysql = require('mysql');
const con = require('../mysql/database')
  


const uploadController = require("../controllers/upload");
const upload = require("../middlewares/upload");


const port = process.env.PORT ?? 8050
router = express();
router.set('view engine', 'ejs');
router.set('views', path.join(__dirname,'..','views'))
router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'));
router.use(express.static(path.join(__dirname, '..','uploads')))
router.use(express.json());
router.use(session({ secret: 'secret' }))



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
    let arr = []
    con.query(`SELECT * from users`,function(err,result){
        arr = JSON.parse(JSON.stringify(result))
        if(err) return res.json({error:err});
        
    })
    const foundUser = await User.find();

    let page = req.query.page || 1
    const offset = req.query.offset || 1
    const count = req.query.count || 5
    let prev = null
    let next = 2

    const result = MakePage(arr,count)
    console.log('result len is ',result.length)
    console.log('page is ',page)
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
        total_users: arr.length,
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

router.post('/users',upload.single('photo'),async(req,res)=>{  
  
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
            var sql = `INSERT INTO users (name, email,phone,position_id,image_name) VALUES ('${name}','${email}','${phone}','${position_id}','${req.file.filename}')`;
            con.query(sql, async function (err, result) {
                if (err) return res.json({'error':err});
                console.log('User inserted')
                const deleted = await User.findByIdAndDelete(newUser._id)
               return res.json({'success':true,'message':result})
            })
            
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
        
        
    }else{
       
        return  res.status(400).json({
            "success": false,
            "message": "The token expired."
        })
    }
    
})

router.get('/users/:id',async(req,res)=>{

    const {id} = req.params
    
    con.query(`SELECT * FROM users WHERE id = '${id}'`, function (err, result) {
        if(err) return res.json({error:err})
        let foundUser  = JSON.parse(JSON.stringify(result))
        console.log(foundUser)
        if(req.header('Accept').includes('application/json')){
            return res.json({success : true,user:foundUser[0]})
        } else{
            return res.render('user',{user:foundUser[0]})
        }  
    })
    /*
    const foundUser = User.findById(id).then(function(user){
        
    }).catch(function(e){
        return res.status(404).json({"success": false,
        "message": "The user with the requested identifier does not exist",
        "fails": {
          "user_id" : e.message
        }})
    })
    */
})
router.post('/users/:id',async(req,res)=>{
    const {id} = req.params
    var sql = `DELETE FROM users WHERE id = '${id}'`;
    con.query(sql, function (err, result) {
      if (err) return res.json({'error':err});
      console.log("Number of records deleted: " + result.affectedRows);
    });
    //const result = await User.findByIdAndDelete(id)
    res.redirect('/users')
})


router.get('/new',async(req,res)=>{
    
    var sql = "INSERT INTO positions (name, position_id) VALUES ?";
    var values = [
        [
            'Security','1'

        ],
        [
            'Designer','2'
        ],
        [
          'Content manager','3'
        ],
        [
           'Lawyer','4' 
        ],
         [
            'Producer','5'
         ],
         [
            'Gamer','6'
        
         ],
         [
            'Youtuber','7'
         ],
         [
            'Farmer','8'
         ],
         [
           'Killer','9'
         ],
         [
           'Musician','10'
         ],
         [
            'Artist','11'
         ],
         [
            'Singer','12'
         ],
         [
            'Accountant','13'
         ],
         [
            'Businessman','14'
         ],
         [
            'Dancer','15' 
         ],
         [
            'Teacher','16'
         ],
         [
            'Scientist','17' 
         ],
         [
            'Driver','18'
         ],
         [
            'Data scientist','19' 
         ],
    ]
    con.query(sql, [values], function (err, result) {
        if (err)  res.json({error:err});
        console.log("Number of records inserted: " + result.affectedRows);
      });
})

router.get('/positions',async(req,res)=>{
    con.query(`SELECT * from users`,function(err,foundUser){
        if(err) return res.json({'error':err});
       
        con.query(`SELECT * from positions`,function(err,positions){
            if(err) return res.json({'error':err});
            
            let array = []
            let result = []
            for(let position of foundUser){
                array.push(position.position_id)
            }
            console.log(array)
            let uniqueArray = [...new Set(array)]
            for(let position of uniqueArray){
                for(pos of positions){
                    try{       
                        if(position == pos.position_id){
                            result.push({
                                id:pos.position_id,
                                name:pos.name
                            })
                        }
                    }catch(e){ } 
                }
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
    })
    
    
   

    
})


module.exports = router