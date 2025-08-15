const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DonationModule = buildModule("DonationModule", (m) => {
  const donation = m.contract("DonationContract"); // sesuaikan dengan nama kontrak yang digunakan

  return { donation };
});

module.exports = DonationModule;
