// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LendBorrowContract {
    enum LoanStatus {
        PENDING,
        ACTIVE,
        REPAID
    }

    enum LenderStatus {
        ACTIVE,
        MATURED
    }

    struct Nft {
        address contractAddress;
        uint tokenId;
    }

    struct Loan {
        uint Id;
        uint loanAmount;
        uint fullAmount;  // loan + interest
        uint pendingAmount;
        uint interest;
        address borrower;
        LoanStatus status;
        uint creationTime;
        uint duration;
        Nft nftInfo;
        uint monthlyDeposit;
    }

    struct Lend {
        uint Id;
        address lender;
        uint lendingAmount;
        uint rateOfReturn;
        uint interestEarnedPerDay; // storing return amount per day for now ( something to discuss)
        uint startTime;//stored in unix epoch no datetime in solidity
        uint duration; //stored in unix epoch no datetime in solidity
        LenderStatus status;
        uint latestDateOfInterestRedeemed; //stored in unix epoch no datetime in solidity
    }

    Loan[] public loans;
    Lend[] public lenders;
    // maybe we need a mapping to keep track of active loans and lenders

    uint liquidityAvailable;

    mapping(uint => uint) public borrowingInterestRates;
    mapping(uint => uint) public lendingReturnRates;

    // emit function for logging 
    event LogLoanCreation(uint indexed _loanId,address indexed _borrower, uint indexed _amount);
    event LogRetrievedLoan(uint indexed _loanId, address indexed _borrower, uint indexed _amountRetrieved);
    event LogLoanDeposit(address indexed _borrower, uint indexed _depositAmount);
    event LogLoanPaid(address indexed _borrower, uint indexed _loanID, uint indexed _paidBack);

    event LogLenderCreation(uint indexed _lendId,address indexed _lender, uint indexed _amount);

    constructor() {
      liquidityAvailable = 0;
    
      borrowingInterestRates[1] = 10; // 1 year => 10% interest
      borrowingInterestRates[2] = 11; // 2 year => 11% interest

      lendingReturnRates[1] = 5; // 1 year => 5% return
      lendingReturnRates[2] = 6;// 2 year => 6% return
    }

    receive() external payable {}

    // loan methods
    function checkForActiveLoans(address _address) internal view returns (bool){
        for(uint i=0; i < loans.length; i++) {
            if(loans[i].borrower == _address && loans[i].status == LoanStatus.ACTIVE ) {
                return true;
            }
        }
        return false;
    }

    // to do function to calculate full amount
    function calculateTotalAmountOwedByBorrower(uint _loanAmount, uint _interestRate) internal pure returns (uint) {

       return (_loanAmount + ((_loanAmount * _interestRate)/100));
    }

    // to do monthly deposit calc
    function calculateMonthlyLoanDeposit(uint _fullAmount, uint _loanDuration) internal pure returns (uint) {
      
      return _fullAmount/_loanDuration;
       
    }

    function createLoan( uint _loanAmount, uint _loanDuration, address _nftAddress, uint _nftTokenId) external returns (uint) {

         //_nftTokenId should be retrieved by etherscan api
        require(checkForActiveLoans(msg.sender), 'You have an outstanding loan, cannot create a new loan at this moment');

        uint loanId = loans.length;

        uint interestRate = borrowingInterestRates[_loanDuration];
        uint fullAmount = calculateTotalAmountOwedByBorrower(_loanAmount, interestRate); 
        uint monthlyDeposit = calculateMonthlyLoanDeposit(fullAmount, _loanDuration);

        loans.push(
            Loan(
                loanId, 
                _loanAmount,
                fullAmount,
                fullAmount,  // initially pending amount equals fullAmount
                interestRate, 
                msg.sender,
                LoanStatus.PENDING,
                block.timestamp,
                _loanDuration,
                Nft(_nftAddress, _nftTokenId),
                monthlyDeposit
                ));


        emit LogLoanCreation(loanId, msg.sender, _loanAmount);

        return loanId;
    }

    // method to transfer funds to borrower after loan is created this method will also transfer NFT to the contract ( should be atomic swap in future)

    function transferLoanFunds (uint _loanId) external payable {

        require(msg.sender == loans[_loanId].borrower, "Funds can only be transfered to the borrower of this loan");
        require(loans[_loanId].fullAmount != 0, "There are no funds to retrieve");
        uint256 loanAmount = loans[_loanId].fullAmount;
        
        // transfer NFT assuming the owner has approved this smart contract to execute transfer from 
        ERC721(loans[_loanId].nftInfo.contractAddress).transferFrom(msg.sender, address(this), loans[_loanId].nftInfo.tokenId);
        
        // set the full amount to 0 first
        loans[_loanId].fullAmount = 0;

        // update liquidity value  need to discuss update here or  during loan creation?
        liquidityAvailable = liquidityAvailable - loans[_loanId].loanAmount;

        // transfer funds to the caller
        (bool success, ) = msg.sender.call{value: msg.value}("");

        require(success, "Error: Transfer failed.");

        emit LogRetrievedLoan(_loanId, msg.sender, loanAmount);
    }

    // method for borrowers to pay entire amount
    function payCompleteLoan(uint _loanId) external payable
    {
        require(msg.sender == loans[_loanId].borrower, "You must be the assigned borrower for this loan");
        require(msg.value == (loans[_loanId].fullAmount), "You must pay the full loan amount includinginterest");
        require(loans[_loanId].status == LoanStatus.ACTIVE, "Loan status must be ACTIVE");

        
        (bool success, ) = payable(address(this)).call{value: msg.value}("");
        require(success, "Error: Transfer failed.");

        loans[_loanId].status = LoanStatus.REPAID;

        liquidityAvailable = liquidityAvailable + msg.value;  // update liquidity pool back

        emit LogLoanPaid(msg.sender, _loanId, msg.value);
    }

    //method for borrowers to to pay monthly deposit
    function payLoanDeposit (uint _loanId) external payable 
    {
        require(loans[_loanId].status == LoanStatus.ACTIVE, "Loan status must be Active");
        require(msg.value >= loans[_loanId].monthlyDeposit, "You must deposit amount atleast the monthly deposit amount ");
        require(msg.value <= loans[_loanId].fullAmount, "Your deposit amount exceeds your loan amount");
        require(msg.sender == loans[_loanId].borrower, "You must be the assigned borrower for this loan");
        
        loans[_loanId].fullAmount = loans[_loanId].fullAmount - msg.value;

        (bool success, ) = payable(address(this)).call{value: msg.value}("");

        require(success, "Error: Transfer failed.");

        emit LogLoanDeposit(msg.sender, msg.value);

        if(loans[_loanId].fullAmount == 0)
        {
            loans[_loanId].status = LoanStatus.REPAID;

            emit LogLoanPaid(msg.sender, _loanId, msg.value);
        }

        liquidityAvailable = liquidityAvailable + msg.value; // update liquidity pool back
    }


     // to do function to calculate full amount
    function calculateInterestEarnedPerDay (uint _lendingAmount, uint _rateOfReturn, uint _duration) internal pure returns (uint) {

        return (((_lendingAmount * _rateOfReturn)/ 100) /(365*2)) ;
    }

    // Lender methods
    function createLender(uint _lendingDuration) external payable returns (uint)
    {
        require( msg.value >0, "Please enter a valid amount to lend");
        uint lenderId = lenders.length;
        uint rateOfReturn =   lendingReturnRates[_lendingDuration];
        uint interestEarnedPerDay = calculateInterestEarnedPerDay(msg.value, rateOfReturn, _lendingDuration);

        (bool success, ) = payable(address(this)).call{value: msg.value}("");

        require(success, "Error: Transfer failed.");

        lenders.push(
            Lend(
            lenderId,
            msg.sender,
            msg.value,
            rateOfReturn,
            interestEarnedPerDay,
            block.timestamp,
            _lendingDuration,
            LenderStatus.ACTIVE,  
            block.timestamp  // same as start date of lending 
            )
        );

        liquidityAvailable = liquidityAvailable + msg.value;

        emit LogLenderCreation(lenderId, msg.sender, msg.value);

        return lenderId;
    }

    //method  for redeeming interest for lenderers



    // method to transfer back locked amount for lenders after the duration is complete












}