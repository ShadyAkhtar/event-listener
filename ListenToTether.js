const ethers = require("ethers");
const usdtABI = require("./ABI/usdt.json");
require("dotenv").config();

async function main() {
  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

  const provider = new ethers.providers.WebSocketProvider(
    `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );

  const contract = new ethers.Contract(usdtAddress, usdtABI, provider);

  contract.on("Transfer", (from, to, value, event) => {
    let info = {
      from: from,
      to: to,
      value: ethers.utils.formatUnits(value, 6),
      event: event,
    };
    console.log({ info });
  });
}

main();
