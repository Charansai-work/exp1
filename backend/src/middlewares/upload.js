import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const allowed = ['application/pdf', 'application/zip', 'application/x-zip-compressed', 'image/png', 'image/jpeg'];

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => cb(null, allowed.includes(file.mimetype))
});
