import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { useStateContext } from "../context";
import { Button, CountBox, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import { useNavigate } from "react-router-dom";
const CampaignDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { getDonations, address, contract, donate } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donars, setDonars] = useState([]);

  const fetchDonations = async () => {
    const data = await getDonations(state.pId);
    console.log(data);
    setDonars(data);
  };

  useEffect(() => {
    if (contract) fetchDonations();
  }, [contract, address]);
  const remainingDays = daysLeft(state.deadline);
  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);

    setIsLoading(false);
    navigate("/");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px] ">
        <div className="flex-1 flex-col ">
          <img
            src={state.image}
            alt={state.title}
            srcset=""
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days left" value={remainingDays} />
          <CountBox title="Raised Amount" value={state.amountCollected} />
          <CountBox title="Total Backers" value={donars.length} />
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white  uppercase">
              Creator
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] curser-pointer">
                <img
                  src={thirdweb}
                  alt=""
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Story
            </h4>
            <div className="mt-[20px] ">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify ">
                {state.description}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Donors
            </h4>
            <div className="mt-[20px] flex flex-col gap-4 ">
              {donars.length > 0 ? (
                donars.map((donar, index) => (
                  <div
                    key={`${donar.donor}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all ">
                      {index + 1}. {donar.donor}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all ">
                      {donar.amount} ETH
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all ">
                  {" "}
                  No Donors Yet{" "}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 mt-[20px]">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px] ">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] 
                px-[15px] outline-none border-[1px]
                 border-[#3a3a43] bg-transparent text-white 
                 text-[18px] leading-[30px] placeholder:text-[#4b5264]
                  rounded-[10px]"
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="mt-[20px] p-4 bg-[#13131a] rounded-[10px] ">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white ">
                  Back it because you believe in it. Every donation helps.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support this project and <br /> <span>get</span> rewards.
                </p>
              </div>
              <Button
                btnType="button"
                title="Fund Campaign "
                styles="w-full bg-[#8c6dfd] mt-[20px]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
