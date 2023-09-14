//merger between two codes for youtube
const InfluencerProfile = require("../models/influencerModel");
module.exports={
    YoutubeCheckId:async(req,res)=>{
        try{
            const flag=[]
            const record=req.body.record;
            record.filter(async(s)=>{
                let verifier=await InfluencerProfile.findOne({instagram:{$elemMatch:{"groupID":channelId}}})
                if(verifier){
                    flag.push({"status":"Verified","ChannelId":s.channelId})
                }else{
                    flag.push()
                }
            })
            res.status(201).send(flag)
        }catch(error){
            res.status(400).send(error)
        }
    }
}

