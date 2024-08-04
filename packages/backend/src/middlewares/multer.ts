import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "public/";

    // Customize the upload path based on the endpoint
    if (req.originalUrl.includes("/user")) {
      uploadPath = "public/avatar/";
    } else if (req.originalUrl.includes("/posts")) {
      uploadPath = "public/posts/";
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname
      .split(".")
      .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
      .slice(1)
      .join(".");
    const customFileName = `${Date.now()}-${file.fieldname}.${ext}`;
    cb(null, customFileName);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 2 * 1024 * 1024, // 2 MB limit for each field
    fileSize: 20 * 1024 * 1024, // 20 MB limit for file uploads
  },
});

export default upload;
