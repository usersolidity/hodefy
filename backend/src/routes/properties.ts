import express from "express";
import { saveProperty, fetchPropertiesByLocation, fetchPropertyById } from "../controllers/properties.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("", upload.array("files", 10), saveProperty);
router.get("", fetchPropertiesByLocation);
router.get("/:propertyId", fetchPropertyById);

export default router;
