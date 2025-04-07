// scripts/deployContract.ts

import { ethers } from "hardhat";

async function main() {
    const contractFactory = await ethers.getContractFactory("Bank");
    const contract = await contractFactory.deploy();
    await contract.waitForDeployment();

    console.log(`Contract deployed to: ${await contract.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});