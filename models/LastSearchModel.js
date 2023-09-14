const mongoose = require("mongoose");
const validator=require('validator');
require("dotenv").config();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const Dumpschema = new mongoose.Schema({
    LastSearch:[String],
    Finder:{
        type:String
    }

})

const Dump_detail=new mongoose.model('Dump_detail',Dumpschema);

module.exports=Dump_detail;