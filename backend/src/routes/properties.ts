import express from 'express';
import { uploadPictures } from '../middleware/pictures.js';
import { uploadPicturesToS3 } from '../controllers/properties.js';
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post('/:propertyId', upload.array("files", 10), uploadPicturesToS3);

export default router;