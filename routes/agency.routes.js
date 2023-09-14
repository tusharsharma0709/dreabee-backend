const express = require("express");
const router=express.Router();
const control=require("../controller/index")


router.post("/AgencyRegister",control.agency.AgencyRegister);
router.post("/AgencyLogin",control.agency.AgencyLogin);
router.patch("/resetpassword/:id",control.agency.resetAgencysPassword);
router.post("/UpdatePage/:BrandName",control.agency.UpdateData);
router.post("/createPlan",control.agency.PlanCreation);
router.post("/createList",control.agency.ListCreation);
router.post("/AddingInfluencerToList",control.agency.AddingInfluencerToList);
router.get("/BrandDetail/:Brand_name",control.agency.GetAgencyDetail);
router.get("/PlanDetails/:PlanName/:Brand_name",control.agency.GetPlanDetail);
router.get("/InfluencerDetails/:ListName",control.agency.GetInfluencerDetails)
router.get("/ListDetails/:PlanName/:Brand_name",control.agency.listNameGetDetails);
router.post("/ArchiveMessage",control.agency.ArchivePlan);
router.post("/unarchivePlanDetail",control.agency.UnArchivePlan);
router.post("/sendOtp",control.agency.sendOtp);
router.post("/loginWithOtp",control.agency.loginWithOtp);
router.post("/UpdateExtraInfo",control.agency.InfoWithQueryAns)
router.get("/updateRecordData/:BrandName",control.agency.showUpdatedData);
router.delete("/deletePlan/:id",control.agency.deletePlan);
router.delete("/deletelist/:PlanName/:ListName",control.agency.deletelist);
router.delete("/deleteInfluencer/:InfluencerName/:ListName",control.agency.deleteInfluencer);
router.get("/getActivePlanDetail",control.brands.Active_Detail)
router.get("/getArchivePlanDetail",control.brands.Archive_Detail)

module.exports=router;