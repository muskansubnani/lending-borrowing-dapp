const LendBorrow= artifacts.require("LendBorrowContract");

const borrower = "";
const nftContractAddress = "";
const nftTokenId = 1;

const ERC721_ABI = [
    {
        "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
        "name": "ownerOf",
        "outputs": [{"internalType": "address", "name": "owner", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }
];

const main = async (cb) => {
    try {
        const lendBorrow = await LendBorrow.deployed();
       
        let value = 11000;

        let txn = await lendBorrow.payCompleteLoan(0, {from:borrower, value: value});
        console.log(await web3.eth.getBalance(lendBorrow.address));

        console.log(txn);
        console.log(txn.logs[0].args);
        console.log(txn.logs[1].args);

        const nftContract = new web3.eth.Contract(ERC721_ABI, nftContractAddress);
        const owner = await nftContract.methods.ownerOf(nftTokenId).call();
        console.log(owner);

    } catch(err) {
        console.log(err);
    }
    cb();
}

  
module.exports = main;