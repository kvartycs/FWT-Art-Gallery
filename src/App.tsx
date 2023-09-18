import "./App.sass";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Drawer } from "./components/Drawer";

import { Artist, Home } from "./pages";

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="App">
      <div className="container">
        <Drawer isOpened={isOpened} />
        <Header isOpened={isOpened} setIsOpened={setIsOpened} />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/artist/:id" element={<Artist />}></Route>
      </Routes>
      <div className="hr" />
      <div className="container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
