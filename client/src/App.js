import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./Components/Create";
import Home from "./Components/Home";
import Info from "./Components/Info";
import JuegoId from "./Components/JuegoId";
import Landing from "./Components/Landing";
import Nav from "./Components/Nav";
import "./redux/actions";
import { getAllGenres } from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGenres());
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Nav routes={["Inicio", "Crear", "Info"]} />
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/crear" element={<Create />} />
          <Route path="/juego/:id" element={<JuegoId />} />
          <Route path="/info" element={<Info />} />
          <Route path="*" element={""}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
