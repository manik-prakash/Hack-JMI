const hre = require("hardhat");

async function main() {
  const LandRegistration = await hre.ethers.getContractFactory("LandRegistration");
  const landRegistration = await LandRegistration.deploy();
  await landRegistration.waitForDeployment();

  console.log("LandRegistration deployed to:", await landRegistration.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});