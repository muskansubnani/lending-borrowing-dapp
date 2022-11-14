import { Lending } from "../../models/lending";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useLenderBorrowerContract } from "./../../context/lenderBorrowerContractContext";

export const useContractUserLendings = () => {
  const [userLendings, setUserLendings] = useState([]);
  const { lenderBorrowerContract } = useLenderBorrowerContract();

  useEffect(() => {
    const getUserLendings = async () => {
      const lendings = await lenderBorrowerContract.getUsersLendings();
      let mappedLendings = [];

      for (const thisLending of lendings) {
        if (
          thisLending.lender !== "0x0000000000000000000000000000000000000000"
        ) {
          let startTimeUnixMilliSeconds = new Date(
            thisLending.startTimeInSecs.toNumber() * 1000
          );
          let latestTimeRedeemInterestUnixMilliSeconds = new Date(
            thisLending.latestTimeOfInterestRedeemedInSecs.toNumber() * 1000
          );
          let durationInMilliSeconds = new Date(
            thisLending.durationInSecs.toNumber() * 1000
          );
          let durationInYears =
            thisLending.durationInSecs.toNumber() / (60 * 60 * 24 * 365);

          mappedLendings.push(
            new Lending(
              thisLending.Id.toNumber(),
              thisLending.lender,
              ethers.utils.formatEther(thisLending.lendingAmount),
              thisLending.rateOfReturn.toNumber(),
              thisLending.status,
              ethers.utils.formatEther(thisLending.interestEarnedPerDay),
              startTimeUnixMilliSeconds.toLocaleDateString("default"),
              durationInYears,
              latestTimeRedeemInterestUnixMilliSeconds.toLocaleDateString(
                "default"
              ),
              startTimeUnixMilliSeconds,
              latestTimeRedeemInterestUnixMilliSeconds,
              durationInMilliSeconds
            )
          );
        }
      }
      setUserLendings(mappedLendings);
    };
    getUserLendings().catch(console.error);
  }, []);

  return userLendings;
};
