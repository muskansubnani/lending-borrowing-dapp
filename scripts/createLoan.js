const LendBorrow= artifacts.require("LendBorrowContract");
const loanAmount = 10000
const loanDuration=1;
const main = async (cb) => {
    try {
        const lendBorrow = await LendBorrow.deployed();
        let user = (await web3.eth.getAccounts())[2];
        let txn = await lendBorrow.createLoan ( loanAmount, loanDuration, {from: user});
        console.log(txn);
        console.log(txn.logs[0].args);
        console.log(txn.logs[1].args);
        console.log(txn.logs[2].args);
    } catch(err) {
        console.log(err);
    }
    cb();
}

  
module.exports = main;