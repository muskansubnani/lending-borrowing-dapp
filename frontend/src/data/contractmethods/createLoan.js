export async function createLoan(lenderBorrowerContract, amount, duration, nftAddress, nftTokenId, nftFloorPrice)
{
    let loanId = await lenderBorrowerContract.createLoan(
        amount,
        duration,
        nftAddress,
        nftTokenId,
        nftFloorPrice
    );
    return loanId;
}