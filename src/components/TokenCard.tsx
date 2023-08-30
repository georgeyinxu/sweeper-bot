import Image from "next/image";
import React from "react";

type Props = {
  price: string;
}

const TokenCard: React.FC<Props> = ({ price }) => {
  return (
    <div className="card w-96 bg-gray/100 shadow-xl float-right">
      <div className="card-body">
      <h2 className='card-title text-black text-2xl underline'>Current Token Price</h2>
        <p className="card-title text-black text-2xl">
          <Image src="/images/sald-coin.png" width={36} height={36} alt='sald coin'/>
          Salad <span className='text-gray-700 font-normal text-base mt-1'>SALD</span>
        </p>
        <p className='text-black font-bold text-4xl'>${price}</p>
      </div>
    </div>
  );
};

export default TokenCard;
