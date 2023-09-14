const mongoose = require("mongoose");
const validator=require('validator');
require("dotenv").config();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const Agencyschema = new mongoose.Schema({
    Agency_name:{
        type : String,
        required : true,
        minlength:3
    },
    name:{
        type:String
    },
    email:{
        type:String,
        unique:[

            true,"Email is mandatory"
        ],
        validate(value){
             if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        },
        required:[
            true,"email filed is mandatory"
        ]
    },
    
    password:{
        type : String,
        required:[true]
    },
    repassword:{
        type : String
    },
    phone:{
        type:Number,
        maxlength:10,
        minlength:10,
        unique:true,
        required:true
    },
    associatedBrands:[{
        BrandName:{
            type:String
        }
    }]
})

Agencyschema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
        this.repassword=undefined;
    }
    next();
})


const Agency_detail=new mongoose.model('Agency_detail',Agencyschema);

module.exports=Agency_detail;