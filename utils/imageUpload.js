const multer = require("multer")
const path = require("path")

const storage = (folderPath) => multer.diskStorage({
    destination: folderPath,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const imageUpload = (folderPath) => multer ({
    storage: storage(folderPath),
    limits: {
        fileSize: 2 * Math.pow(1024, 5)
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Image is not .png, .jpg, or .jpeg'))
        }
    },
    onError: function (err,next) {
        return console.log('error', err);
        next(err)
    }
}).single('artefactImg')

module.exports = imageUpload