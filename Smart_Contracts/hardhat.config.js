require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from .env

const INFURA_URL = process.env.INFURA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {}, // Default network for local testing
    sepolia: {
      url: INFURA_URL, // Use the Infura URL from .env
      accounts: [PRIVATE_KEY], // Use the private key from .env
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    gasPrice: 20, // Average gas price in Gwei
  },
};