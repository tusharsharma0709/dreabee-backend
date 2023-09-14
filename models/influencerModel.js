const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Influencerschema = new mongoose.Schema({
    Influencer_Firstname: {
        type: String,
        required: true,
        minlength: 3
    },
    Influencer_Lastname: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: [
            true, "Email is mandatory"
        ],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email")
            }

        },
        required: [
            true, "email filed is mandatory"
        ]
    },
    Street_Address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'female', 'Others']
    },
    phone: {
        type: Number,
        maxlength: 10,
        minlength: 10,
        // unique: true,
        required: true
    },
    watsaap: {
        type: Number,
        maxlength: 10,
        minlength: 10,
        // unique: true,
        //required: true
    },
    language: [String],
    Instagram_detail: [{
        Instagram_link: {
            type: String,
        },
        Instagram_username: {
            type: String
        },
        InstaPerPostCost: {
            type: Number
        }
    }],
    Youtube_detail: [{
        Youtube_link: {
            type: String,
        },
        youtube_username: {
            type: String
        },
        youtubePerPostCost: {
            type: Number
        }
    }],
    youtube: [{
        cid: {
            type: String
        },
        socialType: {
            type: String
        },
        groupID: {
            type: String
        },
        name: {
            type: String
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        screenName: {
            type: String
        },
        usersCount: {
            type: Number
        },
        communityStatus: {
            type: String
        },
        avgER: {
            type: Number
        },
        avgInteractions: {
            type: Number
        },
        avgViews: {
            type: Number
        },
        ratingIndex: {
            type: Number
        },
        tags: [String],
        suggestedTags: [String],
        ratingTags: [{
            tagID: {
                type: String
            },
            name: {
                type: String
            },
        }],
        lastPosts: [{
            url: {
                type: String
            },
            image: {
                type: String
            }
        }],
        countries: [{
            name: {
                type: String
            },
            percent: {
                type: Number
            }
        }],
        lastFromMentions: [{
            cid: { type: String },
            image: { type: String },
            url: { type: String },
            name: { type: String },
        }],
        genders: [{
            name: { type: String },
            percent: { type: String }
        }],
        ages: [{
            name: { type: String },
            percent: { type: String }
        }],
        interests: [String],
        toMentions180d: {
            type: Number
        },
        toMentionsCommunities180d: {
            type: Number
        },
        toMentionsViews180d: {
            type: Number
        },
        fromMentions180d: {
            type: Number
        },
        fromMentionsCommunities180d: {
            type: Number
        },
        fromMentionsViews180d: {
            type: Number
        },
        pctUsersCount180d: {
            type: Number
        },
        pctFakeFollowers: {
            type: Number
        },
        avgLikes: {
            type: Number
        },
        avgComments: {
            type: Number
        },
        avgVideoLikes: {
            type: Number
        },
        avgVideoComments: {
            type: Number
        },
        avgVideoViews: {
            type: Number
        },
        country: {
            type: String
        },
        countryCode: {
            type: String
        },
        age: {
            type: String
        },
        categories: [String],
        qualityScore: {
            type: Number
        },
        gender: {
            type: String
        }
    }],
    ContentCategories: [String],
    FamilyInfo: [{
        child_Gender: {
            type: String
        },
        child_Age: {
            type: Number
        }
    }
    ],
    PetInfo: [{
        petBreed: {
            type: String,
            enum: ['dog', 'cat', 'bird', 'other']
        }
    }],
    instagram: [{
        cid: {
            type: String
        },
        socialType: {
            type: String
        },
        groupID: {
            type: Number
        },
        name: {
            type: String
        },
        image: {
            type: String
        },
        description: {
            type: String
        },
        screenName: {
            type: String
        },
        usersCount: {
            type: Number
        },
        communityStatus: {
            type: String
        },
        avgER: {
            type: Number
        },
        avgInteractions: {
            type: Number
        },
        avgViews: {
            type: Number
        },
        ratingIndex: {
            type: Number
        },
        tags: [String],
        suggestedTags: [String],
        ratingTags: [{
            tagID: {
                type: String
            },
            name: {
                type: String
            },
        }],
        lastPosts: [{
            url: {
                type: String
            },
            image: {
                type: String
            }
        }],
        countries: [{
            name: {
                type: String
            },
            percent: {
                type: Number
            }
        }],
        lastFromMentions: [{
            cid: { type: String },
            image: { type: String },
            url: { type: String },
            name: { type: String },
        }],
        genders: [{
            name: { type: String },
            percent: { type: String }
        }],
        ages: [{
            name: { type: String },
            percent: { type: String }
        }],
        interests: [String],
        toMentions180d: {
            type: Number
        },
        toMentionsCommunities180d: {
            type: Number
        },
        toMentionsViews180d: {
            type: Number
        },
        fromMentions180d: {
            type: Number
        },
        fromMentionsCommunities180d: {
            type: Number
        },
        fromMentionsViews180d: {
            type: Number
        },
        pctUsersCount180d: {
            type: Number
        },
        pctFakeFollowers: {
            type: Number
        },
        avgLikes: {
            type: Number
        },
        avgComments: {
            type: Number
        },
        avgVideoLikes: {
            type: Number
        },
        avgVideoComments: {
            type: Number
        },
        avgVideoViews: {
            type: Number
        },
        country: {
            type: String
        },
        countryCode: {
            type: String
        },
        age: {
            type: String
        },
        categories: [String],
        qualityScore: {
            type: Number
        },
        gender: {
            type: String
        }
    }]

})




const influencer_detail = new mongoose.model('influencer_detail', Influencerschema);
module.exports = influencer_detail;