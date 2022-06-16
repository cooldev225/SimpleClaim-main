const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const { infos } = require("../address.json")

const bigNum = (num) => num + "0".repeat(18);
const smallNum = (num) => parseInt(num) / bigNum(1);

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  this.MockERC20 = await ethers.getContractFactory("MockERC20");
  this.MockERC20 = await this.MockERC20.deploy();
  await this.MockERC20.deployed();

  this.claimContract = await ethers.getContractFactory("Claim");
  this.claimContract = await this.claimContract.deploy(
    [
      infos[0].address,
      infos[1].address,
      infos[2].address,
      infos[3].address,
      infos[4].address,
    ],
    [
      bigNum(infos[0].tokenBal),
      bigNum(infos[1].tokenBal),
      bigNum(infos[2].tokenBal),
      bigNum(infos[3].tokenBal),
      bigNum(infos[4].tokenBal),
    ],
    this.MockERC20.address
  );
  await this.claimContract.deployed();

  await this.MockERC20.transfer(this.claimContract.address, bigNum(150));

  console.log("erc20 address: ", this.MockERC20.address);
  console.log("claim address: ", this.claimContract.address);

  console.log("Deployed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
