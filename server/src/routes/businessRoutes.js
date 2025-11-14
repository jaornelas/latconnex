import express from "express";
import { 
getBusinesses,
addBusiness,
getBusinessId 
} from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusinesses);
router.post("/", addBusiness);
router.get("/:id", getBusinessId);

export default router;
