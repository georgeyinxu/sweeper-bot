const Table = () => {
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-gray-200">
      <table className="table text-black">
        <thead className='text-gray-400 font-medium'>
          <tr className="border-b-gray-200">
            <th>Level</th>
            <th>SALD Amount</th>
            <th>USDT Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b-gray-200'>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          <tr className="border-b-gray-200">
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          <tr className="border-b-gray-200">
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
