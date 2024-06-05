import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import {
  getAuthCallback,
  getAuthUrl,
} from "../controllers/googleAuthController";
import { getTiktokAuthUrl } from "../controllers/tiktokAuthController";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    resave: false,
    saveUninitialized: false,
  })
);

// Route for authentication
app.get("google-auth/", getAuthUrl);
app.get("/callback", getAuthCallback);
app.get("/tiktok-auth", getTiktokAuthUrl);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
