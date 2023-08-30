import React from 'react';
import Image from 'next/image';

const BalanceCard = () => {
  return (
    <div className="card w-96 bg-gray/100 shadow-xl float-right">
      <div className="card-body">
        <h2 className='card-title text-black text-2xl underline'>MEXC Balance</h2>
        <p className="card-title text-black text-2xl">
          <Image
            src="/images/sald-coin.png"
            width={36}
            height={36}
            alt="sald coin"
          />
          <p className="text-black font-bold text-2xl">$0.02686540</p>
        </p>
        <p className="card-title text-black text-2xl">
          <Image
            src="/images/tether-coin.png"
            width={36}
            height={36}
            alt="tether coin"
          />
          <p className="text-black font-bold text-2xl">$0.02686540</p>
        </p>
      </div>
    </div>
  );
};

export default BalanceCard;
