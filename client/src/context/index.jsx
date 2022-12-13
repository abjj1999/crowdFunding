import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x4a4Dd95f056c228e55E47a96950F7BD4f3449Bd6"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    console.log(form.target._hex);
    console.log(form);
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.log("contract success", data);
    } catch (err) {
      console.log("contract error", err);
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.call("getCampaigns");

      // console.log(campaigns);
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        image: campaign.image,
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        pId: i,
      }));
      console.log(parsedCampaigns);
      return parsedCampaigns;
    } catch (error) {}
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();

      const userCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner === address
      );

      return userCampaigns;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
