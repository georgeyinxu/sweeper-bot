import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import Spot from "../spot";

const client = new Spot(process.env.MEXC_API_KEY, process.env.MEXC_API_SECRET, {
  baseURL: process.env.MEXC_API_URL,
});

type TTrade = {
  id: null;
  price: string;
  qty: string;
  quoteQty: string;
  time: Date;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
  tradeType: "ASK" | "BID";
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  let history: TTrade[] = [];

  try {
    const recentTrades = await client.RecentTradesList({
      Symbol: process.env.SYMBOL,
    });

    history = recentTrades.data;
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error fetching tradeHistory due to: " + error);
  }

  return NextResponse.json({ data: history });
}
