import { Request, Response } from "express";
import { google } from "googleapis";
import crypto from "crypto";
import url from "url";
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const googleAuth = google.oauth2({
  version: "v2",
  auth: oauth2Client,
});

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const getAuthUrl = (req: Request, res: Response) => {
  try {
    // Generate a secure random state value.
    const state = crypto.randomBytes(32).toString("hex");

    // Store state in the session
    // @ts-ignore
    req.session.state = state;

    const authorizationUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      include_granted_scopes: true,
      state: state,
    });

    res.redirect(authorizationUrl);
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getAuthCallback = async (req: Request, res: Response) => {
  try {
    let q = url.parse(req.url, true).query;

    if (q.error) {
      console.log("Error:" + q.error);
      // @ts-ignore
    } else if (q.state !== req.session.state) {
      console.log("State mismatch. Possible CSRF attack");
      return res.end("State mismatch. Possible CSRF attack");
    } else {
      // @ts-ignore
      let { tokens } = await oauth2Client.getToken(q.code);
      oauth2Client.setCredentials(tokens);
    }

    const googleUserInfo = await googleAuth.userinfo.get();
    if (!googleUserInfo) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    return res.status(200).json({ success: true, data: googleUserInfo.data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
