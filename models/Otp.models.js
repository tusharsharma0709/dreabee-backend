const mongoose=require("mongoose");
const Otpschema = new mongoose.Schema({
   email: {
        type:String,
       
    },
    otp:{type:Number},
});
const OtpModel=new mongoose.model('OtpModel',Otpschema);

module.exports=OtpModel;
