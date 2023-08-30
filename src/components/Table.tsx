import React from "react";
import { TTrade } from "@/app/mexc/tradeHistory/route";
import { DateTime } from 'luxon';

type Props = {
  rowName: string[];
  data?: [string, string][];
  recentTradesData?: TTrade[];
};

const Table: React.FC<Props> = ({ rowName, data, recentTradesData }) => {
  return (
    <div className="overflow-x-auto max-h-[50vh] rounded-xl border-2 border-gray-200">
      <table className="table text-black">
        <thead className="text-gray-400 font-medium">
          <tr className="border-b-gray-200">
            {rowName.map((name, index) => (
              <th key={index + name}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr className="border-b-gray-200" key={item[0]}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{parseFloat(item[0]) * parseFloat(item[1])}</td>
              </tr>
            ))}
          {recentTradesData &&
            recentTradesData.map((trade, index) => (
              <tr className="border-b-gray-200" key={index}>
                <td>{trade.price}</td>
                <td>{trade.qty}</td>
                <td>{new Date(trade.time).toLocaleTimeString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
