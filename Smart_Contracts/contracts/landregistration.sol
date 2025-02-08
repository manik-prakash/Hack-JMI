// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract LandRegistration {
    struct Land {
        uint256 id; // Unique ID for the land parcel
        address owner; // Current owner of the land
        bool isRegistered; // Whether the land is registered
        uint256 price; // Price if listed for sale
        bool isForSale; // Whether the land is listed for sale
        string propertyAddress; // Physical address of the land
        uint256 dateOfPurchase; // Timestamp of purchase
        uint256 costPrice; // Cost price of the land
        uint256 totalLandArea; // Total land area in square meters or other units
        uint256 postalCode; // Postal code of the land
        string propertyName; // Name of the property
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCounter;

    event LandRegistered(
        uint256 indexed landId,
        address indexed owner,
        string propertyAddress,
        uint256 dateOfPurchase,
        uint256 costPrice,
        uint256 totalLandArea,
        uint256 postalCode,
        string propertyName
    );
    event LandListedForSale(uint256 indexed landId, uint256 price);
    event LandSold(uint256 indexed landId, address indexed buyer, uint256 price);

    function registerLand(
        string memory _propertyAddress,
        uint256 _costPrice,
        uint256 _totalLandArea,
        uint256 _postalCode,
        string memory _propertyName
    ) external {
        require(!lands[landCounter].isRegistered, "Land already registered");

        lands[landCounter] = Land({
            id: landCounter,
            owner: msg.sender,
            isRegistered: true,
            price: 0,
            isForSale: false,
            propertyAddress: _propertyAddress,
            dateOfPurchase: block.timestamp, // Current timestamp
            costPrice: _costPrice,
            totalLandArea: _totalLandArea,
            postalCode: _postalCode,
            propertyName: _propertyName
        });

        emit LandRegistered(
        landCounter,
        msg.sender,
        _propertyAddress,
        block.timestamp,
        _costPrice,
        _totalLandArea,
        _postalCode,
        _propertyName
    );
        landCounter++;
    }

    function listLandForSale(uint256 landId, uint256 _price) external {
        require(lands[landId].isRegistered, "Land not registered");
        require(lands[landId].owner == msg.sender, "Not the owner of this land");

        lands[landId].price = _price;
        lands[landId].isForSale = true;

        emit LandListedForSale(landId, _price);
    }

    function buyLand(uint256 landId) external payable {
        require(lands[landId].isRegistered, "Land not registered");
        require(lands[landId].isForSale, "Land not for sale");
        require(msg.value >= lands[landId].price, "Insufficient funds");

        address seller = lands[landId].owner;
        lands[landId].owner = msg.sender;
        lands[landId].isForSale = false;

        payable(seller).transfer(msg.value);

        emit LandSold(landId, msg.sender, lands[landId].price);
    }

    function getLandDetails(uint256 landId)
        external
        view
        returns (
            uint256 id,
            address owner,
            bool isRegistered,
            uint256 price,
            bool isForSale,
            string memory propertyAddress,
            uint256 dateOfPurchase,
            uint256 costPrice,
            uint256 totalLandArea,
            uint256 postalCode,
            string memory propertyName
        )
    {
        Land memory land = lands[landId];
        return (
            land.id,
            land.owner,
            land.isRegistered,
            land.price,
            land.isForSale,
            land.propertyAddress,
            land.dateOfPurchase,
            land.costPrice,
            land.totalLandArea,
            land.postalCode,
            land.propertyName
        );
    }
}