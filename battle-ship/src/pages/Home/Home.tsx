import Web3 from "web3";
import FeatureCard from "./FeatureCard";

export default function Home() {
  return (
    <div className="background">
      <Background />
      <Navbar />
      <div className="container mx-auto p-8">
        <HeroSection />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <FeatureCard title="Reliability">Web 3.0</FeatureCard>
          <FeatureCard title="Security">Low Fees</FeatureCard>
          <FeatureCard title="Ethereum">Blockchain</FeatureCard>
          <TransactionForm />
        </div>
      </div>
    </div>
  );
}

const ConnectToMetaMask = () => {
  const handleClick = async () => {
    if ((window as any)?.ethereum) {
      // Check if MetaMask is installed
      try {
        const accounts = await (window as any)?.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new Web3.providers.HttpProvider(
          (window as any)?.ethereum
        );
        const web3 = new Web3(provider);
        console.log("Connected to MetaMask account:", accounts[0]);
        // Use web3 here to interact with the blockchain
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.error("Please install MetaMask to use this application.");
    }
  };

  return (
    <button
      className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      onClick={handleClick}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        Connect Wallet
      </span>
      <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all"></div>
    </button>
  );
};

const Navbar = () => {
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
};

const HeroSection = () => {
  return (
    <div className="bg-gray-900 text-white p-8 glass">
      <h1 className="text-4xl font-bold mb-4">Send Crypto across the world</h1>
      <p className="mb-6">
        Explore the crypto world. Buy and sell cryptocurrencies easily on
        Krypto.
      </p>
      <ConnectToMetaMask />
    </div>
  );
};

const TransactionForm = () => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg glass">
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-300"
        >
          Address To
        </label>
        <input
          type="text"
          id="address"
          className="mt-1 p-2 block w-full bg-gray-600 border border-gray-600 rounded-md text-white"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-300"
        >
          Amount (ETH)
        </label>
        <input
          type="text"
          id="amount"
          className="mt-1 p-2 block w-full bg-gray-600 border border-gray-600 rounded-md text-white"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300"
        >
          Enter Message
        </label>
        <textarea
          id="message"
          rows={3}
          className="mt-1 p-2 block w-full bg-gray-600 border border-gray-600 rounded-md text-white"
        ></textarea>
      </div>

      <button className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Send Now
        </span>
        <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all"></div>
      </button>
    </div>
  );
};

const Background = () => {
  return <div className="background"></div>;
};
