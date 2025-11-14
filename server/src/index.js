import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import businessRoutes from "./routes/businessRoutes.js";

process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("🔥 UNHANDLED REJECTION:", reason);
});

console.log(">>> Starting server...");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/businesses", businessRoutes);

app.get("/", (_req, res) => res.send("Latino Business API is running"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
