import express from "express";
import { 
getBusinesses,
addBusiness,
getBusinessById,
deleteBusiness
} from "../controllers/businessController.js";

const router = express.Router();

router.get("/", getBusinesses);
router.post("/", addBusiness);
router.get("/:id", getBusinessById);
router.delete("/:id", deleteBusiness);

export default router;
