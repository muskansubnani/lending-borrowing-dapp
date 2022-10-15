require("@openzeppelin/test-helpers/configure")({
    provider: web3.currentProvider,
    singletons: {
      abstraction: "truffle",
    },
  });



const LendBorrowContract = artifacts.require('LendBorrowContract.sol')

const { balance, time, constants, expectRevert } = require('@openzeppelin/test-helpers');

contract('LendBorrowContract', accounts => {
  let lendBorrowInstance;

before(async () => {
    lendBorrowInstance = await LendBorrowContract.deployed();

    //lenders
    let lenderUser1 = accounts[1];
    let lendingDuration1 = 2;
    let lendingValue1 = 30000 ;
    
    await lendBorrowInstance.createLender(lendingDuration1, {from: lenderUser1 , value: lendingValue1});

    let lenderUser2 = accounts[2];
    let lendingDuration2 = 1;
    let lendingValue2 = 20000;
    
    await lendBorrowInstance.createLender(lendingDuration2, {from: lenderUser2 , value: lendingValue2});

    //loaners
    let loanAmount1= 10000;
    let loanDuration1 = 1;
    let loanUser1 = accounts[3];

    await lendBorrowInstance.createLoan(loanAmount1, loanDuration1, { from: loanUser1});

    let loanAmount2= 20000;
    let loanDuration2 = 2;
    let loanUser2 = accounts[4];

    await lendBorrowInstance.createLoan(loanAmount2, loanDuration2, { from: loanUser2});

    })

it('deploys successfully', async function() {
    const address = await lendBorrowInstance.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
    })

it('should get the liquidityAvailable', async function() {
    const liquidityAvailable = await lendBorrowInstance.getLiquidityAvailable();
    assert.equal(liquidityAvailable, 50000);
    })

it("should get all Lenders", async function() {
    const allLenders = await lendBorrowInstance.getAllLenders();
    assert.equal(allLenders.length, 2);
    })

it("should get all Loaners", async function() {
    
    const allLoaners = await lendBorrowInstance.getAllLoaners();
    assert.equal(allLoaners.length, 2);
    })


it("should get given addresses loan", async function() {
    
    let loanUser = accounts[3];

    const givenAddressLoan = await lendBorrowInstance.getUsersLoan({ from: loanUser}); 

    assert.equal(givenAddressLoan.borrower, loanUser);

    })

it("should get given address lendings", async function() { 

    lenderUser = accounts[1];
    const givenAddressLendings = await lendBorrowInstance.getUsersLendings({from: lenderUser}); 
    assert.equal(givenAddressLendings.length, 1);
})

it("should create Loan correctly", async function() {


    let loanAmount= 10000;
    let loanDuration= 1;
    let loanUser= accounts[6];


    let expectedLoan = {
        Id: 2,
        loanAmount: loanAmount,
        fullAmount: 11000,
        pendingAmount: 11000,
        interest: 10,
        borrower: loanUser,
        duration: loanDuration,
        monthlyDeposit: 916
      };

    const result = await lendBorrowInstance.createLoan(loanAmount, loanDuration, { from: loanUser});

    const eventLoanCreation = result.logs[0].args;
   
    assert.equal(eventLoanCreation._loanId, expectedLoan.Id, "Id is not correct");
    assert.equal(eventLoanCreation._borrower, expectedLoan.borrower, "Borrower is not correct" );
    assert.equal(eventLoanCreation._amount, expectedLoan.loanAmount, "LoanAmount is not correct")
    assert.equal(eventLoanCreation._interest, expectedLoan.interest, "interest is not correct");
    assert.equal(eventLoanCreation._fullAmount, expectedLoan.fullAmount, "FullAmount is not correct");
    assert.equal(eventLoanCreation._monthlyDepositAmount, expectedLoan.monthlyDeposit, "monthlyDeposit is not correct");
})

it("should create Lender correctly", async function() {

    let lenderAmount= 100000;
    let lenderDuration= 2;
    let lenderUser= accounts[7];

    let expectedLender = {
        Id: 2,
        lender: lenderUser,
        lendingAmount: lenderAmount,
        rateOfReturn: 6,
        interestEarnedPerDay: 8,
        duration: lenderDuration
      };

    const result = await lendBorrowInstance.createLender(lenderDuration, { from: lenderUser, value : lenderAmount});

    const eventLenderCreation = result.logs[0].args;

    assert.equal(eventLenderCreation._lenderId, expectedLender.Id, "Id is not correct");
    assert.equal(eventLenderCreation._lender, expectedLender.lender, "lender is not correct" );
    assert.equal(eventLenderCreation._amount, expectedLender.lendingAmount, "Lender Amount is not correct")
    assert.equal(eventLenderCreation._rateOfReturn, expectedLender.rateOfReturn, "Rate of Return is not correct");
    assert.equal(eventLenderCreation._interestEarnedPerDay, expectedLender.interestEarnedPerDay, "interest earned per is not correct");
})


//Todo

it("should pay Loan Monthly Deposit", async function() {

    let loanId=0;
    let value = 916;
    let pendingAmount= 10084;
    let user = accounts[3];

    await lendBorrowInstance.transferLoanFunds(loanId, {from: user});

    const result = await lendBorrowInstance.payLoanMonthlyDeposit(loanId, {from: user, value: value});

    const eventLoanDeposit = result.logs[0].args;

    assert.equal(eventLoanDeposit._loanId, loanId, "Id is not correct");
    assert.equal(eventLoanDeposit._borrower, user, "user is not correct" );
    assert.equal(eventLoanDeposit._depositAmount, value, "deposit is not correct")
    assert.equal(eventLoanDeposit._pendingAmount,  pendingAmount, "Pending Amount is not correct");
})


it("should pay Complete Loan", async function() {

    let loanId=2;
    let user = accounts[6];
    let value = 11000;
    let pendingAmount= 0;

    await lendBorrowInstance.transferLoanFunds(loanId , {from: user});

    const result = await lendBorrowInstance.payCompleteLoan(loanId, {from: user, value: value});

    const eventPayCompleteLoan = result.logs[0].args;

    assert.equal(eventPayCompleteLoan._loanId, loanId, "Id is not correct");
    assert.equal(eventPayCompleteLoan._borrower, user, "user is not correct" );
    assert.equal(eventPayCompleteLoan._depositAmount, value, "deposit is not correct")
    assert.equal(eventPayCompleteLoan._pendingAmount,  pendingAmount, "Pending Amount is not correct");


})

it("should not redeem Interest for lender before 24 hours", async function() {

  let lenderId = 2;
  let user = accounts[7];
   await time.increase(time.duration.hours(1));

   await expectRevert(
    lendBorrowInstance.redeemLendersInterest(lenderId, {from: user}),
    "interest is earned in 24 hours, please check back later"
  );

})

it("should redeem Interest for lender after 1 day", async function() {

    let lenderId = 2;
    let user = accounts[7];
    let interestRedeemed = 8;

   await time.increase(time.duration.days(1));

   const result = await lendBorrowInstance.redeemLendersInterest(lenderId, {from: user});

   const eventLenderInterestRedemption = result.logs[0].args;

   assert.equal(eventLenderInterestRedemption._lenderId, lenderId, "Id is not correct");
   assert.equal(eventLenderInterestRedemption._lender, user, "user is not correct" );
   assert.equal(eventLenderInterestRedemption._interestRedeemed,  interestRedeemed, "interest redeemed is not correct")
 
})

it("should redeem Interest for lender after 2 day", async function() {

    let lenderId = 2;
    let user = accounts[7];
    let interestRedeemed = 16;

   await time.increase(time.duration.days(2));

   const result = await lendBorrowInstance.redeemLendersInterest(lenderId, {from: user});

   const eventLenderInterestRedemption = result.logs[0].args;

  
   assert.equal(eventLenderInterestRedemption._lenderId, lenderId, "Id is not correct");
   assert.equal(eventLenderInterestRedemption._lender, user, "user is not correct" );
   assert.equal(eventLenderInterestRedemption._interestRedeemed,  interestRedeemed, "interest redeemed is not correct")
   
})

//notes

//need to use open zeppelin test helpers to simulate time advancement DONE 

it("should refund lending amount after time duration for lending is ended", async function() {



    


})



})