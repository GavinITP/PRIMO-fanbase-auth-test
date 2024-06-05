import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const getTiktokAuthUrl = (req: Request, res: Response) => {
  const csrfState = Math.random().toString(36).substring(2);

  res.cookie("csrfState", csrfState, { maxAge: 60000 });

  let url = "https://www.tiktok.com/v2/auth/authorize";

  // the following params need to be in `application/x-www-form-urlencoded` format.
  url += `?client_key=${process.env.CLIENT_KEY}`;
  url += "&scope=user.info.basic";
  url += "&response_type=code";
  url += `&redirect_uri=${process.env.REDIRECT_URL}`;
  url += "&state=" + csrfState; // State could be anything you want

  res.redirect(url);
};
