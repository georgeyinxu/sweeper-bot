import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export interface TBookOrder {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
  timestamp: number;
}

export async function POST(req: Request, res: NextApiResponse) {
  const { maxDepth, currentTokenPrice, type } = await req.json();

  const upperBound: number = currentTokenPrice * (1 + maxDepth / 100);
  const lowerBound: number = currentTokenPrice * (1 - maxDepth / 100);

  const withinRange: [string, string][] = [];

  let bookOrderData: TBookOrder | null = null;
  let buyOrder: [string, string][] | null = null;
  let sellOrder: [string, string][] | null = null;
  let totalUSDT: number = 0;
  let neededUSDT: number = 0;
  let response = {};

  try {
    const bookOrderResponse: AxiosResponse = await axios.get(
      `${process.env.MEXC_API_URL}/api/v3/depth?symbol=SALDUSDT`
    );

    bookOrderData = bookOrderResponse.data;
    buyOrder = bookOrderData ? bookOrderData.bids : [];
    sellOrder = bookOrderData ? bookOrderData.asks : [];

    if (sellOrder.length > 0 && type === "SELL") {
      for (const order of sellOrder) {
        const level = parseFloat(order[0]);
        if (lowerBound <= level && level <= upperBound) {
          withinRange.push(order);
          neededUSDT += parseFloat(order[1]) * level
        }
      }
    } else {
      for (const order of buyOrder) {
        const level = parseFloat(order[0]);
        if (lowerBound <= level && level <= upperBound) {
          withinRange.push(order);
          totalUSDT += parseFloat(order[1]) * level;
        }
      }
    }
  } catch (error) {
    return res.status(400).send("Error due to: " + error);
  }

  if (type === "BUY") {
    response = { data: withinRange, totalUSDT };
  } else {
    response = { data: withinRange, neededUSDT };
  }

  return NextResponse.json(response);
}
