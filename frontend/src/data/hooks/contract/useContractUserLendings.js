import { Lending } from "../../models/lending";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useLenderBorrowerContract } from "./../../context/lenderBorrowerContractContext";

export const useContractUserLendings = () => {
  const [ userLendings, setUserLendings ] = useState([]);
  const { lenderBorrowerContract } = useLenderBorrowerContract();

  useEffect(() => {
    const getUserLendings = async () => {

        const lendings = await lenderBorrowerContract.getUsersLendings();
        let mappedLendings = [];
        
        for(const thisLending of lendings)
        {
            let startTimeUnixMilliSeconds = new Date(thisLending.startTimeInSecs.toNumber() * 1000);
            let latestTimeRedeemInterestUnixMilliSeconds = new Date(thisLending.latestTimeOfInterestRedeemedInSecs.toNumber()*1000);
    
            mappedLendings.push(
                new Lending(
                    thisLending.Id.toNumber(),
                    thisLending.lender,
                    ethers.utils.formatEther(thisLending.lendingAmount),
                    thisLending.rateOfReturn.toNumber(),
                    thisLending.status,
                    ethers.utils.formatEther(thisLending.interestEarnedPerDay),
                    startTimeUnixMilliSeconds.toLocaleDateString("default"),
                    latestTimeRedeemInterestUnixMilliSeconds.toLocaleDateString("default")
                )
            );
        }
        setUserLendings(mappedLendings);
    };
    getUserLendings().catch(console.error);
  }, []);

  return userLendings;
};
