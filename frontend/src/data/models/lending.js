export class Lending {
  constructor(
    id,
    lenderAddress,
    lendingAmount,
    rateOfReturn,
    status,
    interestEarnedPerDay,
    startDate,
    durationInYears,
    latestInterestRedeemDate,
    startDateTimeMiliSecondsUnix,
    latestInterestRedeemDateUnix,
    durationInMiliSecondsUnix
  ) {
    
    this.id = id;
    this.lenderAddress = lenderAddress;
    this.lendingAmount = lendingAmount;
    this.rateOfReturn = rateOfReturn;
    this.status = status;
    this.interestEarnedPerDay = interestEarnedPerDay;
    this.startDate = startDate;
    this.latestInterestRedeemDate = latestInterestRedeemDate;
    this.durationInYears= durationInYears;
    this.startDateTimeMiliSecondsUnix = startDateTimeMiliSecondsUnix;
    this.latestInterestRedeemDateUnix = latestInterestRedeemDateUnix;
    this.durationInMiliSecondsUnix = durationInMiliSecondsUnix;
  }
}
