const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyparser = require("body-parser");
const express = require("express");
const Brand_detail = require("../models/brandsModel");
const Plans_detail = require("../models/plans.Model")
const OtpModel = require('../models/Otp.models');
const Service = require("../services/otpgenrator.services");
const axios = require("axios");
const InfluencerProfile = require("../models/influencerModel");
const qs = require('qs');
module.exports = {
    //Brands Login api...
    brandLogin: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user_email = await Brand_detail.findOne({ email: email });
            if (!user_email) {
                res.status(400).send("You can not perform this Action!!")
            } else {
                const ismatch = await bcrypt.compare(password, user_email.password);
                const paru = jwt.sign({ email: email }, process.env.SECRET_FOR_TOKEN);
                let Id = user_email._id;
                if (ismatch) {
                    res.status(201).send({ paru, Id });
                    //just need to change send to render and then the page in doble quates for routes
                } else {
                    res.status(400).send("bad request");
                }
            }

        } catch (err) {
            res.status(400).send("invalid data entry");
        }
    },
    //sendOtp
    sendOtp: async (req, res) => {
        try {
            const otp = Service.generateOtp(5);
            console.log(otp);
            const number = req.body.email;
            const message = `hii! Your OTP is ${otp}`;
            console.log(number);
            console.log(message);
            console.log(otp);
            const user_email = await Brand_detail.findOne({ email: number });
            if (!user_email) {
                res.status(400).send("Invalid Credentials..")
            } else {
                const options = {
                    method: 'POST',
                    url: 'https://textflow-sms-api.p.rapidapi.com/send-sms',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '9544bfc62dmshc1be9a8c1689638p1fcc52jsne76d551a193c',
                        'X-RapidAPI-Host': 'textflow-sms-api.p.rapidapi.com'
                    },
                    data: {
                        phone_number: number,
                        text: message
                    }
                };
                const response = await axios.request(options)
                if (response) {
                    const data = new OtpModel({
                        email: number,
                        otp: otp
                    }).save();
                    res.status(201).send("Otp sent sucessfully");
                } else {
                    res.status(400).send("unable to send Otp");
                }

            }

        } catch (error) {
            res.status(400).send(error);
        }
    },

    //Login with Otp
    loginWithOtp: async (req, res) => {
        try {
            const otp = req.body.otp;
            const number = req.body.email
            const verify = await OtpModel.findOne({ otp: otp, email: number });;
            if (verify) {
                res.status(201).send("Number verified sucessfully!!")
            } else {
                res.status(400).send("incorrect otp!!");
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //UpdateProfile of Brands
    UpdateData: async (req, res) => {
        try {
            const BrandName = req.params.BrandName;
            const { email, phone, photo, name } = req.body;
            const updateRecord = await Brand_detail.findOne({ Brand_name: BrandName }).updateOne({
                $set: {
                    email,
                    name,
                    phone,
                    photo
                }
            });
            if (updateRecord.length != 0) {
                res.status(201).send("Updated Details...")
            } else {
                res.status(400).send("Unable to Update record!..")
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //show brand data
    showUpdatedData: async (req, res) => {
        try {
            const BrandName = req.params.BrandName;
            const updateRecord = await Brand_detail.findOne({ Brand_name: BrandName })
            if (updateRecord.length != 0) {
                res.status(201).send({ "Name": updateRecord.name, "Email": updateRecord.email });
            } else {
                res.status(400).send("Unable to Update record!..")
            }
        } catch (error) {
            res.status(400).send(error);
        }
    },
    //Brands Register api..
    brandRegister: async (req, res) => {
        console.log(req.body);
        const password = req.body.password;
        const cpassword = req.body.repassword;
        if (password == cpassword) {
            const user = new Brand_detail({
                Brand_name: req.body.admin_name,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                repassword: req.body.repassword,
                phone: req.body.phone,
            });

            user.save().then(() => {
                res.status(201).send(user);

            }).catch((error) => {
                res.status(400).send(error);
            });


        } else {
            res.status(400).send("password is not matching");
        }

    },
    //Brands reset Password api...
    resetBrandsPassword: async (req, res) => {
        try {
            const oldpassword = req.body.old;
            const id = req.params.id;
            const newpassword = req.body.neew;
            const cpassword = req.body.cpassword;
            const old = await Brand_detail.findOne({ _id: id });
            console.log(old);
            const check = await bcrypt.compare(oldpassword, old.password);
            if (!check) {
                res.status(201).send("password is incorrect!!")
            }
            else {
                if (newpassword == cpassword) {
                    let lt = await bcrypt.hash(newpassword, 10);
                    console.log(lt);
                    const ll = await (lt).toString();
                    console.log(ll)
                    const Brand_data = await Brand_detail.findByIdAndUpdate(id, {
                        $set: { password: ll }
                    }).then(() => {
                        res.status(201).send("succesfully checked");
                    }).catch((error) => {
                        res.status(400).send("error");
                    });
                }
                else {
                    res.status(200).send("passwrod not matched");
                }
            }
        } catch (error) {
            res.status(400).send(error + "error occured");
        }
    },
    //plans and list creation and update
    //adding influencer to list    
    AddingInfluencerToList: async (req, res) => {
        try {
            let record = []
            let Influencer = []
            let name = []
            const { planName, ListName, InfluencerER, InfluencerViews, Influencerlikes, InfluencerImage, InfluencerName } = req.body;

            const search = await Plans_detail.findOne({ PlanName: planName, list: { $elemMatch: { 'ListName': ListName } } });
            if (search) {
                //console.log(search)
                record.push({ search });
                //console.log( InfluencerER[1]);

                search.list.filter(s => {
                    if (s.ListName == ListName) {
                        s.Influencer.filter(e => {
                            name.push(e.InfluencerName);
                        })
                    }
                })
                console.log(name);
                for (i = 0; i < InfluencerName.length; i++) {
                    if (!name.includes(InfluencerName[i])) {
                        Influencer.push({
                            "InfluencerName": InfluencerName[i],
                            "InfluencerImage": InfluencerImage[i],
                            "Influencerlikes": Influencerlikes[i],
                            "InfluencerViews": InfluencerViews[i],
                            "InfluencerER": InfluencerER[i]
                        })
                    }
                };


                if (record.length != 0) {
                    //console.log("hii");
                    let update = await Plans_detail.findOne({ PlanName: planName, list: { $elemMatch: { 'ListName': ListName } } }).updateOne({
                        $push: {
                            'list.$.Influencer': Influencer
                        }
                    }).then((response) => {
                        res.status(201).send("InfluencerAdded Sucessfully..")
                    }).catch((error) => {
                        res.status(400).send("error while Processing...")
                    })

                } else {
                    res.status(400).send("Create a list first!!")
                }
            } else {
                res.status(200).send("No recod Found!")
            }
        } catch (error) {
            res.status(400).send("error while Processing...")
        }
    },
    //List creating api....
    ListCreation: async (req, res) => {
        try {
            const { list, PlanName } = req.body
            console.log(list)
            let rec
            let temp1, temp2, temp3
            let name = list.filter(s => {
                rec = s.ListName
                temp1 = s.deliverables
                temp2 = s.Platforms
                temp3 = s.Influencer
            })
            console.log(rec);
            console.log(temp1);
            console.log(temp2);
            console.log(temp3);

            const searchPlan = await Plans_detail.findOne({ PlanName: PlanName })
            if (searchPlan) {
                const search = await Plans_detail.findOne({ PlanName: PlanName, list: { $elemMatch: { 'ListName': rec } } });

                if (search == null) {
                    console.log("Hello")
                    const record = await Plans_detail.findOne({ PlanName: PlanName }).updateOne({
                        $push: {
                            list:list
                        }
                    })
                    .then((response) => {
                        res.status(201).send("Record Updated!!")
                    }).catch((error) => {
                        res.status(400).send("Unable To Update Record!!")
                    })
                } else {
                    console.log("hello")
                    if (temp3.length == 0) {
                        console.log("hii");
                        const record = await Plans_detail.findOne({ PlanName: PlanName, list: { $elemMatch: { 'ListName': rec } } }).updateOne({
                            $set: {
                                'list.$.ListName': rec,
                                'list.$.deliverables': temp1,
                                'list.$.Platforms': temp2,
                            }
                        }).then((response) => {
                            res.status(201).send("Record Updated!!")
                        }).catch((error) => {
                            res.status(400).send("Unable To Update Record!!")
                        })
                    } else {
                        console.log("Hii");
                        const record = await Plans_detail.findOne({ PlanName: PlanName, list: { $elemMatch: { 'ListName': rec } } }).updateOne({
                            $set: {
                                'list.$.ListName': rec,
                                'list.$.deliverables': temp1,
                                'list.$.Platforms': temp2,
                                'list.$.Influencer': temp3
                            }
                        }).then((response) => {
                            res.status(201).send("Record Updated!!")
                        }).catch((error) => {
                            res.status(400).send("Unable To Update Record!!")
                        })
                    }
                }
            } else {
                res.status(200).send("No such record Foumd!..")
            }

        } catch (error) {
            res.status(400).send(error);
        }
    },
    //plan creation api...
    PlanCreation: async (req, res) => {
        try {
            const {
                Brand_name,
                PlanName,

            } = req.body
            let date=new Date();
            const newPlan = new Plans_detail({
                Brand_name,
                PlanName,
                CreatedAt:date,
                status: "Active"

            });
            console.log(newPlan)
            newPlan.save().then(() => {
                res.status(201).send(newPlan);

            }).catch((error) => {
                res.status(400).send(error);
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },
    //api for getting brands detail
    GetBrandDetail: async (req, res) => {
        try {
            const Brand_name = req.params.Brand_name
            const Detail = await Brand_detail.findOne({ Brand_name: Brand_name });
            if (Detail) {
                res.status(201).send(Detail)
            } else {
                res.status(400).send("invalid detail")
            }
        } catch (error) {
            res.status(400).send(error)
        }
    },
    //api for getting plan detail
    GetPlanDetail: async (req, res) => {
        try {
            const Brand_name = req.params.Brand_name;
            const PlanName = req.params.PlanName;
            const Detail = await Plans_detail.findOne({ Brand_name: Brand_name, PlanName: PlanName });
            if (Detail) {
                res.status(201).send(Detail)
            } else {
                res.status(400).send("invalid detail")
            }
        } catch (error) {
            res.status(400).send(error)
        }
    },
    //api for archiving the plan..
    ArchivePlan: async (req, res) => {
        try {
            const planName = req.body.planname;
            const planDetail = await Plans_detail.findOne({ PlanName: planName, status: "Active" }).updateOne({
                $set: {
                    status: "Archive"
                }
            })
            res.status(201).send("Sucessfully Archive the plan..")
        } catch (error) {
            res.status(400).send(error)
        }
    },
    //api for unarchive the plan..
    UnArchivePlan: async (req, res) => {
        try {
            const planName = req.body.planname;
            const planDetail = await Plans_detail.findOne({ PlanName: planName, status: "Archive" }).updateOne({
                $set: {
                    status: "Active"
                }
            })
            res.status(201).send("Sucessfully UnArchive the plan..")
        } catch (error) {
            res.status(400).send(error)
        }
    },

    //api for sending information via watsaap..
    SendWatsappMessage: async (req, res) => {
        try {
            const {Influencer_email,planName,ListName,link } = req.body
            let message
            let plan_id
            const record=await InfluencerProfile.findOne({name:Influencer_email});
            const plandetails=await  Plans_detail.findOne({ PlanName: planName, list: { $elemMatch: { 'ListName': ListName } } })
            //console.log(plandetails);
            let phone=`+91${record.watsaap}`;
            let plandetail=plandetails.list.filter(s=>{
                if(s.ListName==ListName){
                    plan_id=s._id;

                }
            })
            message=`hii ${Influencer_email},you have been selected for plan details where deliverables ID is ${plan_id} 
            Insert the Id on the link  On browser to see Details 
            Copy and Paste link on Browser:${link}`
            //console.log(message);
            
            //console.log(phone)
            let data = qs.stringify({
                "token": "zpu66z0oeputad15",
                "to": phone,
                "body": message
            });

            const  config = {
                method: 'post',
                url: 'https://api.ultramsg.com/instance54937/messages/chat',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    //console.log(JSON.stringify(response.data));
                    res.status(201).send("Message Sent Suceessfully...")
                })
                .catch(function (error) {
                    //console.log(error);
                    res.status(400).send("Error...")
                });
        } catch (error) {
            res.status(201).send(error);
        }
    },
    //info of extra pages
    InfoWithQueryAns: async (req, res) => {
        try {
            const {
                email,
                companySize,
                CampaignFrequency,
                hopewithDREABEE

            } = req.body
            const record = await Brand_detail.findOne({ email: email }).updateOne({
                $set: {
                    companySize,
                    CampaignFrequency,
                    hopewithDREABEE
                }
            })
            if (record) {
                res.status(201).send("record updated sucessfully..")
            } else {
                res.status(400).send("Errorwhile updatinng record..")
            }
        } catch (error) {
            res.status(400).send(error);
        }

    },
    //api for list name
    listNameGetDetails: async (req, res) => {
        try {
            let record = []
            const Brand_name = req.params.Brand_name;
            const planName = req.params.PlanName;
            const search = await Plans_detail.findOne({ PlanName: planName, Brand_name: Brand_name });
            console.log(search)
            let data = await search.list.filter(s => {
                console.log(s)
                record.push({ "ListName": s.ListName })
            })
            if (record.length != 0) {
                res.status(201).send(record)
            } else {
                res.status(201).send("create list!!")
            }

        } catch (error) {
            res.status(400).send(error)
        }
    },
    //delete plan
    deletePlan: async (req, res) => {
        try {
            const deletePlan = await Plans_detail.findByIdAndDelete(req.params.id);
            res.status(201).send(deletePlan);
        } catch (error) {
            res.status(400).send(error)
        }
    },
    //delete list 
    deletelist: async (req, res) => {
        try {
            let list = []
            let temp = []
            const id = req.params.ListName;
            const Planid = req.params.PlanName;
            //const query={list: { $elemMatch: { 'ListName': id } }}
            //finding the plan
            const search = await Plans_detail.findOne({ PlanName: Planid });
            //console.log(search)
            //using temp list filtering or removing the list by name
            temp.push(search)
            let research = temp.filter(s => {
                s.list.filter(a => {
                    if (a.ListName != id) {
                        list.push(a);
                    }
                });
            })
            //Perform the update
            let record = await Plans_detail.findOne({ PlanName: Planid, list: { $elemMatch: { 'ListName': id } } }).updateOne({
                $set: {
                    list: list
                }
            }).then((response) => {
                res.status(201).send("Record deleted sucessfully!!");
            }).catch((error) => {
                res.status(400).send("No Such Record Found!..")
            })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    //delete Influencer
    deleteInfluencer: async (req, res) => {
        try {
            let Influencer = []
            let temp = []
            const id = req.params.ListName;
            const Planid = req.params.InfluencerName;
            //const query={list: { $elemMatch: { 'ListName': id } }}
            //finding the plan
            const search = await Plans_detail.findOne({ list: { $elemMatch: { 'ListName': id } } });
            //console.log(search)
            //using temp list filtering or removing the list by name
            temp.push(search)
            let research = await temp.filter(s => {
                s.list.filter(a => {
                    a.Influencer.filter(s => {
                        console.log(s.InfluencerName)
                        if (s.InfluencerName != Planid) {
                            Influencer.push(s)
                        }
                    })
                })
            })
            console.log(Influencer);
            //Perform the update
            let update = await Plans_detail.findOne({ list: { $elemMatch: { 'ListName': id } } }).updateOne({
                $set: {
                    'list.$.Influencer': Influencer
                }
            }).then((response) => {
                res.status(201).send("Record deleted sucessfully!!");
            }).catch((error) => {
                res.status(400).send("No Such Record Found!..")
            })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    //get api for Influencer Details
    GetInfluencerDetails: async (req, res) => {
        try {
            let record = []
            let temp = []
            const planName = req.params.ListName;
            const search = await Plans_detail.findOne({ list: { $elemMatch: { 'ListName': planName } } });
            console.log(search)
            temp.push(search)
            temp.filter(e => {
                e.list.filter(s => {
                    s.Influencer.filter(a => {
                        record.push(a)
                    })
                })
            })
            if (record.length != 0) {
                res.status(201).send(record)
            } else {
                res.status(201).send("create list!!")
            }

        } catch (error) {
            res.status(400).send(error)
        }
    },
    Detail:async(req,res)=>{
        try{
            const record=await Plans_detail.find()
            res.status(201).send(record)
        }catch(error){
            res.status(400).send(error)
        }
    },
    Active_Detail:async(req,res)=>{
        try{
            const record=await Plans_detail.find( {status: "Active"} )
            res.status(201).send(record)
        }catch(error){
            res.status(400).send(error)
        }
    },
    Archive_Detail:async(req,res)=>{
        try{
            const record=await Plans_detail.find( {status: "Archive"} )
            res.status(201).send(record)
        }catch(error){
            res.status(400).send(error)
        }
    }
}