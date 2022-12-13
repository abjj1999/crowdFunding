import React, { useState, useEffect } from "react";
import { useStateContext } from "../context";
import { DisplayCampaign } from "../components";
const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const data = await getUserCampaigns();
      setCampaigns(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);
  return (
    <div>
      <DisplayCampaign
        title="My Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Profile;
