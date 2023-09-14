const express = require("express");
const router=express.Router();
const control=require("../controller/index");


router.post("/createCampaignDraft",control.campaign.createCampaignPreferences);
router.post("/campaignUnderReview/:id",control.campaign.completeCampaign);
router.post("/archiveCampaign/:id",control.campaign.ArchiveCampaign);
router.post("/Unarchive/:id",control.campaign.UnArchiveCampaign);
router.post("/EndCampagin/:id",control.campaign.EndCampaign);
router.get("/AllData",control.campaign.showCampaiginAll);
router.get("/AllArchive",control.campaign.showCampaiginUnderArchive);
router.get("/AllActive",control.campaign.showCampaiginUnderActive);
router.get("/AllEnded",control.campaign.showCampaiginUnderEnded);
router.get("/AllDraft",control.campaign.showCampaiginDraft);
router.get("/AllUnderReview",control.campaign.showCampaiginUnderReview);
router.post("/editDetailsCampaign/:id",control.campaign.EditCampaign);
router.get("/CampaignDetails/:id",control.campaign.getCampaignDetail);
router.get("/getCampaginWithDate/:date",control.campaign.getCampaignDetailWithDate);
router.get("/getCampaignDetailWithname/:name",control.campaign.getCampaignDetailWithName);



module.exports=router;
