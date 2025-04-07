import { expect } from "chai";
import { ethers } from "hardhat";
// import { parseEther } from "ethers/lib/utils";
import { Bank } from "../typechain-types/Bank"; // Adjust path as necessary
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("Bank Contract", function () {
    let BankFactory: any;
    let bank: Bank;
    let owner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        BankFactory = await ethers.getContractFactory("Bank");
        bank = (await BankFactory.deploy()) as Bank;
        await bank.waitForDeployment();
    });

    it("Should set the correct owner", async function () {
        expect(await bank.owner()).to.equal(owner.address);
    });

    it("Should accept deposits and emit Deposited event", async function () {
        const depositAmount = ethers.parseEther("1");

        await expect(
            bank.connect(user1).deposit({ value: depositAmount })
        )
            .to.emit(bank, "Deposited")
            .withArgs(user1.address, depositAmount);

        const balance = await bank.balances(user1.address);
        expect(balance).to.equal(depositAmount);
    });

    it("Should allow user to withdraw and emit Withdrawn event", async function () {
        const depositAmount = ethers.parseEther("1");
        const withdrawAmount = ethers.parseEther("0.5");

        await bank.connect(user1).deposit({ value: depositAmount });

        await expect(bank.connect(user1).Withdraw(withdrawAmount))
            .to.emit(bank, "Withdrawn")
            .withArgs(user1.address, withdrawAmount);

        const finalBalance = await bank.balances(user1.address);
        expect(finalBalance).to.equal(depositAmount - withdrawAmount);
    });

    it("Should revert withdrawal if insufficient funds", async function () {
        await expect(
            bank.connect(user1).Withdraw(ethers.parseEther("1"))
        ).to.be.revertedWith("Insufficient Funds");
    });

    it("Should allow only owner to view contract balance", async function () {
        const depositAmount = ethers.parseEther("2");
        await bank.connect(user1).deposit({ value: depositAmount });

        const contractBalance = await bank.connect(owner).getContractBalance();
        expect(contractBalance).to.equal(depositAmount);

        await expect(
            bank.connect(user1).getContractBalance()
        ).to.be.revertedWith("Not Owner");
    });

    it("Should return correct user balance via getBalance()", async function () {
        const depositAmount = ethers.parseEther("1");
        await bank.connect(user2).deposit({ value: depositAmount });

        const balance = await bank.connect(user2).getBalance();
        expect(balance).to.equal(depositAmount);
    });
});
