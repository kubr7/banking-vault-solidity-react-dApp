// contracts/Bank.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Bank {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    mapping (address => uint) public balances;

    event Deposited(address indexed user, uint amount);
    event Withdrawn(address indexed user, uint amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not Owner");
        _;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    function Withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient Funds");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        
        emit Withdrawn(msg.sender, _amount);
    }

    function getBalance() public view returns (uint) {
        return balances[msg.sender];
    }

    function getContractBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }
}