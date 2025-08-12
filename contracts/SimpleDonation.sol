// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract SimpleDonation{
  address public immutable owner; // address dari pemilik kontrak yang tidak dapat diubah
  uint public totalDonations;

  struct Donation{
    address donor;
    uint amount;
    uint timestamp;
    string name;
    string message;
    bool isAnonymous;
  }

  Donation[] public donations;

  event DonationReceived(address indexed donor, uint amount, uint timestamp);
  event FundsWithdrawn(address indexed owner, uint amount, uint timestamp);

  constructor() {
    owner = msg.sender;
  }

  // function untuk menerima donasi
  function donate() public payable{
    require(msg.value > 0, "Donation must be greather than 0");
    totalDonations += msg.value;

    donations.push(Donation({
      donor: msg.sender,
      amount: msg.value,
      timestamp: block.timestamp,
      name: "",
      message: "",
      isAnonymous: false
    }));
    
    emit DonationReceived(msg.sender, msg.value, block.timestamp);
  }

  // function fallback jika ada ether yang dikirim langsung ke kontrak
  receive() external payable {
    donate();
  }

  // function untuk menarik dana oleh owner kontrak
  function withdraw(uint _amount)public{
    require(msg.sender == owner, "Only the owner can withdraw funds");
    require(_amount <= address(this).balance, "Insufficient balance");

    payable(owner).transfer(_amount);
    emit FundsWithdrawn(owner, _amount, block.timestamp);
  }
  
  // funtion menampilkan jumlah donasi yang diterima
  function getTotalDonations() public view returns (uint) {
    return totalDonations;
  }

  // function untuk mendapatkan daftar donasi
  function getDonations() public view returns(Donation[] memory) {
    return donations;
  }

  // function untuk mengetahui jumlaah saldo saat ini di smart contract
  function getBalance() public view returns(uint){
    return address(this).balance;
  }
}