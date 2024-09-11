import React from "react";

const PopUpInputField = ({title,placeholder,handleChange}) => {
  return (
  <div className="form__group">
    <label htmlFor="" className="form__label">{title}</label>
    <input type="text" placeholder={placeholder} onChange={handleChange} className="form__input" />
  </div>
  );
};

export default PopUpInputField;
