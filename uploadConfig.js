const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${file.originalname}`)
});

const limits = { fileSize: 500 * 1024 };

const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    const condition = mimetype === 'image/png' || mimetype === 'image/jpeg';
    if (condition) return cb(null, true);
    cb(new Error('File must be an image'));
};

const uploadConfig = multer({ storage, limits, fileFilter });

module.exports = uploadConfig;
