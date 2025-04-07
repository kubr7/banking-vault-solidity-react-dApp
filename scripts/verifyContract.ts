// scripts/verifyContract.ts

import { run } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main(): Promise<void> {
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (!contractAddress) {
        throw new Error("CONTRACT_ADDRESS is not defined in the environment variables.");
    }

    await run("verify:verify", {
        address: contractAddress,
    });
}

main().catch((error) => {
    console.error("Verification failed:", error);
    process.exit(1);
});
