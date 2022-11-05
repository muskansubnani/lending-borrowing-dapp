export class Lending {
  constructor(
    id,
    lenderAddress,
    lendingAmount,
    rateOfReturn,
    lenderStatus,
    interestEarnedPerDay,
    startDate,
    latestInterestRedeemDate
  ) {
    this.id = id;
    this.lenderAddress = lenderAddress;
    this.lendingAmount = lendingAmount;
    this.rateOfReturn = rateOfReturn;
    this.lenderStatus = lenderStatus;
    this.interestEarnedPerDay = interestEarnedPerDay;
    this.startDate = startDate;
    this.latestInterestRedeemDate = latestInterestRedeemDate;
  }
}
