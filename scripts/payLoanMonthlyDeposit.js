const LendBorrow= artifacts.require("LendBorrowContract");

const main = async (cb) => {
    try {
        const lendBorrow = await LendBorrow.deployed();
        let user = (await web3.eth.getAccounts())[2];
        let value = 916;
        let txn = await lendBorrow.payLoanMonthlyDeposit(0, {from: user, value: value});
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