export default function Navbar() {
  return (
    <nav className=" text-white p-4 flex justify-between">
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
      {/* <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-300">Market</a>
        <a href="#" className="hover:text-gray-300">Exchange</a>
        <a href="#" className="hover:text-gray-300">Tutorials</a>
        <a href="#" className="hover:text-gray-300">Wallets</a>
        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Login</button>
      </div> */}
    </nav>
  );
}
