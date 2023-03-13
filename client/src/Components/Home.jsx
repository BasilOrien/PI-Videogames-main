import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../redux/actions";
import Styles from "../Styles/css/Home.module.css";
import Card from "./Card";
import HomeFooter from "./HomeFooter";
import Toolbar from "./Toolbar";
const Home = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const { videogames, videogamesSearch } = store;

  useEffect(() => {
    dispatch(getAllVideogames());
  }, []);

  const returnCards =
    videogamesSearch.length > 0
      ? videogamesSearch &&
        videogamesSearch?.map(function (videogame, key) {
          if (key < 12) return <Card key={key} videogame={videogame} />;
        })
      : videogames &&
        videogames?.map(function (videogame, key) {
          if (key < 12) return <Card key={key} videogame={videogame} />;
        });

  return (
    <div className={Styles.container}>
      <Toolbar />
      <div className={Styles.home}>
        {returnCards}
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
