const express = require('express');
const cors=require("cors");
const app=express();
require("dotenv").config();
const PORT = process.env.PORT || 8081;
const path = require("path");
const axios=require("axios");
require("./db/conn");
const bodyparser =require("body-parser");
const fileupload=require("express-fileupload");
const staticpath=path.join(__dirname,'./src');
app.use(fileupload({
    useTempFiles:true
}));
app.use(express.static(staticpath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use((cors('*')));
const routes = require("./routes/index");
app.use('/api', routes)
app.use((err,req,res,next)=>{
    err.statuCode = err.statusCode(500);
    err.message=err.message("Internal Server Error");
    res.status(err.statuCode).json({
        message:err.message,
    });
});

app.listen(PORT,()=>
{
    console.log(`listening to port at ${PORT}`)
    
})

