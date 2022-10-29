const LendBorrow = artifacts.require("LendBorrowContract");
const TestNft= artifacts.require("TestNft");

module.exports = async function (deployer) {
  await deployer.deploy(LendBorrow);
  const lendBorrowContract = await LendBorrow.deployed();
  await deployer.deploy(TestNft, lendBorrowContract.address);
  
};
