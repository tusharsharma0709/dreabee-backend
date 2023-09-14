const mongoose = require("mongoose");
const validator = require('validator');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Campaignschema = new mongoose.Schema({
    BrandName:{type:String},
    workAs: {
        type: String,
        enum: ['Paid Collaboration', 'Perks']
    },
    CreatorPreferences: [{
        CampaignBanner: {
            type: String
        },
        CampaignDetail: [{
            CampaignName: {
                type: String
            },
            Brand_Name: {
                type: String
            },
            Brand_Logo: {
                type: String
            },
        }],
        Campaign_Brief: {
            type: String
        },
        CampaigType: [{
            ProductOffer: {
                type: String
            },
            Value: {
                type: Number
            },
            description: {
                type: String
            },
            Image: {
                type: String
            },
        }],
        Deliverables: [{
            quantity: {
                type: Number
            },
            type: {
                type: String
            }
        }],
        AdditionalRequirement: {
            type: String
        },
    }],
    ProfileS: [{
        NoOfPerks: {
            type: Number
        },
        Creator_Preferences: [{
            Creator_Gender: {
                type: String,
                enum: ['Male', 'Female', 'Others']
            },
            Creator_Location: {
                type: String
            },
            Influencer_Type: {
                type: String
            },
            Content_Categories: [String]

        }],
        ContactDetails: {
            type: Number,
            maxlength: 10,
            minlength: 10,
        }

    }],
    status:{
        type:String
    },
    approval:{
        type:String
    },
    CreatedAt:{
        type:Date
    },
    EndedAt:{
        type:Date
    },
    ApprovedAt:{
        type:Date
    }

})

const Campaign_detail = new mongoose.model('Campaign_detail', Campaignschema);

module.exports = Campaign_detail;