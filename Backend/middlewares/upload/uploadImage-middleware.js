const multer = require("multer");
const uploadImageSingle = () => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `./public/images`);
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
      const extensionImageList = ["png", "jpg", "jpeg"];
      const extension = file.originalname.split(".");
      const isCheck = extensionImageList.includes(
        extension[extension.length - 1]
      );
      if (isCheck) {
        callback(null, true);
      } else {
        callback(new Error("file không hợp lệ"));
      }
    },
  });

  return upload.single("img");
};

module.exports = {
  uploadImageSingle,
};

// const callback = (err, value) => {
//     if(err){
//         throw new Error(err);
//     }
//     return value;
// }
