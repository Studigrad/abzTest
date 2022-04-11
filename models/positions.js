const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PositionSchema =  Schema({
    id:{
        type:Number,
        required: [true, 'id is required']
    },
    name:{
        type:String,
        required: [true, 'Name is required']
    },
})

const Position = mongoose.model('Position',PositionSchema)

/*
async function InsertPositions(){
    await Position.insertMany([
        {
            id:1,
            name:'Security' 
         },
        {
            id:2,
            name:'Designer' 
         },
        {
           id:3,
           name:'Content manager' 
        },
        {
            id:4,
            name:'Lawyer' 
         },
         {
            id:5,
            name:'Producer' 
         },
         {
            id:6,
            name:'Gamer' 
         },
         {
            id:7,
            name:'Youtuber' 
         },
         {
            id:8,
            name:'Farmer' 
         },
         {
            id:9,
            name:'Killer' 
         },
         {
            id:10,
            name:'Musician' 
         },
         {
            id:11,
            name:'Artist' 
         },
         {
            id:12,
            name:'Singer' 
         },
         {
            id:14,
            name:'Accountant' 
         },
         {
            id:15,
            name:'Businessman' 
         },
         {
            id:16,
            name:'Dancer' 
         },
         {
            id:17,
            name:'Teacher' 
         },
         {
            id:18,
            name:'Scientist' 
         },
         {
            id:19,
            name:'Driver' 
         },
         {
            id:20,
            name:'Data scientist' 
         },
    ])
    mongoose.connection.close();
}

InsertPositions();
*/
module.exports = Position