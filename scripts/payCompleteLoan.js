const LendBorrow= artifacts.require("LendBorrowContract");

const main = async (cb) => {
    try {
        const lendBorrow = await LendBorrow.deployed();
        let user = (await web3.eth.getAccounts())[2];
        let value = 11000;
        let txn = await lendBorrow.payCompleteLoan(2, {from: user, value: value});
        console.log(await web3.eth.getBalance(lendBorrow.address));
        console.log(txn);
        console.log(txn.logs[0].args);
    } catch(err) {
        console.log(err);
    }
    cb();
}

  
module.exports = main;