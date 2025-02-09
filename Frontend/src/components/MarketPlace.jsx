import { useEffect, useState } from "react";
import { ethers } from "ethers"; // Install ethers.js: npm install ethers
import axios from "axios";


function Marketplace() {
  const [listings, setListings] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  // Replace these with your actual values
  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS; // Smart contract address
  const ABI = import.meta.env.VITE_ABI; // Smart contract ABI

  // Simulate authentication check (replace this with your actual auth logic)
  useEffect(() => {
    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/validate', {
                credentials: 'include' // Required for cookies
            });
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsAuthenticated(false);
        }
    };
    checkAuth();
  }, []);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/allholdings");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Function to handle buying land
  const handleBuy = async (landId, price) => {
    if (!isAuthenticated) {
      alert("You need to log in to buy land.");
      window.location.href = "/Auth"; // Redirect to login page
      return;
    }

    try {
      // Connect to Ethereum provider (MetaMask)
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask to proceed.");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" }); // Request account access
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Connect to the smart contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      // Convert price to Wei (Ethereum's smallest unit)
      const priceInWei = ethers.utils.parseEther(price.toString());

      // Call the buyLand function
      const tx = await contract.buyLand(landId, { value: priceInWei });
      console.log("Transaction sent:", tx.hash);

      // Wait for the transaction to be mined
      await tx.wait();
      console.log("Transaction confirmed:", tx.hash);
      alert(`Successfully bought land ID ${landId} for ${price} ETH`);

    } catch (error) {
      console.error("Error buying land:", error);
      alert("Failed to buy land. Please try again.");
    }
  };

  return (
    <div className="p-4 mt-10">
      <h2 className="text-4xl font-bold mb-4 text-white">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-70 p-6 rounded-2xl shadow-lg backdrop-blur-3xl border-2 border-gray-500">
            <h3 className="text-white text-3xl font-semibold">{listing.propertyName}</h3>
            <p className="text-white">{listing.propertyAddress}</p>
            <p className="text-white">Price: {listing.price} ETH</p>
            <p className="text-white">Area: {listing.totalLandArea}</p>

            {/* Expand Button */}
            <button
              className="mt-2 text-blue-500"
              onClick={() => setExpandedId(expandedId === listing.id ? null : listing.id)}
            >
              {expandedId === listing.id ? "Hide Details" : "Show Details"}
            </button>

            {/* Expanded Details */}
            {expandedId === listing.id && (
              <div className="mt-4">
                <p className="text-white">Postal Code: {listing.postalCode}</p>
                <p className="text-white">Owner: {listing.owner}</p>
                <button
                  className="mt-2 bg-blue-900 text-white px-4 py-2 rounded"
                  onClick={() => handleBuy(listing.id, listing.price)}
                >
                  Buy Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketplace;