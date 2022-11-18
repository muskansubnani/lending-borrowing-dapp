# Lending Borrowing Dapp

## About The Project
This DApp allows one to borrow ETH against a NFT collatoral as well as earn interest on lending ETH to the platform for a given duration in a transparent manner using blockchain and smart contracts.


## Technology Stack & Tools
  - Solidity (Writing Smart Contracts & Tests)
- Javascript (React & Testing)
- Truffle (Development Framework)
- Ethers.js (Blockchain Interaction)
- React.js (Frontend Framework)
- Wagmi (React Hooks for Ethereum) 
- RainbowKit (Wallet Connection)🌈
         
## Prerequisites 
To engage with the Dapp you will need the following :

* NodeJS ([https://nodejs.org/en/](https://nodejs.org/en/))
	> npm install nodejs
* Ganache([https://www.trufflesuite.com/ganache](https://www.trufflesuite.com/ganache))
	>npm install ganache-cli -g
* Truffle([https://www.trufflesuite.com/truffle] (https://www.trufflesuite.com/truffle))
	> npm install truffle
* Wallet ( one of the following )
	> * Metamask (Chrome Extension) 🦊
  > * Rainbow
  > * CoinbaseWallet
  > * WalletConnect
  

## Setting Up

* Clone/Download the repository
* Install dependencies in truffle and client folder
	>npm install
* Truffle([https://www.trufflesuite.com/truffle] (https://www.trufflesuite.com/truffle))
	> npm install truffle
* Run tests
  > $ truffle test
* Start local Ganache Node
	> In a separate terminal execute run the following command : Ganache
* Deploy script locally
	>  Inside truffle folder run the following command
   > * $ truffle console --network development
   > * $ truffle compile
   > * $ truffle migrate
* Run react project
	>  In frontend folder run the following command
  > $ npm start
      
      
 ## Functionality

**Get User Loan** - Each loan that gets created is assigned a unique ID that increments sequentially, such that the first loan that gets created will have an `ID` of 1. With this `ID` we are then able to retrieve successfully created loans that point to that `ID` from the blockchain. An address can only have one active loan at a given time.

**Get User Lending** - Each lending that gets created is assigned a unique ID that increments sequentially, such that the first lending that gets created will have an `ID` of 1. With this `ID` we are then able to retrieve successfully created lending that point to that `ID` from the blockchain. An address can have multiple active lendings at a time.

**Create Loan** - Allows the user to create a loan by providing `Duration`, `Loan Amount`, `NFT Contract Address`, `NFT Token Id`, and lastly the `NFT Floor Price` which the dapp retrieves it via opensea nft api. The value of the loan must be greater than 0. The interest rate is decided based on the duration of loan. Once the loan is create, You can view the loan under current activity on account history page.

**Pay Monthly Deposit** - Allows the assigned borrower to pay the monthly deposit of the loan in which his/hers address was assigned to. 

**Pay Complete Loan** - This allows the borrower to pay back the remaining amount of the loan. The borrower can obtain the required amount to be paid by looking up his loan using the `ID`. Once the borrower has paid this amount, the `Loan Status` will change to `MATURED`, indicating the maturity of the loan.

**Create Lender** - Allows user to create a lending by providing `Lending Amount`, `Duration`. The value of the lending must be greater than 0. The interest rate is decided based on the duration of lending. Once the lending is created, You can view the lending under current activity on account history page.

**Redeem Lenders Interest** - This allows the lender to redeem interest earned on their lending. Interest is decided based on the duration of lending.

**Retrieve Lender Funds** - This allows the lender to retrieve the lending amount when the `Lender Status` is updated to `MATURED`.


      
  
  
 

  







