import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { useState } from "react";
import { darkTheme, lightTheme } from "./Styles/Theme";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className="App bg-gray-800">
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
