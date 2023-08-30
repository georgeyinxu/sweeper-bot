import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import Spot from "../spot";

const client = new Spot(process.env.MEXC_API_KEY, process.env.MEXC_API_SECRET, {
  baseURL: process.env.MEXC_API_URL,
});

type TToken = {
  symbol: string;
  price: string;
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  let saldPrice = "";

  try {
    const tokenPrices = await client.SymbolPriceTicker();

    const tokenPricesData: TToken[] = tokenPrices.data;
    const sald = tokenPricesData.filter(
      (token) => token.symbol === process.env.SYMBOL
    );

    saldPrice = sald[0].price;
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error fetching token price due to: " + error);
  }

  return NextResponse.json({ saldPrice });
}
