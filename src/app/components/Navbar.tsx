const Navbar = () => {
  return (
    <div className="w-full flex justify-center items-center rounded-b-xl bg-white">
      <div className="navbar max-w-[1400px]">
        <div className="flex-1">
          <a className="text-2xl text-black font-bold">Sweeper Bot</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>
                <button className="btn btn-primary">START BOT</button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
