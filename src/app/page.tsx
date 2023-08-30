import Navbar from "../components/Navbar";
import TokenCard from "../components/TokenCard";
import Table from "../components/Table";
import BalanceCard from "../components/BalanceCard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between bg-white">
      <Navbar />
      <div className="max-w-[1400px] min-h-screen flex flex-col">
        <div className="flex justify-between w-full mb-8">
          <BalanceCard />
          <TokenCard />
        </div>
        <h1 className="text-2xl underline font-bold text-black mb-2">MEXC</h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-lg rounded-md py-4">BUY</div>
              <div className='badge badge-secondary text-lg rounded-md py-4'>P&L: $2908 USDT</div>
            </div>
            <Table />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-lg rounded-md py-4">BUY</div>
              <div className='badge badge-secondary text-lg rounded-md py-4'>P&L: $2908 USDT</div>
            </div>
            <Table />
          </div>
          <div className='row-span-2'>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-lg rounded-md py-4">TRADING HISTORY</div>
            </div>
            <Table />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-lg rounded-md py-4">BUY</div>
              <div className='badge badge-secondary text-lg rounded-md py-4'>P&L: $2908 USDT</div>
            </div>
            <Table />
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="badge badge-accent text-lg rounded-md py-4">BUY</div>
              <div className='badge badge-secondary text-lg rounded-md py-4'>P&L: $2908 USDT</div>
            </div>
            <Table />
          </div>
        </div>
      </div>
    </main>
  );
}
