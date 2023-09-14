const express = require("express");
const app=express();
const brands = require('./Brands.routes');
const influencer= require('./influencer.routes');
const agency=require('./agency.routes');
const image=require("./DumpImage.router");
const Campaign=require("./campaign.routes")

//index routes to sperate each section of api and setting Mid url

//influencer section
app.use('/Influencer',influencer);
//Brands section
app.use('/Brands',brands);
//agency section
app.use("/agency",agency)
//uploadingImage
app.use("/Image",image);
//campaign section
app.use("/Campaign",Campaign);
module.exports=app
