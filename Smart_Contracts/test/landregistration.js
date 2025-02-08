const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LandRegistration", function () {
  let LandRegistration;
  let landRegistration;
  let owner, buyer;

  beforeEach(async function () {
    // Get the ContractFactory and Signers
    LandRegistration = await ethers.getContractFactory("LandRegistration");
    [owner, buyer] = await ethers.getSigners();

    // Deploy the contract
    landRegistration = await LandRegistration.deploy();
    await landRegistration.waitForDeployment(); // Ensure the contract is fully deployed
  });

  it("Should register a new land parcel", async function () {
    const tx = await landRegistration.registerLand(
      "123 Main Street", // Property Address
      ethers.parseEther("50"), // Cost Price (50 ETH)
      1000, // Total Land Area (e.g., 1000 sqm)
      12345, // Postal Code
      "Sunny Acres" // Property Name
    );
    await tx.wait();

    const land = await landRegistration.getLandDetails(0);
    expect(land.owner).to.equal(owner.address);
    expect(land.propertyAddress).to.equal("123 Main Street");
    expect(land.costPrice).to.equal(ethers.parseEther("50"));
    expect(land.totalLandArea).to.equal(1000);
    expect(land.postalCode).to.equal(12345);
    expect(land.propertyName).to.equal("Sunny Acres");
  });

  it("Should allow listing a land parcel for sale", async function () {
    // Register a land parcel first
    await landRegistration.registerLand(
      "123 Main Street",
      ethers.parseEther("50"),
      1000,
      12345,
      "Sunny Acres"
    );

    // List the land for sale
    await landRegistration.listLandForSale(0, ethers.parseEther("100"));

    const land = await landRegistration.getLandDetails(0);
    expect(land.isForSale).to.equal(true);
    expect(land.price).to.equal(ethers.parseEther("100"));
  });

  it("Should allow buying a land parcel", async function () {
    // Register a land parcel
    await landRegistration.registerLand(
      "123 Main Street",
      ethers.parseEther("50"),
      1000,
      12345,
      "Sunny Acres"
    );

    // List the land for sale
    await landRegistration.listLandForSale(0, ethers.parseEther("100"));

    // Buy the land
    const buyerBalanceBefore = await ethers.provider.getBalance(buyer.address);
    const tx = await landRegistration.connect(buyer).buyLand(0, {
      value: ethers.parseEther("100"),
    });
    await tx.wait();

    const land = await landRegistration.getLandDetails(0);
    expect(land.owner).to.equal(buyer.address);
    expect(land.isForSale).to.equal(false);

    const buyerBalanceAfter = await ethers.provider.getBalance(buyer.address);
    expect(buyerBalanceAfter).to.be.lt(buyerBalanceBefore); // Buyer's balance should decrease
  });

  it("Should prevent buying a land parcel with insufficient funds", async function () {
    // Register a land parcel
    await landRegistration.registerLand(
      "123 Main Street",
      ethers.parseEther("50"),
      1000,
      12345,
      "Sunny Acres"
    );

    // List the land for sale
    await landRegistration.listLandForSale(0, ethers.parseEther("100"));

    // Attempt to buy with insufficient funds
    await expect(
      landRegistration.connect(buyer).buyLand(0, {
        value: ethers.parseEther("50"), // Insufficient funds
      })
    ).to.be.revertedWith("Insufficient funds");
  });
});