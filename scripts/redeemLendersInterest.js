const LendBorrow= artifacts.require("LendBorrowContract");
const lenderId = 0;
const main = async (cb) => {
    try {
        const lendBorrow = await LendBorrow.deployed();
        let user = (await web3.eth.getAccounts())[1];
        
        let txn = await lendBorrow.redeemLendersInterest(lenderId, {from: user});
        console.log(txn);
        console.log(txn.logs[0].args);
        console.log(txn.logs[1].args);
    } catch(err) {
        console.log(err);
    }
    cb();
}

module.exports = main;