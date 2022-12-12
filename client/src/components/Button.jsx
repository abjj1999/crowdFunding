import React from "react";

const Button = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={` font-epilogue font-semibold text-[16px] text-white leading-[26px] min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
