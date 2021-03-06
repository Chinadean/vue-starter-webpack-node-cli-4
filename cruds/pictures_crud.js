// ----------------------------------- UPLOADING PICTURES -------------------------------------------

/* INTRODUCTION 

  THERE ARE 3 WAYS TO STORE PICTURES  :
  
  1. CLOUDINARY SERVER 
  2. THE NODE SERVER
  3. AN FTP SERVER .

  AS LONG AS YOU CHOOSE AN OPTION, YOU HAVE TO CHANGE SEVERAL THINGS IN THE FRONT END VUE.JS APP TOO !
  IM CURRENTLY BUILDING THIS TRYING TO MAKE IT THE SIMPLIER AS POSSIBLE , AND THE ABILITY TO SWITCH EASILY BETWEEN THE 3 OPTIONS !
 
  INTRODUCTION

  IL Y A 3 FAÇONS DE STOCKER DES PHOTOS:
  
  1. SERVEUR CLOUDINAIRE
  2. LE SERVEUR NODE
  3. UN SERVEUR FTP.

  TANT QUE VOUS CHOISISSEZ UNE OPTION, VOUS DEVEZ CHANGER PLUSIEURS CHOSES DANS L'APPLICATION VUE.JS AVANT!
  IM CONSTRUIT ACTUELLEMENT CETTE ESSAYE DE LE RENDRE LE PLUS SIMPLE QUE POSSIBLE ET LA CAPACITÉ DE PASSER FACILEMENT ENTRE LES 3 OPTIONS!

*/


module.exports = function(app, db, permissions, cloudinaryToken) {
    /* ************************************* NODE MODULES ****************************************************** */

    var cloudinary = require("cloudinary") // Managing the cloudinary server pictures storing
    var Client = require("ssh2-sftp-client") // Managing the SFTP server connexion
    var multer = require("multer") // Managing multiples files uploads
    const sharp = require("sharp") // Resizing pictures module
    var fs = require("fs") // Managing the file system
    const bodyParser = require("body-parser")

    /* ************************************* STORAGE SERVERS CONNEXIONS PARAMS ****************************************************** */

    /*  CLOUDINARY PARAMS 'STORING PICTURES ON THE CLOUD' YOU HAVE TO OWN A CLOUDINARY ACCOUNT */

    cloudinary.config(cloudinaryToken);


    /* ************************************* MULTER IMAGES HANDLINGS ****************************************************** */

    // MULTER PARAMS FOR IMAGES STORAGE
    var storageImages = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "./tmp/img")
        },
        filename: function(req, file, cb) {
            let ext = file.originalname.substring(
                file.originalname.lastIndexOf("."),
                file.originalname.length,
            )
            let myUniqueFileName = file.originalname + "-" + Date.now() + ext
            cb(null, myUniqueFileName)
        },
    })

    var uploadImages = multer({ storage: storageImages })

    // ******************************************************** BACK END CRUD CLOUDINARY IMAGE STORING WEB SERVICE ****************************************************** */

    // CREATE A PICTURE ON CLOUDINARY
    app.post("/createCloudinaryImage", uploadImages.single("file"), function(req, res, next) {

        // STEP 0: DISPLAYING WHAT WE GOT FROM THE FRONT END - On affiche l'image qui vient du front end dans la console
        console.log(req.file)

        // TODO reduceMyImageSize(req.file)
        // STEP 1 : REDUCING PICTURE SIZE
        sharp(req.file.path)
            .resize(200, 200)
            .toBuffer(function(err, buffer) {
                fs.writeFile(req.file.path, buffer, function(e) {})
            })

        // STEP 2 : CLOUDINARY STORING
        //  https://support.cloudinary.com/hc/en-us/articles/202520762-How-to-upload-images-while-keeping-their-original-filenames-
        cloudinary.uploader.upload("./tmp/img/" + req.file.filename, function(result) {
            // SENDING BACK THE CLOUDINARY URL FOR FRONT END DISPLAYING and DATABASE URL STORAGE
            res.send({ filename: result.secure_url })
        })

    })

    // READ A PICTURE ON CLOUDINARY
    app.post("/readCloudinaryImage", function(req, res, next) {
        // TO DO
    })

    // UPDATE A PICTURE ON CLOUDINARY
    app.post("/updateCloudinaryImage", function(req, res, next) {
        // TO DO
    })

    // DELETE A PICTURE ON CLOUDINARY
    app.post("/deleteCloudinaryImage", function(req, res, next) {
        // TO DO
    })

    // ******************************************************** BACK END CRUD FTP IMAGE STORING WEB SERVICE ****************************************************** */

    // CREATE A PICTURE ON FTP
    app.post("/createFtpimage", function(req, res, next) {
        // TO DO
    })

    // READ A PICTURE ON FTP
    app.post("/readFtpImage", function(req, res, next) {
        // TO DO
    })

    // UPDATE A PICTURE ON FTP
    app.post("/updateFtpImage", function(req, res, next) {
        // TO DO
    })

    // DELETE A PICTURE ON FTP
    app.post("/deleteFtpImage", function(req, res, next) {
        // TO DO
    })

    // ******************************************************** BACK END NODE JS IMAGE STORING WEB SERVICE ****************************************************** */

    // CREATE A PICTURE ON THE NODE SERVER
    app.post("/createNodeimage", function(req, res, next) {
        // TO DO
        // SENDING THE UPLOADS URL FOR DISPLAYING
        // res.send({ filename: req.file.filename});
    })

    // READ A PICTURE ON THE NODE SERVER
    app.post("/readNodeImage", function(req, res, next) {
        // TO DO
    })

    // UPDATE A PICTURE ON THE NODE SERVER
    app.post("/updateNodeImage", function(req, res, next) {
        // TO DO
    })

    // DELETE A PICTURE ON THE NODE SERVER
    app.post("/deleteNodeImage", function(req, res, next) {
        // TO DO
    })



    // ----------------------------------- END UPLOADING IMAGES  -----------------------------------


    // *********************************** HELPER FUNCTIONS  ****************************************************** */

    /*
     * Reducing image size with SHARP - TODO
     * @return image
     * @error 
     */

    function reduceMyImageSize(req) {

    }

}