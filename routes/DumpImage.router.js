const express = require("express");
const router=express.Router();
const control=require("../controller/index");


router.post("/uploadImage/logo",control.image.uploadImage);
router.delete("/deleteImage",control.image.deleteImage);
router.post("/uploadImage/Banner",control.image.uploadImage);
router.post("/uploadImage/ProductImage",control.image.uploadImage);
router.post("/uploadVedio",control.image.uploadVedio);
module.exports=router;
