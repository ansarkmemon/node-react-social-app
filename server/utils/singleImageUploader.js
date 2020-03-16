const multer = require('multer');
const slugify = require('slugify')

module.exports = (uploadPath = './uploads/') => {
    const imageStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}${slugify(file.originalname, '_')}`)
      }
    });

    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    }

    return multer({ storage: imageStorage, fileFilter })
}
