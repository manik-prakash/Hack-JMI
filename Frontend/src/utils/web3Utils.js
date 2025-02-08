import { ethers } from "ethers";
import Web3Modal from "web3modal";

// Replace with your contract ABI and address
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "LandListedForSale",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "propertyAddress",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateOfPurchase",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "costPrice",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalLandArea",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "postalCode",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "propertyName",
          "type": "string"
        }
      ],
      "name": "LandRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "LandSold",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        }
      ],
      "name": "buyLand",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        }
      ],
      "name": "getLandDetails",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isForSale",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "propertyAddress",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "dateOfPurchase",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "costPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalLandArea",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "postalCode",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "propertyName",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "landCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "lands",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isForSale",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "propertyAddress",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "dateOfPurchase",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "costPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalLandArea",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "postalCode",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "propertyName",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "listLandForSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_propertyAddress",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_costPrice",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_totalLandArea",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_postalCode",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_propertyName",
          "type": "string"
        }
      ],
      "name": "registerLand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
const contractAddress = "0xB07D6f8750b48377bb261557Bbcd2b1A1f5Bb770";

// Initialize Web3Modal
const web3Modal = new Web3Modal();

let provider;
let signer;
let contract;

// Connect Wallet
export const connectWallet = async () => {
  try {
    provider = await web3Modal.connect();
    const ethersProvider = new ethers.BrowserProvider(provider);
    signer = await ethersProvider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    return signer.getAddress(); // Return connected wallet address
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw new Error("Failed to connect wallet");
  }
};

// Register Land
export const registerLand = async (propertyAddress, costPrice, totalLandArea, postalCode, propertyName) => {
  if (!contract) throw new Error("Wallet not connected");
  try {
    const tx = await contract.registerLand(
      propertyAddress,
      ethers.parseEther(costPrice.toString()),
      totalLandArea,
      postalCode,
      propertyName
    );
    await tx.wait();
    return true; // Success
  } catch (error) {
    console.error("Error registering land:", error);
    throw new Error("Failed to register land");
  }
};

// List Land for Sale
export const listLandForSale = async (landId, price) => {
  if (!contract) throw new Error("Wallet not connected");
  try {
    const tx = await contract.listLandForSale(landId, ethers.parseEther(price.toString()));
    await tx.wait();
    return true; // Success
  } catch (error) {
    console.error("Error listing land for sale:", error);
    throw new Error("Failed to list land for sale");
  }
};

// Buy Land
export const buyLand = async (landId, price) => {
  if (!contract) throw new Error("Wallet not connected");
  try {
    const tx = await contract.buyLand(landId, { value: ethers.parseEther(price.toString()) });
    await tx.wait();
    return true; // Success
  } catch (error) {
    console.error("Error buying land:", error);
    throw new Error("Failed to buy land");
  }
};

// Get Land Details
export const getLandDetails = async (landId) => {
  if (!contract) throw new Error("Wallet not connected");
  try {
    const land = await contract.getLandDetails(landId);
    return land;
  } catch (error) {
    console.error("Error fetching land details:", error);
    throw new Error("Failed to fetch land details");
  }
};