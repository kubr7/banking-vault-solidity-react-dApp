import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY!
  },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL!,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY!]
    }
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
};

export default config;



// function getEnvVar(name: string): string {
//   const value = process.env[name];
//   if (!value) {
//     throw new Error(`Environment variable ${name} is not defined`);
//   }
//   return value;
// }

// etherscan: {
//   apiKey: getEnvVar("ETHERSCAN_API_KEY")
// },
// networks: {
//   sepolia: {
//     url: getEnvVar("ALCHEMY_SEPOLIA_URL"),
//     accounts: [getEnvVar("ACCOUNT_PRIVATE_KEY")]
//   }
// }

