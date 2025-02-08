import React from "react";

function Marketplace() {
  // Hardcoded data for lands listed for sale
  const listings = [
    {
      id: 1,
      owner: "0x1234567890abcdef",
      propertyAddress: "123 Main Street",
      price: "50", // In ETH
      totalLandArea: "1000 sqm",
      postalCode: "12345",
      propertyName: "Sunny Acres",
    },
    {
      id: 2,
      owner: "0xabcdef1234567890",
      propertyAddress: "456 Elm Street",
      price: "75", // In ETH
      totalLandArea: "1500 sqm",
      postalCode: "67890",
      propertyName: "Green Valley",
    },
    {
      id: 3,
      owner: "0xdeadbeefcafe1234",
      propertyAddress: "789 Oak Avenue",
      price: "100", // In ETH
      totalLandArea: "2000 sqm",
      postalCode: "54321",
      propertyName: "Lakeview Heights",
    },
  ];
//   const [listings, setListings] = React.useState([]);
  const [expandedId, setExpandedId] = React.useState(null);

  const handleBuy = (landId, price) => {
    alert(`Buying land ID ${landId} for ${price} ETH`);
    // Replace this with actual smart contract interaction later
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