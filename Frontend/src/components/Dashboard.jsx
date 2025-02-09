import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// Modal Component
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg relative text-black">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const holdings = [
  {
    id: 1,
    name: "Sunny Acres",
    address: "123 Main Street",
    area: "1000 sqm",
    price: "50 ETH",
    imageUrl: "https://via.placeholder.com/150",
    description: "A beautiful property located in the heart of the city.",
    fullDetails: {
      owner: "John Doe",
      purchaseDate: "2023-01-01",
      costPrice: "45 ETH",
      totalLandArea: "1000 sqm",
      postalCode: "12345",
      propertyName: "Sunny Acres",
      additionalInfo: "This property is located near the main highway, making it easily accessible."
    }
  },
  {
    id: 2,
    name: "Green Valley",
    address: "456 Elm Street",
    area: "1500 sqm",
    price: "75 ETH",
    imageUrl: "https://via.placeholder.com/150",
    description: "A spacious property with lush green surroundings.",
    fullDetails: {
      owner: "Jane Smith",
      purchaseDate: "2023-02-15",
      costPrice: "70 ETH",
      totalLandArea: "1500 sqm",
      postalCode: "67890",
      propertyName: "Green Valley",
      additionalInfo: "The property has a large garden and a small pond."
    }
  },
  {
    id: 3,
    name: "Ocean View",
    address: "789 Beach Road",
    area: "2000 sqm",
    price: "100 ETH",
    imageUrl: "https://via.placeholder.com/150",
    description: "A luxurious property with stunning ocean views.",
    fullDetails: {
      owner: "Alice Johnson",
      purchaseDate: "2023-03-10",
      costPrice: "95 ETH",
      totalLandArea: "2000 sqm",
      postalCode: "54321",
      propertyName: "Ocean View",
      additionalInfo: "Direct access to the beach and a private pool."
    }
  }
];

const Dashboard = () => {
  const [expandedProperty, setExpandedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [salePrice, setSalePrice] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
// const [holdings, setHoldings] = useState([]);

  const handlePropertyClick = (property) => {
    setExpandedProperty(expandedProperty === property ? null : property);
  };

  const handleSaleClick = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSalePrice('');
  };

  const handleConfirmSale = () => {
    console.log(`Putting property ${selectedProperty.name} on sale for ${salePrice} ETH`);
    // Add your sale logic here
    handleCloseModal();
  };

  return (
    <div className="text-white min-h-screen flex justify-center items-center gap-28">
      <div className="flex flex-col items-center gap-20 justify-center min-h-screen text-white">
        <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-white/5 to-white/5 backdrop-blur-lg p-8 shadow-2xl border border-white/20">
          <div className="p-4">
            <div className="flex justify-between items-center mb-10">
              <NavLink to="/landregister">
                <button className="text-lg bg-gradient-to-r from-teal-400 to-blue-600 hover:from-teal-500 hover:to-blue-700 text-white px-10 py-5 rounded-full shadow-lg transition-transform transform hover:scale-105">
                  Register land
                </button>
              </NavLink>
              <button className="text-lg bg-gradient-to-r from-teal-400 to-blue-600 hover:from-teal-500 hover:to-blue-700 text-white px-10 py-5 rounded-full shadow-lg transition-transform transform hover:scale-105">
                Buy Now
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {holdings.map((holding) => (
                  <div
                    key={holding.id}
                    className={`bg-gradient-to-br from-gray-800 to-gray-900 bg-opacity-70 p-6 rounded-2xl shadow-lg backdrop-blur-3xl border-2 border-gray-500 ${
                      expandedProperty === holding ? 'col-span-3' : ''
                    }`}
                    onClick={() => handlePropertyClick(holding)}
                  >
                    <img
                      src={holding.imageUrl}
                      alt={holding.name}
                      className={` ${expandedProperty === holding ? 'h-40' : 'h-40 '} object-cover rounded-md`}
                    />
                    <h3 className="text-xl font-bold mt-2">{holding.name}</h3>
                    {expandedProperty === holding ? (
                      <div>
                        <p className="text-gray-700 mt-2">{holding.description}</p>
                        <p className="text-gray-600 mt-2"><strong>Owner:</strong> {holding.fullDetails.owner}</p>
                        <p className="text-gray-600"><strong>Purchase Date:</strong> {holding.fullDetails.purchaseDate}</p>
                        <p className="text-gray-600"><strong>Cost Price:</strong> {holding.fullDetails.costPrice}</p>
                        <p className="text-gray-600"><strong>Total Land Area:</strong> {holding.fullDetails.totalLandArea}</p>
                        <p className="text-gray-600"><strong>Postal Code:</strong> {holding.fullDetails.postalCode}</p>
                        <p className="text-gray-600"><strong>Additional Info:</strong> {holding.fullDetails.additionalInfo}</p>
                        <button
                          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => handleSaleClick(holding)}
                        >
                          Sale this land
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-700">{holding.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Sale Land</h2>
        <p>Are you sure you want to put this land on sale?</p>
        <input
          type="number"
          placeholder="Set Sale Price (ETH)"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          className="w-full p-2 mt-2 border rounded"
        />
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleConfirmSale}>
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;