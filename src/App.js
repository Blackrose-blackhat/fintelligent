import "./App.css";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AddEditblog from "./pages/AddEditblog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/create" element={<AddEditblog />} />
        <Route path="/update:id" element={<AddEditblog />} />
      </Routes>
    </div>
  );
}

export default App;
