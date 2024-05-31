import React, { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import Styles from "../Styles/css/Landing.module.css";
import Button from "./Misc/Button";

const Landing = () => {
  const [redirect, setRedirect] = useState(false);
  const location = useLocation().pathname;

  return redirect ? (
    <Navigate to="/Inicio" />
  ) : location !== "/" && location !== "/landing" ? null : (
    <div className={Styles.landing}>
      <div className={Styles.presentation_container}>
        <h1>Proyecto Individual</h1>
        <h2>Federico Carusso</h2>
      </div>

      <Button
        value={"Game On"}
        classname={"giantBtn"}
        action={() => setRedirect(true)}
      />
    </div>
  );
};

export default Landing;
