import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./Styles/Theme";

function App() {
  const getTheme = () => {
    return JSON.parse(localStorage.getItem('theme')) || false;
  };
  const [darkMode, setDarkMode] = useState(getTheme());

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className="App bg-gray-800">
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <br/>
        <br/>
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
