const mongoose = require("mongoose");
const validator = require('validator');
require("dotenv").config();
const Plansschema = new mongoose.Schema({
    Brand_name: {
        type: String,
        required: true,
        minlength: 3
    },
    PlanName: {
        type: String,
        unique: true,
        required: true
    },
    list: [{
        ListName: {
            type: String
          
        },
        Platforms: [{
            type: String,
            enum: ['instagram', 'youtube', 'twitter', 'facebook', 'blog']

        }],
        Influencer: [{
            InfluencerName: {
                type: String
            },
            InfluencerImage: {
                type: String
            },
            Influencerlikes: {
                type: Number
            },
            InfluencerViews: {
                type: Number
            },
            InfluencerER: {
                type: Number
            }
        }],
        deliverables: [{
            contentType: {
                type: String
            },
            noOfPost: {
                type: Number
            },
            cost: {
                type: Number
            },

        }]
    }],
    status:{
        type:String
    },
    CreatedAt:{
        type:Date
    }


})



const Plans_detail = new mongoose.model('Plans_detail', Plansschema);

module.exports = Plans_detail;