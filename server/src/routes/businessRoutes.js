import express from "express";
import { 
getBusinesses,
addBusiness,
getBusinessById 
} from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusinesses);
router.post("/", addBusiness);
router.get("/:id", getBusinessById);

export default router;
