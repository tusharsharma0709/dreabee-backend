const express = require("express");
const router=express.Router();
const control=require("../controller/index")

//routes for api 
router.post("/BrandRegister",control.brands.brandRegister);
router.post("/BrandLogin",control.brands.brandLogin);
router.patch("/resetpassword/:id",control.brands.resetBrandsPassword);
router.post("/UpdatePage/:BrandName",control.brands.UpdateData);
router.post("/createPlan",control.brands.PlanCreation);
router.post("/createList",control.brands.ListCreation);
router.patch("/AddingInfluencerToList",control.brands.AddingInfluencerToList);
router.get("/BrandDetail/:Brand_name",control.brands.GetBrandDetail);
router.get("/PlanDetails/:PlanName/:Brand_name",control.brands.GetPlanDetail);
router.get("/InfluencerDetails/:ListName",control.brands.GetInfluencerDetails)
router.get("/ListDetails/:PlanName/:Brand_name",control.brands.listNameGetDetails);
router.post("/ArchivePlan",control.brands.ArchivePlan);
router.post("/unarchivePlanDetail",control.brands.UnArchivePlan);
router.post("/sendOtp",control.brands.sendOtp);
router.post("/loginWithOtp",control.brands.loginWithOtp);
router.post("/UpdateExtraInfo",control.brands.InfoWithQueryAns)
router.get("/updateRecordData/:BrandName",control.brands.showUpdatedData);
router.delete("/deletePlan/:id",control.brands.deletePlan);
router.delete("/deletelist/:PlanName/:ListName",control.brands.deletelist);
router.delete("/deleteInfluencer/:InfluencerName/:ListName",control.brands.deleteInfluencer);
router.post("/sendWatsaapMessage",control.brands.SendWatsappMessage);
router.get("/getPLan",control.brands.Detail);
router.get("/getActivePlanDetail",control.brands.Active_Detail)
router.get("/getArchivePlanDetail",control.brands.Archive_Detail)



module.exports=router;