// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract DonationContract{
  address public immutable owner; // address dari pemilik kontrak yang tidak dapat diubah
  uint public totalDonations;
  uint public goalAmount = 2 ether; // target donasi yang ingin dicapai
  
  struct Donation{
    address donor;
    uint amount;
    uint timestamp;
    string name; 
    string message;
    bool isAnonymous;
  }

  Donation[] private donations;

  event DonationReceived(address indexed donor, uint amount, uint timestamp, string name, string message, bool isAnonymous);
  event FundsWithdrawn(address indexed owner, uint amount, uint timestamp);

  constructor() {
    owner = msg.sender;
  }

  // function untuk menerima donasi
  function donate(string memory _name, string memory _message, bool _isAnonymous) public payable {
    require(msg.value >= 0.001 ether, "Donation must be greater than 0.001 ether");
    totalDonations += msg.value;

    donations.push(Donation({
        donor: msg.sender,
        amount: msg.value,
        timestamp: block.timestamp,
        name: _name,
        message: _message,
        isAnonymous: _isAnonymous
    }));
    
    emit DonationReceived(msg.sender, msg.value, block.timestamp, _name, _message, _isAnonymous);
  }

  // function fallback jika ada ether yang dikirim langsung ke kontrak
  receive() external payable {
    donate("Anonymous", "No message", true);
  }

  // function untuk menarik dana oleh owner kontrak
  function withdraw(uint _amount)public{
    require(msg.sender == owner, "Only the owner can withdraw funds");
    require(_amount <= address(this).balance, "Insufficient balance");

    payable(owner).transfer(_amount);
    emit FundsWithdrawn(owner, _amount, block.timestamp);
  }

  // function untuk riowayat donasi per address
  function getDonationsByAddress(address _donor) public view returns (Donation[] memory) {
    uint count = 0;
    for (uint i = 0; i < donations.length; i++) {
      if (donations[i].donor == _donor) {
        count++;
      }
    }

    Donation[] memory result = new Donation[](count);
    uint index = 0;
    for (uint i = 0; i < donations.length; i++) {
      if (donations[i].donor == _donor) {
        result[index] = donations[i];
        index++;
      }
    }
    return result;
  }
  
  // funtion menampilkan jumlah donasi yang diterima
  function getTotalDonations() public view returns (uint) {
    return totalDonations;
  }

  // function untuk mendapatkan daftar donasi
  function getDonationsList() public view returns(Donation[] memory) {
    return donations;
  }

  // function untuk mendapatkan saldo dari address tertentu
  function getBalance(address _address) public view returns (uint256) {
    return _address.balance;
  }
}