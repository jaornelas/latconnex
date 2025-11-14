import express from "express";
import { getBusinesses, addBusiness } from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusinesses);
router.post("/", addBusiness);

export default router;
