import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgetsPage from "./pages/ForgotPassword";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgetsPage />} />
        
      </Routes>
    </div>
  );
}

export default App;
