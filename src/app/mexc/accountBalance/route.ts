import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import Spot from "../spot";

const client = new Spot(process.env.MEXC_API_KEY, process.env.MEXC_API_SECRET, {
  baseURL: process.env.MEXC_API_URL,
});

type TMEXCBalanceInfo = {
  asset: string;
  free: string;
  locked: string;
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  let usdt = 0;
  let sald = 0;

  try {
    const accountInformation = await client.AccountInformation();

    const balances = accountInformation.data.balances;

    const usdtItem = balances.filter(
      (item: TMEXCBalanceInfo) => item.asset === "USDT"
    );
    const saldItem = balances.filter(
      (item: TMEXCBalanceInfo) => item.asset === "SALD"
    );

    usdt = parseFloat(usdtItem[0].free);
    sald = parseFloat(saldItem[0].free);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send("Error fetching account balance due to: " + error);
  }

  return NextResponse.json({ usdt, sald });
}
