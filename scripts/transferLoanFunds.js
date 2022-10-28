const LendBorrow= artifacts.require("LendBorrowContract");
const main = async (cb) => {
    try {
        const lendBorrow = await LendBorrow.deployed();
        let txn = await lendBorrow.transferLoanFunds(0, {from: ""});
        console.log(await web3.eth.getBalance(lendBorrow.address));
        console.log(txn);
        console.log(txn.logs[0].args);
        console.log(txn.logs[1].args);
    } catch(err) {
        console.log(err);
    }
    cb();
}
  
module.exports = main;