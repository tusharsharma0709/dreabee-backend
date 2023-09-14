const campaign_detail = require("../models/campaign.models");
module.exports = {
    //api for creating draft
    createCampaignPreferences: async (req, res) => {
        try {
            const {
                BrandName,
                workAs,
                CreatorPreferences,
                ProfileS


            } = req.body;
            let newRecord = new campaign_detail({
                BrandName,
                workAs,
                CreatorPreferences,
                ProfileS,
                status: "Draft"
            })
            newRecord.save().then(() => {
                res.status(201).send(newRecord)
            }).catch((error) => {
                console.log(error)
            })

        } catch (error) {
            res.status(400).send(error);
        }

    },
    //setting functionality for review
    completeCampaign: async (req, res) => {
        try {
            const _id=req.params.id;
            const {
                
                BrandName
            } = req.body;
            const date=new Date();
            console.log(date);
            let Record = await campaign_detail.findOne({ _id , status:"Draft"});
            console.log(Record)
            if(Record!=null){
            let newRecord = await campaign_detail.findOne({ _id , status:"Draft"}).updateOne({
                $set: {
                    status:"Under_Review",
                    CreatedAt:date

                }
            })
                .then((response) => {
                    res.status(201).send("Succesfully Submited")
                }).catch((error) => {
                    res.status(201).send("Your record is Under Review State...")
                })
            }else{
                res.status(200).send("Allready Submitted..")
            }
                
        } catch (error) {
            res.status(400).send(error);
        }

    },
    //archiving campaign
    ArchiveCampaign: async (req, res) => {
        try {
            const _id=req.params.id;
            const {
             
                BrandName
            } = req.body;
            let newRecord =await campaign_detail.findOne({_id ,status:"Active"}).updateOne({
                $set: {
                    status: "Archive"
                }

            })
                .then((newRecord) => {
                    res.status(201).send(newRecord)
                }).catch((error) => {
                    console.log(error)
                })
                
        } catch (error) {
            res.status(400).send(error);
        }

    },
    //unarchivimg campaign
    UnArchiveCampaign: async (req, res) => {
        try {
            const _id=req.params.id;
            const {
                BrandName
            } = req.body;
            let newRecord = await campaign_detail.findOne({_id,status:"Archive" }).updateOne({
                $set: {
                    status: "Active"
                }

            })
                .then((newRecord) => {
                    res.status(201).send(newRecord)
                }).catch((error) => {
                    console.log(error)
                })
                
        } catch (error) {
            res.status(400).send(error);
        }

    },
    // ActiveCampaign: async (req, res) => {
    //     try {
    //         const {
    //             _id,
    //             BrandName
    //         } = req.body;
    //         let newRecord = new campaign_detail.findOne({_id:_id ,status:"approved"}).updateOne({
    //             $set: {
    //                 status: "Active"
    //             }

    //         })
    //             .then(() => {
    //                 res.status(201).send(newRecord)
    //             }).catch((error) => {
    //                 console.log(error)
    //             })
                
    //     } catch (error) {
    //         res.status(400).send(error);
    //     }

    // },
    //ending campaign 
    EndCampaign: async (req, res) => {
        try {
            const _id=req.params.id;
            const {
                
                BrandName
            } = req.body;
            const date=new Date();
            let newRecord = await campaign_detail.findOne({_id ,status:"Active"}).updateOne({
                $set: {
                    status: "Ended",
                    EndedAt:date
                }

            })
                .then((newRecord) => {
                    res.status(201).send(newRecord)
                }).catch((error) => {
                    console.log(error)
                })
                
        } catch (error) {
            res.status(400).send(error);
        }

    },
    //showing all campaign data
    showCampaiginAll: async (req, res) => {
        try {
            const brandname = req.params.name;
            let record = await campaign_detail.find();
            res.status(201).send(record);
        } catch (error) {
            res.status(201).send(error)
        }
    },
    //showing all draft
    showCampaiginDraft: async (req, res) => {
        try {
            // const brandname = req.params.name;
            let record = await campaign_detail.find({ status:"Draft"}).then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            res.status(201).send(error)
        }
    },
    //showing all draft for review
    showCampaiginUnderReview: async (req, res) => {
        try {
            // const brandname = req.params.name;
            let record = await campaign_detail.find({status:"Under_Review"}).then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            res.status(201).send(error)
        }
    },
    //showing all archive campaign
    showCampaiginUnderArchive: async (req, res) => {
        try {
            // const brandname = req.params.name;
            let record = await campaign_detail.find({ status:"Archive"}) .then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            res.status(201).send(error)
        }
    },
    //showing all camapign which are active
    showCampaiginUnderActive: async (req, res) => {
        try {
            // const brandname = req.params.name;
            let record = await campaign_detail.find({ status:"Active"}) .then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            res.status(201).send(error)
        }
    },
    //showing all camapign which are Ended
    showCampaiginUnderEnded: async (req, res) => {
        try {
            // const brandname = req.params.name;
            let record = await campaign_detail.find({ status:"Ended"}) .then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            res.status(201).send(error)
        }
    },
    //get campaign detail with id
    getCampaignDetail:async(req,res)=>{
        try{
            const id=req.params.id;
            let record = await campaign_detail.findOne({_id:id}) .then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                console.log(error)
            })
        }catch(error){
            res.status(400).send(error)
        }
    },
     //get campaign detail with brandName
     getCampaignDetailWithName:async(req,res)=>{
        try{
            const id=req.params.name;
            let record =await campaign_detail.find({ CreatorPreferences:{$elemMatch:{CampaignDetail: {$elemMatch:{'CampaignName':id}}}}}) .then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                console.log(error)
            })
        }catch(error){
            res.status(400).send(error)
        }
    },
     //get campaign detail with id
     getCampaignDetailWithDate:async(req,res)=>{
        try{
            const id=req.params.date;
            let record = await campaign_detail.findOne({CreatedAt:id }) .then((response) => {
                res.status(201).send(response)
            }).catch((error) => {
                console.log(error)
            })
        }catch(error){
            res.status(400).send(error)
        }
    },
    //editing campaign detail
    EditCampaign:async(req, res) => {
        try {
            const _id=req.params.id;
            const {
                
                BrandName,
                workAs,
                CreatorPreferences,
                ProfileS
            } = req.body;
            console.log(_id);
            let Record = await campaign_detail.findOne({_id,status:"Draft"});
            console.log(Record)
            if(Record!=null){
            let newRecord = await campaign_detail.findOne({_id,status:"Draft"}).updateOne({
                $set: {
                    ProfileS,
                    workAs,
                    CreatorPreferences
                }

            })
                .then((response) => {
                    res.status(201).send("updated Sucessfully")
                }).catch((error) => {
                    console.log(error)
                })
            }else{
                res.status(200).send("Unable to update..")
            }
                
        } catch (error) {
            res.status(400).send(error);
        }
    },
}