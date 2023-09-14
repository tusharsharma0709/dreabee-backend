const Image_store = require("../models/ImageDumpModel");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: 'dmvthpfdq',
    api_key: '592522519816742',
    api_secret: 'ZWtqufgbXj7urvOxeoZgTPzwumo'
});

module.exports = {
    //api for Inserting Image
    uploadImage: async (req, res) => {
        try {
            const file = req.files.photo;
            console.log(file);
            cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
                console.log(result);
                const image = new Image_store({
                    info: req.body.name,
                    image_url: result.secure_url,
                    BandNAme: req.body.BrandName
                });
                image.save().then(() => {
                    res.status(201).send(image);
                }).catch((error) => {
                    res.send(error);
                });
            })
        } catch (error) { res.status(400).send(error); }

    },
    //delete Image
    deleteImage: async (req, res) => {
        try {
            const id = req.query.username;
            const url = req.query.url;
            const imageurl = url.split('/');
            console.log(imageurl);
            const image = imageurl[imageurl.length - 1];
            const name = image.split('.');
            console.log(name);
            Image_store.remove({ username: id }).then(result => {
                cloudinary.uploader.destroy(name, (error, result) => {
                    console.log(error, result)
                })
                res.status(201).json({
                    message: result
                });
            }).catch((err) => {
                res.status(400).json({
                    error: err
                });
            });

        } catch (error) {
            res.send(403).send("ERROR", error);
        }
    },
    //api for Vedio Upload
    uploadVedio: async (req, res) => {
        try {
            const file = req.files.video;
            console.log(file);
            cloudinary.uploader.upload_large(file.tempFilePath, {
                chunk_size: 9000000,
                resource_type: "video"
            }, (error, result) => {
                console.log(result);
                const image = new Image_store({
                    name: req.body.name,
                    image_url: result.secure_url,
                    username: req.body.username
                });
                image.save().then(() => {
                    res.status(201).send(image);
                }).catch((error) => {
                    res.send(error);
                });
            },)
        } catch (error) { res.status(400).send(error); }

    }
}