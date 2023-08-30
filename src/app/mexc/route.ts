import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

import Spot from "./spot";
const client = new Spot(process.env.MEXC_API_KEY, process.env.MEXC_API_SECRET, {
  baseURL: process.env.MEXC_API_URL,
});

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    return NextResponse.json({
      message: "Successfully Connected"
    });
  } catch (error) {
    return res.status(400).send("Error due to: " + error);
  }
}
