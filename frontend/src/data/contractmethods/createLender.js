import { ethers } from "ethers";

export async function createLender(lenderBorrowerContract, amount, duration)
{
    console.log(amount.toString());
    let lenderTx = await lenderBorrowerContract.createLender(
       duration,
       {value: ethers.utils.parseEther(amount.toString())}
    );
    
    let receipt = await lenderTx.wait();

    return receipt;
}