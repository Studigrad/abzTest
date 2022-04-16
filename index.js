const express = require('express');
const mongoose = require('mongoose');
const db = require('./controllers/connect')
const router = require('./controllers/app')

app = express();



db();

const port = process.env.PORT ?? 8050

app.use(router)



app.listen(port,()=>{
    console.log('Server is running')
})