"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import TokenCard from "../components/TokenCard";
import Table from "../components/Table";
import BalanceCard from "../components/BalanceCard";

import { TTrade } from "./mexc/tradeHistory/route";

const tradesHeader = ["USDT", "SALD", "Time"];
const buyOrSellHeader = ["Level", "SALD Amount", "USDT Amount"];

export default function Home() {
  const [saldPrice, setSaldPrice] = useState("0");
  const [usdt, setUSDT] = useState("0");
  const [sald, setSALD] = useState("0");
  const [recentTrades, setRecentTrades] = useState<TTrade[]>([]);
  const [buyRange, setBuyRange] = useState<[string, string][]>([]);
  const [buyUSDT, setBuyUSDT] = useState(0);
  const [maximumSellRange, setMaximumSellRange] = useState<[string, string][]>(
    []
  );
  const [maximumSellUSDT, setMaximumSellUSDT] = useState(0);
  const [halfSellRange, setHalfSellRange] = useState<[string, string][]>([]);
  const [halfSellUSDT, setHalfSellUSDT] = useState(0);
  const [originalSellRange, setOriginalSellRange] = useState<
    [string, string][]
  >([]);
  const [originalSellUSDT, setOriginalSellUSDT] = useState(0);
  const [startBot, setStartBot] = useState(false);

  const handleTrade = () => {
    let buyPromises = [];
    let sellPromises = [];
    // Make the buy first, succeed then make the sell for 1%
    for (const range of buyRange) {
      const buyPromise = axios.post("http://localhost:3000/mexc/trade", {
        quantity: parseFloat(range[1]),
        price: parseFloat(range[0]),
        type: "BUY",
      });

      buyPromises.push(buyPromise);
    }

    if (
      buyUSDT > 0 &&
      parseFloat(originalSellRange[0][0]) > parseFloat(saldPrice)
    ) {
      if (buyUSDT - maximumSellUSDT > 0) {
        for (const range of maximumSellRange) {
          const sellPromise = axios.post("http://localhost:3000/mexc/trade", {
            quantity: parseFloat(range[1]),
            price: parseFloat(range[0]),
            type: "SELL",
          });

          sellPromises.push(sellPromise);
        }
      } else if (buyUSDT - halfSellUSDT > 0) {
        for (const range of halfSellRange) {
          const sellPromise = axios.post("http://localhost:3000/mexc/trade", {
            quantity: parseFloat(range[1]),
            price: parseFloat(range[0]),
            type: "SELL",
          });

          sellPromises.push(sellPromise);
        }
      } else if (buyUSDT - originalSellUSDT > 0) {
        for (const range of originalSellRange) {
          const sellPromise = axios.post("http://localhost:3000/mexc/trade", {
            quantity: parseFloat(range[1]),
            price: parseFloat(range[0]),
            type: "SELL",
          });

          sellPromises.push(sellPromise);
        }
      } else {
        return;
      }

      const allPromises = buyPromises.concat(sellPromises);

      Promise.all(allPromises)
        .then((responses) => {
          responses.forEach((response) => {
            const { data } = response;
            let orderResponse = data.data;

            // TODO: Do proper message handling when free
            console.log(
              `Successfully placed an ${orderResponse.type} for ${orderResponse.quantity} SALD at $${orderResponse.price}.`
            );
          });
        })
        .catch((error) => {
          // TODO: Do proper error handling when free
          console.error(
            "An error occured when placing a BUY/SELL order due to: " + error
          );
        });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("http://localhost:3000/mexc/token")
        .then((tokenResponse) => {
          const { saldPrice } = tokenResponse.data;
          setSaldPrice(saldPrice);

          return Promise.all([
            axios.get("http://localhost:3000/mexc/accountBalance"),
            axios.get("http://localhost:3000/mexc/tradeHistory"),
            axios.post("http://localhost:3000/mexc/orderBook", {
              maxDepth: 0.5,
              currentTokenPrice: saldPrice,
              type: "BUY",
            }),
            axios.post("http://localhost:3000/mexc/orderBook", {
              maxDepth: 1,
              currentTokenPrice: saldPrice,
              type: "SELL",
            }),
            axios.post("http://localhost:3000/mexc/orderBook", {
              maxDepth: 0.5,
              currentTokenPrice: saldPrice,
              type: "SELL",
            }),
            axios.post("http://localhost:3000/mexc/orderBook", {
              maxDepth: 0,
              currentTokenPrice: saldPrice,
              type: "SELL",
            }),
          ]);
        })
        .then(
          ([
            accountResponse,
            tradingHistoryResponse,
            buyResponse,
            sellMaximumResponse,
            sellHalfResponse,
            sellOriginalResponse,
          ]) => {
            // Getting all the responses and setting their data
            setUSDT(accountResponse.data.usdt);
            setSALD(accountResponse.data.sald);
            setRecentTrades(tradingHistoryResponse.data.history);
            setBuyRange(buyResponse.data.data);
            setBuyUSDT(buyResponse.data.totalUSDT);
            setMaximumSellRange(sellMaximumResponse.data.data);
            setMaximumSellUSDT(sellMaximumResponse.data.neededUSDT);
            setHalfSellRange(sellHalfResponse.data.data);
            setHalfSellUSDT(sellHalfResponse.data.neededUSDT);
            setOriginalSellRange(sellOriginalResponse.data.data);
            setOriginalSellUSDT(sellOriginalResponse.data.neededUSDT);

            if (startBot) {
              // handleTrade();
            }
          }
        )
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 10000); // 10000 milliseconds = 10 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, [startBot]);
  return (
    <main className="flex flex-col items-center justify-between bg-white">
      <Navbar startBot={startBot} setStartBot={setStartBot} />
      <div className="max-w-[1400px] min-h-screen flex flex-col">
        <div className="flex justify-between w-full mb-8">
          <BalanceCard sald={sald} usdt={usdt} />
          <TokenCard price={saldPrice} />
        </div>
        <h1 className="text-2xl underline font-bold text-black mb-2">MEXC</h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-sm rounded-md py-4">
                BUY
              </div>
              <div className="badge badge-secondary text-sm rounded-md py-4">
                Required: {buyUSDT.toFixed(6)} USDT
              </div>
            </div>
            <Table rowName={buyOrSellHeader} data={buyRange} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-sm rounded-md py-4">
                SELL (1.0%)
              </div>
              <div className="badge badge-secondary text-sm rounded-md py-4">
                P&L: {(buyUSDT - maximumSellUSDT).toFixed(6)} USDT
              </div>
            </div>
            <Table rowName={buyOrSellHeader} data={maximumSellRange} />
          </div>
          <div className="row-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-sm rounded-md py-4">
                TRADING HISTORY
              </div>
            </div>
            <Table rowName={tradesHeader} recentTradesData={recentTrades} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-sm rounded-md py-4">
                SELL (0.5%)
              </div>
              <div className="badge badge-secondary text-sm rounded-md py-4">
                P&L: {(buyUSDT - halfSellUSDT).toFixed(6)} USDT
              </div>
            </div>
            <Table rowName={buyOrSellHeader} data={halfSellRange} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-sm rounded-md py-4">
                SELL (ORIGINAL)
              </div>
              <div className="badge badge-secondary text-sm rounded-md py-4">
                P&L: {(buyUSDT - originalSellUSDT).toFixed(6)} USDT
              </div>
            </div>
            <Table rowName={buyOrSellHeader} data={originalSellRange} />
          </div>
        </div>
      </div>
    </main>
  );
}
