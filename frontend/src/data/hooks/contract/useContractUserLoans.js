
import { Loan } from "../../models/loan";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useLenderBorrowerContract } from "./../../context/lenderBorrowerContractContext";

export const useContractUserLoans = () => {
  const [ userLoans, setUserLoans ] = useState([]);
  const { lenderBorrowerContract } = useLenderBorrowerContract();

  useEffect(() => {
    const getUserLoans = async () => {

        let thisLoan = await lenderBorrowerContract.getUsersLoan();
        let mappedLoans = [];
        // need to put a check if the loan struct is initialise to default values, same for lending struct
        // need to update contract to return all loans regardless of whether it's active or not
       // for(const thisLoan of loans)
       // {
            let createTimeUnixMilliSeconds = new Date(thisLoan.creationTimeInSecs.toNumber() * 1000);
            
            mappedLoans.push(
                new Loan(
                    thisLoan.Id.toNumber(),
                    thisLoan.borrower,
                    ethers.utils.formatEther(thisLoan.loanAmount),
                    ethers.utils.formatEther(thisLoan.fullAmount),
                    ethers.utils.formatEther(thisLoan.remainingAmount),
                    ethers.utils.formatEther(thisLoan.interestAmountPerMonth),
                    thisLoan.interest.toNumber(),
                    thisLoan.status,
                    thisLoan.nftInfo.contractAddress,
                    thisLoan.nftInfo.tokenId.toNumber(),
                    createTimeUnixMilliSeconds.toLocaleDateString("default"),
                    thisLoan.durationInYears,
                    ethers.utils.formatEther(thisLoan.monthlyDeposit)
                )
            );
       // }
    
       setUserLoans(mappedLoans);
    };

    getUserLoans().catch(console.error);
  }, []);

  return userLoans;
};
