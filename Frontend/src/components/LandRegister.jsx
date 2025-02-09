import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import axios from 'axios';

const LandRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    postalCode: '',
    area: '',
    costPrice: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [networkError, setNetworkError] = useState('');

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  // Smart Contract Configuration
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const contractABI = import.meta.env.VITE_CONTRACT_ABI;

  // Check network
  const checkNetwork = async () => {
    try {
      if (!window.ethereum) throw new Error('No Ethereum provider found');
      
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const sepoliaChainId = '0xaa36a7'; // Sepolia Testnet
      
      if (chainId !== sepoliaChainId) {
        setNetworkError('Please connect to Sepolia Testnet');
        return false;
      }
      setNetworkError('');
      return true;
    } catch (error) {
      console.error('Network check failed:', error);
      return false;
    }
  };

  // Connect Wallet Function
  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask not installed');
      
      const isCorrectNetwork = await checkNetwork();
      if (!isCorrectNetwork) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      
      setContract(contractInstance);
      setCurrentAccount(accounts[0]);
      return contractInstance;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Auto-connect wallet on component mount
  useEffect(() => {
    const initWallet = async () => {
      if (window.ethereum) {
        await checkNetwork();
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            setContract(new ethers.Contract(contractAddress, contractABI, signer));
            setCurrentAccount(accounts[0].address);
          }
        } catch (error) {
          console.log('Auto-connect error:', error);
        }
      }
    };
    initWallet();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contract) {
      alert('Please connect your wallet first');
      return;
    }

    setLoading(true);

    try {
      // Validate required fields
      const requiredFields = ['name', 'address', 'postalCode', 'area', 'costPrice'];
      if (requiredFields.some(field => !formData[field])) {
        throw new Error('All required fields must be filled');
      }

      // Convert values
      const costPriceWei = ethers.parseEther(formData.costPrice);
      if (costPriceWei <= 0n) throw new Error('Cost price must be greater than 0 ETH');

      // Smart contract interaction
      const tx = await contract.registerLand(
        formData.address,
        costPriceWei,
        formData.area,
        formData.postalCode,
        formData.name
      );
      
      const receipt = await tx.wait();
      const event = receipt.logs.find(log => 
        contract.interface.parseLog(log)?.name === 'LandRegistered'
      );
      
      if (!event) throw new Error('Land registration event not found');
      
      const landId = contract.interface.parseLog(event).args.landId.toString();

      // Backend API call
      await axios.post('/api/registerproperty', {
        ...formData,
        landId,
        ownerID: currentAccount,
        dateofPurchase: Math.floor(Date.now() / 1000)
      });

      // Reset form on success
      setFormData({
        name: '',
        address: '',
        postalCode: '',
        area: '',
        costPrice: '',
        imageURL: ''
      });
      
      alert('Property registered successfully!');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-4">Register New Property</h1>
      {networkError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {networkError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Property Name', name: 'name', type: 'text', required: true },
          { label: 'Physical Address', name: 'address', type: 'text', required: true },
          { label: 'Postal Code', name: 'postalCode', type: 'number', required: true },
          { label: 'Land Area (sqm)', name: 'area', type: 'number', required: true },
          { label: 'Cost Price (ETH)', name: 'costPrice', type: 'number', step: "0.01", required: true },
          { label: 'Image URL', name: 'imageURL', type: 'url', required: false },
        ].map((field, index) => (
          <motion.div
            key={index}
            variants={inputVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              value={formData[field.name]}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
              type={field.type}
              step={field.step}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </motion.div>
        ))}
        
        <button
          type="submit"
          disabled={loading || !currentAccount}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Registering...' : 'Register Property'}
        </button>
        
        {!currentAccount && (
          <button
            type="button"
            onClick={connectWallet}
            className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Connect MetaMask Wallet
          </button>
        )}
      </form>
    </motion.div>
  );
};

export default LandRegistrationForm;