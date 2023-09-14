const express = require("express");
const router=express.Router();
const control=require("../controller/index")

//influencer routes folder for setting end url
router.post("/influencerCreateProfile",control.influencer.InfluencerRegister);
router.post("/updateInstaData",control.influencer.UpdateUserDataFromInstagram);
router.post("/updateYoutubeData",control.influencer.UpdateUserDataFromYoutube);
router.get("/influencerDataAsPerCategories/:categories",control.influencer.CatagoriesData);
router.post("/ValidateInformation",control.influencer.ValidatingApiForInfluencer);
///youtube api pending///////
router.post("/searchInfluencer",control.influencer.SearchInstaInfluencerWithFilter);
router.get("/LastSearch/:name",control.influencer.LastSearchHistory);
router.get("/ListOfCategories",control.influencer.CategoriesList);
router.get("/InfluenerDetail/:email",control.influencer.InfluencerData);
router.get("/InfluencerTagList",control.influencer.tagsList);
router.post("/ValidatingInstaUrl",control.influencer.ValidatingUserDataFromInstagram);
router.post("/getCategoriesAndHandleData",control.influencer.getCategoriesAndHandleData);
///youtube work pending//////
router.post("/ValidateInfluencerWithManualSearch",control.influencer.UserValidate);
//for check
router.post("/tester",control.tester.YoutubeCheckId);
module.exports=router;