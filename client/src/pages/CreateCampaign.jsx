import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { money } from "../assets";
import { Button, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const handleFormFieldsChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(ethers.utils.parseUnits(form.target, 18));
    checkIfImage(form.image, async (exist) => {
      if (exist) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Image doesn't exist");
        setForm({ ...form, image: "" });
      }
    });

    // console.log(form);
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            value={form.name}
            handleChange={(e) => {
              handleFormFieldsChange("name", e);
            }}
            inputType="text"
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title for your campaign"
            inputType="text"
            value={form.title}
            handleChange={(e) => {
              handleFormFieldsChange("title", e);
            }}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write a Story"
          isTextArea
          value={form.description}
          handleChange={(e) => {
            handleFormFieldsChange("description", e);
          }}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <p className="font-epilogue font-bold text-[25px] text-white ml-[20px]  ">
            You will get 100% of the money raised
          </p>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="Eth 0.50"
            value={form.target}
            handleChange={(e) => {
              handleFormFieldsChange("target", e);
            }}
            inputType="text"
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => {
              handleFormFieldsChange("deadline", e);
            }}
          />
        </div>
        <FormField
          labelName="Campaign Image *"
          placeholder="Campaign Image"
          inputType="url"
          value={form.image}
          handleChange={(e) => {
            handleFormFieldsChange("image", e);
          }}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <Button
            btnType="submit"
            title="Submit your Campaign"
            styles="bg-[#1dc071] "
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
