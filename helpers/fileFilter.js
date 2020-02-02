import path from "path";

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

export default checkFileType;
