// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


contract LendBorrowContract {

    struct Lend {
        uint Id;
        address lender;
        uint fullAmount;
        uint rateOfReturn;
        uint startDate;//stored in unix epoch no datetime in solidity
        uint maturityDate; //stored in unix epoch no datetime in solidity
        uint latestDateOfInterestPaid;
    }

    enum Status {
        PENDING,
        ACTIVE,
        REPAID
    }

    struct Loan {
        uint Id;
        uint loanAmount;
        uint fullAmount;  // loan + interest
        uint interest;
        address borrower;
        Status status;
        uint creationTime;
        uint duration;
        address nftAddress;
        uint monthlyDeposit;
        bool isOutstanding;
    }

    Loan[] public loans;
    Lend[] public lenders;
    // maybe we need a mapping to keep track of active loans and lenders

    uint liquidityAvailable;

    mapping(uint => uint) public borrowingInterestRates;
    mapping(uint => uint) public lendingReturnRates;

    constructor() {
      liquidityAvailable = 0;
    
      borrowingInterestRates[1] = 8; // 1 year => 8% interest
      borrowingInterestRates[2] = 9; // 2 year => 9% interest

      lendingReturnRates[1] = 5; // 1 year => 5% return
      lendingReturnRates[2] = 6;// 2 year => 6% return

    }

    function checkForActiveLoans(address _address) internal view returns (bool){
        for(uint i=0; i < loans.length; i++) {
                if(loans[i].borrower == _address && loans[i].isOutstanding ) {
                return true;
                }
            }
        return false;
    }

    // to do function to calculate full amount


    // to do monthly deposit calc
    function calculateMonthlyLoanDeposit(uint fullAmount, uint loanDuration, uint interestRate ) internal pure returns (uint){

       
    }


    function createLoan( uint loanAmount, uint loanDuration, address nftAddress) external payable  {


        require(checkForActiveLoans(msg.sender), 'You have an outstanding loan, cannot create a new loan at this moment');

        uint loanId = loans.length;

        uint interestRate = borrowingInterestRates[loanDuration];
       // need to call function to calculate full amount and add it loan struct
       // then need to call monthly deposit method to calculte montly deposit

        // loans.push(
        //     Loan(
        //         loanId, 
        //         loanAmount, 
        //         interestRate, 
        //         msg.sender,
        //         Status.PENDING,
        //         block.timestamp,
        //         loanDuration,
        //         nftAddress

        //         ));


    }











}