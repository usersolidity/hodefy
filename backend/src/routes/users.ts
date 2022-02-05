import express from "express";
import { saveUser, fetchUserById } from "../controllers/users.js";

const router = express.Router();

router.post("", saveUser);
router.get("/:userId", fetchUserById);

export default router;
