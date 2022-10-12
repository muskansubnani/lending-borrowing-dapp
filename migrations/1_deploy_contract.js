const LendBorrow = artifacts.require("LendBorrowContract");

module.exports = async function (deployer) {
  await deployer.deploy(LendBorrow);
  
};
