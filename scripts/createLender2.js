const LendBorrow= artifacts.require("LendBorrowContract");
const lenderDuration = 2;
const main = async (cb) => {
    try {
        const lendBorrow = await LendBorrow.deployed();
        let user = (await web3.eth.getAccounts())[3];

        let value = 100000;

        let txn = await lendBorrow.createLender(lenderDuration, {from: user, value: value});

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