import path from "path";
import multer from "multer";
import Datauri from "datauri";
import cloudinary from "cloudinary";

// datauri instance
const dUri = new Datauri();

// cloudinary uploader
const uploader = cloudinary.v2.uploader;

// Multer storage engine
const storage = multer.memoryStorage();

// Check file type
const checkFileType = (file, cb) => {
    // Allowed extensions
    const fileTypes = /jpeg|jpg|png/;
    // Check file extensions
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Only image files can be uploaded");
    }
};

// Multer upload
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single("productImg");

const uploadImage = (req, res, next) => {
    // upload product image
    upload(req, res, err => {
        if (err) {
            res.status(500).json({
                errorMsg: err
            });
        } else {
            if (req.file) {
                // convert file buffer to data uri
                const img = dUri.format(path.extname(req.file.originalname), req.file.buffer).content;
                // upload image to cloudinary
                const public_id = `${Date.now()}_${req.file.fieldname}`;
                uploader
                    .upload(img, {
                        folder: `products/user_${req.body.userId}/`,
                        public_id
                    })
                    .then(result => {
                        req.imageUrl = result.secure_url;
                        req.imageId = public_id;
                        next();
                    })
                    .catch(err => {
                        res.status(500).json({
                            errorMsg: "An error occurred",
                            err
                        });
                    });
            } else {
                res.json({
                    errorMsg: "No files selected"
                });
            }
        }
    });
};

export default uploadImage;