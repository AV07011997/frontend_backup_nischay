import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage/homepage";
import LandingPage from "./components/landingpage/landingpage";
import Upload from "./components/upload/upload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Download } from "@mui/icons-material";
import Downloadpage from "./components/download/download";
import Bureau from "./components/bureau/bureau";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/upload/:radiovalue" element={<Upload />} />
          <Route path="/download/:radiovalue" element={<Downloadpage />} />
          <Route path="/bureau/:radiovalue" element={<Bureau />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
