import Image from "next/image";

const TokenCard = () => {
  return (
    <div className="card w-96 bg-gray/100 shadow-xl float-right">
      <div className="card-body">
      <h2 className='card-title text-black text-2xl underline'>Current Token Price</h2>
        <p className="card-title text-black text-2xl">
          <Image src="/images/sald-coin.png" width={36} height={36} alt='sald coin'/>
          Salad <span className='text-gray-700 font-normal text-base mt-1'>SALD</span>
        </p>
        <p className='text-black font-bold text-4xl'>$0.02686540</p>
      </div>
    </div>
  );
};

export default TokenCard;
