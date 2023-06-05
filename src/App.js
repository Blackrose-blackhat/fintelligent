import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import About from "./pages/About";
import Auth from "./pages/Auth";
import "./style.scss";
import "./media-query.css";
import NotFound from "./pages/NotFound";
import AddEditblog from "./pages/AddEditblog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
function App() {
  const [active, setActive] = useState("home");

  return (
    <div className="App">
      <Header setActive={setActive} active={active} />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/create" element={<AddEditblog />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/update:id" element={<AddEditblog />} />
      </Routes>
    </div>
  );
}

export default App;
