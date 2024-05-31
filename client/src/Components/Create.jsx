import React, { cloneElement, useState } from "react";
import { Navigate } from "react-router-dom";
import Styles from "../Styles/css/Create.module.css";
import { useSelector } from "react-redux";

import axios from "axios";

const Create = () => {
  const [done, setDone] = useState(false);
  const [newGameData, setNewGameData] = useState({
    name: "",
    description: "",
    reldate: "",
    rating: 0,
    image: "",
    platform: "",
    genre: [],
  });

  const store = useSelector((s) => s);
  const { genres } = store;

  function addNewGenre() {
    const cn = `.${Styles.genresSelect}`;
    const div = document.querySelector(cn);

    const select = document.createElement("select");
    select.setAttribute("name", "genre");
    select.setAttribute("class", `${Styles.genreOption}`);
    select.onchange = (e) => onChangeHandler(e);
    const firstChild = document.createElement("option");
    firstChild.innerText = "Selecciona un género";
    select.appendChild(firstChild);
    genres &&
      genres?.forEach((child) => {
        const option = document.createElement("option");
        option.innerText = `${child.name}`;
        select.appendChild(option);
      });

    div.appendChild(select);
  }

  function deleteLastGenre() {
    const cn = `.${Styles.genresSelect}`;
    const div = document.querySelector(cn);
    if (div.lastChild) {
      div.lastChild.remove();
    } else {
      alert("No hay generos para eliminar");
    }
  }

  function onChangeHandler(e) {
    if (e.target.name === "platform" || e.target.name === "genre") {
      if (e.target.name === "genre") {
        setNewGameData({
          ...newGameData,
          [e.target.name]: [...newGameData[`${e.target.name}`], e.target.value],
        });
      } else {
        setNewGameData({
          ...newGameData,
          [e.target.name]: e.target.value,
        });
      }
      return;
    }

    setNewGameData({
      ...newGameData,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmitHandler(e) {
    e.preventDefault();

    if (
      !newGameData.name ||
      !newGameData.description ||
      !newGameData.reldate ||
      !newGameData.rating ||
      !newGameData.image ||
      !newGameData.platform ||
      !newGameData.genre
    ) {
      alert("Faltan campos")
      return;
    }

    const axiosPostResponse = await axios
      .post("http://localhost:3001/videogames", {
        ...newGameData,
        platform: newGameData.platform.split(" "),
      })
      .then(() => {
        setDone(true);
      })
      .catch("failed");
  }

  return done ? (
    <Navigate to="/inicio" />
  ) : (
    <div className={Styles.createContainer}>
      <form onSubmit={(e) => onSubmitHandler(e)} action="/videogames">
        <input
          onChange={(e) => {
            onChangeHandler(e);
          }}
          type="text"
          name="name"
          placeholder="Titulo"
          value={newGameData.name}
        />
        <input
          onChange={(e) => {
            onChangeHandler(e);
          }}
          type="date"
          name="reldate"
          placeholder="Fecha de lanzamiento"
          value={newGameData.reldate}
        />
        <div className={Styles.rangeContainer}>
          <label htmlFor="rating">{`Rating: `}</label>

          <input
            onChange={(e) => {
              onChangeHandler(e);
            }}
            className={Styles.range}
            type="range"
            min={1}
            max={5}
            name="rating"
            step={0.5}
            id=""
            value={newGameData.rating}
          />
          <label htmlFor="rating">{` ${newGameData.rating}`}</label>
        </div>

        <input
          onChange={(e) => {
            onChangeHandler(e);
          }}
          type="url"
          name="image"
          id=""
          placeholder="Url de la Imagen"
          value={newGameData.image}
        />
        <textarea
          onChange={(e) => {
            onChangeHandler(e);
          }}
          name="description"
          cols="30"
          rows="10"
          placeholder="Ingresa la descripcion del juego"
          value={newGameData.description}
        ></textarea>
        <input
          onChange={(e) => {
            onChangeHandler(e);
          }}
          type="text"
          name="platform"
          placeholder="Ingresa las plataformas separadas por un espacio"
          value={newGameData.platform}
        />
        <div className={Styles.genresSelect}>{}</div>

        <button
          type="button"
          onClick={(e) => {
            addNewGenre();
          }}
        >
          Agregar género
        </button>
        <button
          type="button"
          onClick={(e) => {
            deleteLastGenre();
          }}
        >
          Eliminar género
        </button>

        <button className={Styles.submitBtn} type="submit">
          Añadir
        </button>
      </form>
    </div>
  );
};

export default Create;
