const InfluencerProfile = require("../models/influencerModel");
const bodyparser = require("body-parser");
const express = require("express");
require("dotenv").config();
const axios = require("axios");
const dumpRecord = require("../models/LastSearchModel");
const e = require("express");
module.exports = {
    //register api for new influencer...
    InfluencerRegister: (req, res) => {
        const {
            PetInfo,
            FamilyInfo,
            ContentCategories,
            Youtube_detail,
            Instagram_detail,
            language,
            phone,
            gender,
            city,
            Street_Address,
            email,
            Influencer_Lastname,
            Influencer_Firstname,
            watsaap
        } = req.body;

        const user = new InfluencerProfile({
            PetInfo: PetInfo,
            FamilyInfo: FamilyInfo,
            ContentCategories: ContentCategories,
            Youtube_detail: Youtube_detail,
            Instagram_detail: Instagram_detail,
            language: language,
            phone: phone,
            watsaap: watsaap,
            gender: gender,
            city: city,
            Street_Address: Street_Address,
            email: email,
            Influencer_Lastname: Influencer_Lastname,
            Influencer_Firstname: Influencer_Firstname
        });
        user.save().then((user) => {
            console.log(user)
            res.status(201).send("Influencer  registered sucessfully!!");

        }).catch((error) => {
            res.status(400).send(error);
        });

    },
    //validating user
    ValidatingUserDataFromInstagram: async (req, res) => {
        try {
            const url = req.body.url;

            const config = {
                headers: {
                    'X-RapidAPI-Key': process.env.RapidKey,
                    'X-RapidAPI-Host': process.env.RapidHost
                }
            };
            const userData = await axios.get(
                `https://instagram-statistics-api.p.rapidapi.com/community?url=${url}`, config)
                .then((userData) => {
                    res.status(201).send("Url Validated sucessfully!!")
                }).catch((error) => {
                    res.status(400).send("Please Provide  Valid Url...")
                })
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //api for updating instagram data at backend of the user
    UpdateUserDataFromInstagram: async (req, res) => {
        try {
            const url = req.body.user_name;
            const record = InfluencerProfile.findOne({ Instagram_detail: { $elemMatch: { "Instagram_link": url } } })
            if (!record) {
                res.status(400).send(error);
            } else {
                const config = {
                    headers: {
                        'X-RapidAPI-Key': process.env.RapidKey,
                        'X-RapidAPI-Host': process.env.RapidHost
                    }
                };
                const userData = await axios.get(
                    `https://instagram-statistics-api.p.rapidapi.com/community?url=${url}`, config)
                    .then(async (userData) => {
                        const updated = await InfluencerProfile.findOne({ Instagram_detail: { $elemMatch: { "Instagram_link": url } } }).updateOne({
                            $set: {
                                'instagram.$.cid': userData.data.data.cid,
                                'instagram.$.socialType': userData.data.data.socialType,
                                'instagram.$.groupID': userData.data.data.groupID,
                                'instagram.$.name': userData.data.data.name,
                                'instagram.$.image': userData.data.data.image,
                                'instagram.$.description': userData.data.data.description,
                                'instagram.$.screenName': userData.data.data.screenName,
                                'instagram.$.usersCount': userData.data.data.usersCount,
                                'instagram.$.communityStatus': userData.data.data.communityStatus,
                                'instagram.$.avgER': userData.data.data.avgER,
                                'instagram.$.avgInteractions': userData.data.data.avgInteractions,
                                'instagram.$.avgViews': userData.data.data.avgViews,
                                'instagram.$.ratingIndex': userData.data.data.ratingIndex,
                                'instagram.$.tags': userData.data.data.tags,
                                'instagram.$.suggestedTags': userData.data.data.suggestedTags,
                                'instagram.$.ratingTags': userData.data.data.ratingTags,
                                'instagram.$.lastPosts': userData.data.data.lastPosts,
                                'instagram.$.countries': userData.data.data.countries,
                                'instagram.$.lastFromMentions': userData.data.data.lastFromMentions,
                                'instagram.$.genders': userData.data.data.genders,
                                'instagram.$.ages': userData.data.data.ages,
                                'instagram.$.interests': userData.data.data.interests,
                                'instagram.$.toMentions180d': userData.data.data.toMentions180d,
                                'instagram.$.toMentionsCommunities180d': userData.data.data.toMentionsCommunities180d,
                                'instagram.$.toMentionsViews180d': userData.data.data.toMentionsViews180d,
                                'instagram.$.fromMentions180d': userData.data.data.fromMentions180d,
                                'instagram.$.fromMentionsCommunities180d': userData.data.data.fromMentionsCommunities180d,
                                'instagram.$.fromMentionsViews180d': userData.data.data.fromMentionsViews180d,
                                'instagram.$.pctUsersCount180d': userData.data.data.pctUsersCount180d,
                                'instagram.$.pctFakeFollowers': userData.data.data.pctFakeFollowers,
                                'instagram.$.avgLikes': userData.data.data.avgLikes,
                                'instagram.$.avgComments': userData.data.data.avgComments,
                                'instagram.$.avgVideoLikes': userData.data.data.avgVideoLikes,
                                'instagram.$.avgVideoComments': userData.data.data.avgVideoComments,
                                'instagram.$.avgVideoViews': userData.data.data.avgVideoViews,
                                'instagram.$.country': userData.data.data.country,
                                'instagram.$.age': userData.data.data.age,
                                'instagram.$.categories': userData.data.data.categories,
                                'instagram.$.qualityScore': userData.data.data.qualityScore,
                                'instagram.$.gender': userData.data.data.gender
                            }
                        })
                        res.status(201).send("data Updated!!!");
                    })
                    .catch((error) => {
                        res.status(400).send("Unable to UpdateData.....");
                    })
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },

    UpdateUserDataFromYoutube: async (req, res) => {
        try {
            const url = req.body.user_name;
            const record = InfluencerProfile.findOne({ Youtube_detail: { $elemMatch: { "Youtube_link": url } } })
            if (!record) {
                res.status(400).send(error);
            } else {
                const config = {
                    headers: {
                        'X-RapidAPI-Key': process.env.RapidKey,
                        'X-RapidAPI-Host': process.env.RapidHost
                    }
                };
                const userData = await axios.get(
                    `https://instagram-statistics-api.p.rapidapi.com/community?url=${url}`, config)
                    .then(async (userData) => {
                        console.log(userData.data.data.cid)
                        const updated = await InfluencerProfile.findOne({ Youtube_detail: { $elemMatch: { "Youtube_link": url } } }).updateOne({
                            $set: {
                                'youtube.$.cid': userData.data.data.cid,
                                'youtube.$.socialType': userData.data.data.socialType,
                                'youtube.$.groupID': userData.data.data.groupID,
                                'youtube.$.name': userData.data.data.name,
                                'youtube.$.image': userData.data.data.image,
                                'youtube.$.description': userData.data.data.description,
                                'youtube.$.screenName': userData.data.data.screenName,
                                'youtube.$.usersCount': userData.data.data.usersCount,
                                'youtube.$.communityStatus': userData.data.data.communityStatus,
                                'youtube.$.avgER': userData.data.data.avgER,
                                'youtube.$.avgInteractions': userData.data.data.avgInteractions,
                                'youtube.$.avgViews': userData.data.data.avgViews,
                                'youtube.$.ratingIndex': userData.data.data.ratingIndex,
                                'youtube.$.tags': userData.data.data.tags,
                                'youtube.$.suggestedTags': userData.data.data.suggestedTags,
                                'youtube.$.ratingTags': userData.data.data.ratingTags,
                                'youtube.$.lastPosts': userData.data.data.lastPosts,
                                'youtube.$.countries': userData.data.data.countries,
                                'youtube.$.lastFromMentions': userData.data.data.lastFromMentions,
                                'youtube.$.genders': userData.data.data.genders,
                                'youtube.$.ages': userData.data.data.ages,
                                'youtube.$.interests': userData.data.data.interests,
                                'youtube.$.toMentions180d': userData.data.data.toMentions180d,
                                'youtube.$.toMentionsCommunities180d': userData.data.data.toMentionsCommunities180d,
                                'youtube.$.toMentionsViews180d': userData.data.data.toMentionsViews180d,
                                'youtube.$.fromMentions180d': userData.data.data.fromMentions180d,
                                'youtube.$.fromMentionsCommunities180d': userData.data.data.fromMentionsCommunities180d,
                                'youtube.$.fromMentionsViews180d': userData.data.data.fromMentionsViews180d,
                                'youtube.$.pctUsersCount180d': userData.data.data.pctUsersCount180d,
                                'youtube.$.pctFakeFollowers': userData.data.data.pctFakeFollowers,
                                'youtube.$.avgLikes': userData.data.data.avgLikes,
                                'youtube.$.avgComments': userData.data.data.avgComments,
                                'youtube.$.avgVideoLikes': userData.data.data.avgVideoLikes,
                                'youtube.$.avgVideoComments': userData.data.data.avgVideoComments,
                                'youtube.$.avgVideoViews': userData.data.data.avgVideoViews,
                                'youtube.$.country': userData.data.data.country,
                                'youtube.$.age': userData.data.data.age,
                                'youtube.$.categories': userData.data.data.categories,
                                'youtube.$.qualityScore': userData.data.data.qualityScore,
                                'youtube.$.gender': userData.data.data.gender
                            }
                        })
                        res.status(201).send("data Updated!!!");
                    })
                    .catch((error) => {
                        res.status(400).send("Unable to UpdateData.....");
                    })
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //Data returning on the basis of categories for instagram
    CatagoriesData: async (req, res) => {
        try {
            let record = []
            const data = req.params.categories;
            const find = await InfluencerProfile.find({ categories: { $elemMatch: { $eq: data } } });
            for (i = 0; i < find.length; i++) {
                record.push({ "Influencer_Email": find[i].email, "Influencer_Image_url": find[i].image, "InfluencerName": find[i].name, "InfluencerFollowers": find[i].usersCount, "InfluencerQualityScore": find[i].qualityScore, "InfluencerAvgLikes": find[i].avgLikes, "InfluencerAvgReelsView": find[i].avgVideoViews, "InfluencerER": find[i].avgER, "InfluencerLocation": find[i].country, "InfluencerCategories": find[i].categories })
            }
            res.status(201).send(record);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //fetching influencer detail
    InfluencerData: async (req, res) => {
        try {
            const data = req.params.email;
            const find = await InfluencerProfile.findOne({ email: data });
            res.status(201).send(find);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    //search Influencer on basis of filter 
    SearchInstaInfluencerWithFilter: async (req, res) => {
        try {
            const { handleName, YT, tags, minLikes, maxLikes, categories, name, username, socialType, country, gender, minage, maxage, minViews, MaxViews, maxfollowers, minfollowers } = req.body
            let record = [];
            let data, datail;
            if (handleName == "Instagram" && YT == '') {
                //////////////////////////////////////////////////////////////////////////////////////
                //>Providing condition to fetch data off all user as per search <//
                //////////////////////////////////////////////////////////////////////////////////////
                if (categories != [] && username == '' && name == '' && tags == '') {
                    data = await InfluencerProfile.find({ ContentCategories: { $elemMatch: { $in: categories } } });
                }
                else if ((categories.length === 0) && username != '' && name == '' && tags == '') {
                    data = await InfluencerProfile.find({ instagram: { $elemMatch: { screenName: { $regex: username, $options: 'i' } } } });
                }
                else if ((categories.length === 0) && username == '' && name == '' && tags != '') {
                    data = await InfluencerProfile.find({ instagram: { $elemMatch: { tags: { $elemMatch: { $regex: tags, $options: 'i' } } } } });
                }
                else if ((categories.length === 0) && username == '' && name != '' && tags == '') {
                    data = await InfluencerProfile.find({ instagram: { $elemMatch: { name: { $regex: name, $options: 'i' } } } });
                } else if ((categories.length === 0) && username == '' && name == '' && tags == '') {
                    console.log("hii");
                    data = ''
                } else {
                    console.log("hii")
                    data = "."
                }

                if (data != '' || data != ".") {
                    const search = await data.filter(e => {
                        e.instagram.filter(s => {

                            /////////////////////////////////////////////////////////////////////////////////////
                            //>Applying filter with different situation<//
                            /////////////////////////////////////////////////////////////////////////////////////
                            //>searching without giving gender location and socialtype and with follower situation<//


                            if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == '' && country == '' && socialType == '') && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first")
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }
                            //searching with all the three with follower situation
                            else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == s.gender && country == s.country && socialType == s.socialType) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first2");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }


                            //searching with single from the three situation with follower situation

                            else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == s.gender && country == s.country && socialType == "") && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first21");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }

                            else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == s.gender && country == "" && socialType == s.socialType) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first22");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }

                            else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == "" && country == s.country && socialType == s.socialType) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first23");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }


                            //searching with any two situatuion with follower situation
                            else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (s.gender == gender && country == "" && socialType == "") && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first123");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }


                            else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == "" && s.country == country && socialType == "") && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first122");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }


                            else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == "" && country == "" && s.socialType == socialType) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first121");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }

                            //searching with any one situation without follower situation

                            else if ((s.gender == gender && country == '' && socialType == '' && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first12");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }

                            else if ((gender == '' && s.country == country && socialType == "" && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first13");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }


                            else if ((gender == "" && country == "" && s.socialType == socialType && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first14");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }
                            //searching with any two situation without follower situation 
                            else if ((s.gender == gender && country == s.country && socialType == '' && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first12");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }
                            else if ((s.gender == gender && country == '' && socialType == s.socialType && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first12");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }

                            //searching with all three situation without follower situations
                            else if ((s.gender == '' && country == s.country && socialType == s.socialType && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                console.log("first12");
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }
                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                            //>tag situation>//

                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                            else if ((minfollowers <= s.usersCount || maxfollowers >= s.usersCount || minLikes <= s.avgLikes || maxLikes >= s.avgLikes || minViews <= s.avgVideoViews || MaxViews >= s.avgVideoViews || minage <= s.age || maxage <= s.age || s.gender == gender || s.country == country || s.socialType == socialType) && (categories.length === 0) && username == '' && name == '' && tags != '') {
                                console.log("third")
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })

                            }

                            //getting profile data for user
                            else if ((categories.length === 0) && tags == "" && (name != "" || username != "")) {
                                record.push(e);
                                console.log("second")
                            }

                            //getting categories data from search
                            else if (categories != [] && gender == '' && socialType == '' && country == '' && minLikes == null && minage == null && maxfollowers == null) {
                                console.log("fifth")
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            }

                            else {
                                console.log("fourth")
                                record.push()

                            }
                        })
                    })
                    console.log(record);
                    if (record.length == 0) {
                        res.status(201).send("No Record found!");
                    } else {
                        res.status(201).send(record);
                    }

                } else if (data == '') {
                    console.log("Hii");
                    datail = await InfluencerProfile.find().then((response) => {
                        console.log(response);
                        response.filter(e => {
                            e.instagram.filter(s => {
                                console.log("first113344")
                                record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                            })
                        })
                        console.log(record);
                        res.status(201).send(record);
                    }).catch((error) => {
                        console.log(error);
                    })
                } else {
                    res.status(201).send("No record found!..")
                }
            } else if (handleName == "Youtube") {
                if (YT == "channel") {
                    //////////////////////////////////////////////////////////////////////////////////////
                    //>Providing condition to fetch data off all user as per search <//
                    //////////////////////////////////////////////////////////////////////////////////////
                    if (categories != [] && username == '' && name == '' && tags == '') {
                        data = await InfluencerProfile.find({ ContentCategories: { $elemMatch: { $in: categories } } });
                    }
                    else if ((categories.length === 0) && username != '' && name == '' && tags == '') {
                        data = await InfluencerProfile.find({ youtube: { $elemMatch: { screenName: { $regex: username, $options: 'i' } } } });
                    }
                    else if ((categories.length === 0) && username == '' && name == '' && tags != '') {
                        data = await InfluencerProfile.find({ youtube: { $elemMatch: { tags: { $elemMatch: { $regex: tags, $options: 'i' } } } } });
                    }
                    else if ((categories.length === 0) && username == '' && name != '' && tags == '') {
                        data = await InfluencerProfile.find({ youtube: { $elemMatch: { name: { $regex: name, $options: 'i' } } } });
                    } else if ((categories.length === 0) && username == '' && name == '' && tags == '') {
                        console.log("hii");
                        data = ''
                    } else {
                        data = "."
                    }

                    if (data != '' || data != ".") {
                        const search = await data.filter(e => {
                            e.youtube.filter(s => {

                                /////////////////////////////////////////////////////////////////////////////////////
                                //>Applying filter with different situation<//
                                /////////////////////////////////////////////////////////////////////////////////////
                                //>searching without giving gender location and socialtype and with follower situation<//


                                if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == '' && country == '' && socialType == '') && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first")
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }
                                //searching with all the three with follower situation
                                else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == s.gender && country == s.country && socialType == s.socialType) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first2");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }


                                //searching with single from the three situation with follower situation

                                else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == s.gender && country == s.country && socialType == "") && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first21");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }

                                else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == s.gender && country == "" && socialType == s.socialType) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first22");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }

                                else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == "" && country == s.country && socialType == s.socialType) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first23");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }


                                //searching with any two situatuion with follower situation
                                else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (s.gender == gender && country == "" && socialType == "") && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first123");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }


                                else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == "" && s.country == country && socialType == "") && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first122");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }


                                else if (((minfollowers <= s.usersCount && maxfollowers >= s.usersCount) || (minLikes <= s.avgLikes && maxLikes >= s.avgLikes) || (minViews <= s.avgVideoViews && MaxViews >= s.avgVideoViews) || (minage <= s.age && maxage <= s.age)) && (gender == "" && country == "" && s.socialType == socialType) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first121");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }

                                //searching with any one situation without follower situation

                                else if ((s.gender == gender && country == '' && socialType == '' && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first12");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }

                                else if ((gender == '' && s.country == country && socialType == "" && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first13");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }


                                else if ((gender == "" && country == "" && s.socialType == socialType && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first14");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }
                                //searching with any two situation without follower situation 
                                else if ((s.gender == gender && country == s.country && socialType == '' && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first12");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }
                                else if ((s.gender == gender && country == '' && socialType == s.socialType && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first12");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }

                                //searching with all three situation without follower situations
                                else if ((s.gender == '' && country == s.country && socialType == s.socialType && minLikes == null && minage == null && maxfollowers == null) && username == '' && name == '' && categories != [] && tags == '') {
                                    console.log("first12");
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }
                                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                //>tag situation>//

                                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                else if ((minfollowers <= s.usersCount || maxfollowers >= s.usersCount || minLikes <= s.avgLikes || maxLikes >= s.avgLikes || minViews <= s.avgVideoViews || MaxViews >= s.avgVideoViews || minage <= s.age || maxage <= s.age || s.gender == gender || s.country == country || s.socialType == socialType) && (categories.length === 0) && username == '' && name == '' && tags != '') {
                                    console.log("third")
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })

                                }

                                //getting profile data for user
                                else if ((categories.length === 0) && tags == "" && (name != "" || username != "")) {
                                    record.push(e);
                                    console.log("second")
                                }

                                //getting categories data from search
                                else if (categories != [] && gender == '' && socialType == '' && country == '' && minLikes == null && minage == null && maxfollowers == null) {
                                    console.log("fifth")
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                }

                                else {
                                    console.log("fourth")
                                    record.push()

                                }
                            })
                        })
                        console.log(record);
                        if (record.length == 0) {
                            res.status(201).send("No Record found!");
                        } else {
                            res.status(201).send(record);
                        }

                    } else if (data == '') {
                        console.log("Hii");
                        datail = await InfluencerProfile.find().then((response) => {
                            console.log(response);
                            response.filter(e => {
                                e.youtube.filter(s => {
                                    console.log("first113344")
                                    record.push({ "Influencer_email": e.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })
                                })
                            })
                            console.log(record);
                            res.status(201).send(record);
                        }).catch((error) => {
                            console.log(error);
                        })
                    } else {
                        res.status(201).send("No record found!..")
                    }
                } else {
                    res.status(400).send("Please provide proper detail..")
                }
            } else if (handleName == "Youtube") {
                

            }
            else {
                res.status(400).send("Please Provide the handle Name");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //Getting last search
    LastSearchHistory: async (req, res) => {
        try {
            const BrandName = req.params.name;
            const record = await dumpRecord.findOne({ Finder: BrandName });
            if (record) {
                res.status(201).send({ "data": record.LastSearch })
            } else {
                res.status(400).send(error);
            }

        } catch (error) {
            res.status(400).send(error)
        }
    },
    //Validating influencer for Manual Add
    ValidatingApiForInfluencer: async (erq, res) => {
        try {
            const {
                handleName,
                username
            } = req.body
            if (handleName == Instagram) {
                const record = await InfluencerProfile.findOne({ Instagram_detail: { $elemMatch: { ' Instagram_username': username } } });
                if (record) {
                    res.send("Proceed to add Influencer...")
                } else {
                    res.send("credentionals are invalid..");
                }
            } else if (handleName == Youtube) {
                const record = await InfluencerProfile.findOne({ Youtube_detail: { $elemMatch: { ' youtube_username': username } } });
                if (record) {
                    res.send("Proceed to add Influencer...")
                } else {
                    res.send("credentionals are invalid..");
                }

            } else {
                res.status(404).send("Inappropraite information ....")
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //getting categories distinct list
    CategoriesList: async (req, res) => {
        try {
            const record = await InfluencerProfile.distinct('categories');
            res.status(201).send(record);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //getting tags distinct list
    tagsList: async (req, res) => {
        try {
            const record = await InfluencerProfile.distinct('tags');
            res.status(201).send(record);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getCategoriesAndHandleData: async (req, res) => {
        try {
            let record = [];
            const { handleName, categories } = req.body;
            if (handleName == "all" && categories == "all") {
                const info = await InfluencerProfile.distinct('ContentCategories');
                if (info.length != 0) {
                    for (let i = 0; i < info.length; i++) {
                        console.log(info[i]);
                        let data = await InfluencerProfile.find({ ContentCategories: { $elemMatch: { $eq: info[i] } } }).then(async (data) => {
                            const search = data.filter(s => {
                                console.log("hii");
                                record.push({ "Influencer_email": s.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })

                            })

                        })
                    }
                }
            } else if (handleName == "all" && categories != "all") {
                let data = await InfluencerProfile.find({ ContentCategories: { $elemMatch: { $eq: categories } } }).then(async (data) => {
                    const search = data.filter(s => {
                        console.log("hii");
                        record.push({ "Influencer_email": s.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })

                    })

                })

            } else if (handleName == "Instagram" && categories == "all") {
                const info = await InfluencerProfile.distinct('ContentCategories');
                if (info.length != 0) {
                    for (let i = 0; i < info.length; i++) {
                        console.log(info[i]);
                        let data = await InfluencerProfile.find({ ContentCategories: { $elemMatch: { $eq: info[i] } } }).then(async (data) => {
                            const search = data.filter(s => {
                                console.log("hii");
                                record.push({ "Influencer_email": s.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })

                            })

                        })
                    }
                }
            } else if (handleName == "Youtube" && categories == "all") {
                const info = await InfluencerProfile.distinct('ContentCategories');
                if (info.length != 0) {
                    for (let i = 0; i < info.length; i++) {
                        console.log(info[i]);
                        let data = await InfluencerProfile.find({ ContentCategories: { $elemMatch: { $eq: info[i] } } }).then(async (data) => {
                            const search = data.filter(s => {
                                console.log("hii");
                                record.push({ "Influencer_email": s.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })

                            })

                        })
                    }
                }
            } else if (handleName == "Instagram" && categories != "all") {

                let data = await InfluencerProfile.find({ ContentCategories: { $elemMatch: { $eq: categories } } }).then(async (data) => {
                    const search = data.filter(s => {
                        console.log("hii");
                        record.push({ "Influencer_email": s.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })

                    })



                })
            } else if (handleName == "Youtube" && categories != "all") {
                if (info.length != 0) {
                    for (let i = 0; i < info.length; i++) {
                        console.log(info[i]);
                        let data = await InfluencerProfile.find({ ContentCategories: { $elemMatch: { $eq: categories } } }).then(async (data) => {
                            const search = data.filter(s => {
                                console.log("hii");
                                record.push({ "Influencer_email": s.email, "Influencer_Image_url": s.image, "InfluencerName": s.name, "InfluencerFollowers": s.usersCount, "InfluencerQualityScore": s.qualityScore, "InfluencerAvgLikes": s.avgLikes, "InfluencerAvgReelsView": s.avgVideoViews, "InfluencerER": s.avgER, "InfluencerLocation": s.country, "InfluencerCategories": s.categories })

                            })

                        })
                    }
                }
            }
            if (record.length != 0) {
                res.status(201).send(record)
            } else {
                res.status(200).send("No record Found")
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    UserValidate: async (req, res) => {
        try {
            //screenName

            const { handleName, username } = req.body;
            if (handleName == "Instagram") {
                const view = await InfluencerProfile.findOne({ screenName: username })

                //console.log(view);
                if (view) {
                    res.status(201).send({ "status": "Verifiyed", "data": view });
                } else {
                    res.status(400).semd("No Record Found!")
                }
            } else if (handleName == "Youtube") {
                res.status(201).send("Under Maintainance...")
            }
        } catch (error) {
            res.status(400).send("no record found!")
        }
    }
}