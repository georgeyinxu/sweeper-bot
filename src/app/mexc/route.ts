import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    return NextResponse.json({
      message: "Successfully Connected"
    });
  } catch (error) {
    return res.status(400).send("Error due to: " + error);
  }
}
