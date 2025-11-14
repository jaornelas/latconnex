import express from "express";
import cors from "cors";
import dotenv from "dontenv";
import businessRoutes from "./routes/businessRoutes.js"

dotenv.config();
const app = express ()

app.use(cors();
app.use(express.json());

app.get("/", (req, res) => res.send("Latino Business API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port ${PORT}'));