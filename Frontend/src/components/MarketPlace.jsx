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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className=" bg-white opacity-50 p-4 rounded-lg shadow-md backdrop-filter backdrop-blur-lg">
            <h3 className="text-lg font-semibold">{listing.propertyName}</h3>
            <p className="text-black">{listing.propertyAddress}</p>
            <p className="text-black">Price: {listing.price} ETH</p>
            <p className="text-black">Area: {listing.totalLandArea}</p>

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
                <p>Postal Code: {listing.postalCode}</p>
                <p>Owner: {listing.owner}</p>
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