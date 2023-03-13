import React from "react";
import pi_img from '../Misc/img/img__pi.gif'

function Info() {
  return (
    <div style={styles.div}>
      <h2 style={styles.h2}>Pi creado por Federico Carusso (BasilOrien)</h2>
      <img src={pi_img} alt="pi_imgg" />
    </div>
  );
}

const styles = {
  div: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  h2: {
    textAlign: "center",
    fontSize: "5vmin",
    textShadow: "1px 1px 1px #5625ff"
  },
};
export default Info;
