require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const router = require('./routes/index');
app.use(express.urlencoded({extended:true}));
app.use(router);
app.listen(port, ()=> {
    console.log('Listening on port ', port);
});