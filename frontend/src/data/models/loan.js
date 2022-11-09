export class Loan {
  constructor(
    id,
    borrowerAddress,
    loanAmount,
    fullAmount,
    remainingAmount,
    interestAmountPerMonth,
    interest,
    status,
    nftAddress,
    nftTokenId,
    createdDate,
    duration,
    monthlyDeposit
  ) {
    this.id = id;
    this.borrowerAddress = borrowerAddress;
    this.loanAmount = loanAmount;
    this.fullAmount = fullAmount;
    this.remainingAmount = remainingAmount;
    this.interestAmountPerMonth = interestAmountPerMonth;
    this.interest = interest;
    this.status = status;
    this.nftAddress = nftAddress;
    this.nftTokenId = nftTokenId;
    this.createdDate = createdDate;
    this.duration = duration;
    this.monthlyDeposit = monthlyDeposit;
    
  }
}
