
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import AuthRoutes from "./components/AuthRoutes";

function App() {
  return (
      <>
       
          <h1>Sterling Family Artefacts</h1>

          <section id="navigation">
            <a href="/login">Login</a>
            <a href="/about">About Page</a>
            <a href="/dashboard">Dashboard Page</a>
          </section>

          <Routes>
            <Route element={<Login/>} path="/login" exact></Route>
            <Route element={<About/>} path="/about" exact> </Route>
            <Route element={<AuthRoutes/>}>
            <Route element={<Dashboard/>}  path="/dashboard"  exact> </Route>
          </Route>
        </Routes>

  
  
      </>

  );
}

export default App;
