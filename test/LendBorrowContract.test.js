const LendBorrowContract = artifacts.require('LendBorrowContract.sol')



function assertLoan(actual, expected) {
    assert.equal(actual.Id, expected.Id, "Id is not correct");
    assert.equal(actual.loanAmount, expected.LoanAmount, "Loan Amount is not correct");
    assert.equal(actual.fullAmount, expected.fullAmount, "FullAmount is not correct");
    assert.equal(actual.pendingAmount, expected.pendingAmount, "Pending Amount is not correct");
    assert.equal(actual.borrower, expected.borrower, "borrower is not correct");
    assert.equal(actual.interest, expected.interest, "interest is not correct");
    assert.equal(actual.duration, expected.duration, "duration is not correct");
    assert.equal(actual.monthlyDeposit, expected.monthlyDeposit, "monthly deposit is not correct");
  }


  function assertLender(actual, expected) {
    assert.equal(actual.Id, expected.Id, "Id is not correct");
    assert.equal(actual.lender, expected.lender, "lender is not correct");
    assert.equal(actual.lendingAmount, expected.lendingAmount, "lendingAmount is not correct");
    assert.equal(actual.rateOfReturn, expected.rateOfReturn, "rate of Return is not correct");
    assert.equal(actual.interestEarnedPerDay, expected.interestEarnedPerDay, "interest earned per day is not correct");
    assert.equal(actual.duration, expected.duration, "duration is not correct");
  }


contract('LendBorrowContract', accounts => {
  let lendBorrowInstance;

before(async () => {
    lendBorrowInstance = await LendBorrowContract.deployed();

    //lenders
    let lenderUser1 = accounts[1];
    let lendingDuration1 = 2;
    let lendingValue1 = 30000;
    
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

    const actualLoan = await lendBorrowInstance.createLoan(loanAmount, loanDuration, { from: loanUser});
    console.log()
    assert.equal(actualLoan, 2);
    console.log(actualLoan);

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

    const actualLender = await lendBorrowInstance.createLender(lenderDuration, { from: lenderUser});

    assertLender(actualLender, expectedLender);

    console.log(actualLender);
})


//Todo

it("should pay Loan Monthly Deposit", async function() {

})


it("should pay Complete Loan", async function() {


})


it("should redeem Interest for lender", async function() {

 
})

//need to use open zeppelin test helpers to simulate time advancement
it("should refund lending amount after time duration for lending is ended", async function() {

})



})