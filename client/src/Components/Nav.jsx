import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Styles from "../Styles/css/Nav.module.css";

const Nav = ({ routes }) => {
  const location = useLocation().pathname;
  if (location === "/landing" || location === "/") {
    return null;
  }

  const links = routes ? ["landing", ...routes] : ["landing"];
  return (
    <nav className={Styles.nav}>
      <ul className={Styles.nav__ul}>
        {links &&
          links?.map((link, key) => {
            return (
              <li key={key} className={Styles.nav__ul_li}>
                <NavLink className={Styles.nav__button} to={`/${link}`}>{`${link[0].toUpperCase()}${link.slice(
                  1
                )}`}</NavLink>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default Nav;
