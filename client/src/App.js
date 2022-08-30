import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgetsPage from "./pages/ForgotPassword";
import RecordPage from "./pages/Record/RecordPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgetsPage />} />
        <Route path="/recordartefact" element={<RecordPage />} />
        
      </Routes>
    </div>
  );
}

export default App;
