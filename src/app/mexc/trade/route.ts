import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

import Spot from "../spot";
const client = new Spot(process.env.MEXC_API_KEY, process.env.MEXC_API_SECRET, {
  baseURL: process.env.MEXC_API_URL,
});

export async function POST(req: Request, res: NextApiResponse) {
  let { quantity, price, type } = await req.json();
  let orderData = {};

  const quoteOrderQty = quantity * price;

  try {
    client
      .Order({
        type: "MARKET",
        quoteOrderQty,
        symbol: process.env.SYMBOL,
        side: type,
      })
      .then((response) => (orderData = response.data));
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error due to: " + error);
  }

  return NextResponse.json({ data: orderData, type, price, quantity });
}
