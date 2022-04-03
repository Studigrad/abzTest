const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session'); 
const path = require('path');
const mongoose = require('mongoose');
router = express();

router.set('view engine', 'ejs');
router.set('views', path.join(__dirname,'..','views'))
router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'));
router.use(express.static(path.join(__dirname, '..','public')))



router.get('/',(req,res)=>{
    res.end('<h1>Hello World</h1>')
})

module.exports = router