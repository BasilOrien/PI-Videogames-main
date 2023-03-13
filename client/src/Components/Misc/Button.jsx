import React from "react";
import Styles from "../../Styles/css/Button.module.css";

const Button = ({ value, classname, action }) => {
  return (
    <button
      onClick={() => {
        action();
      }}
      className={`${Styles.button} ${Styles[classname]}`}
    >
      {value}
    </button>
  );
};

export default Button;
