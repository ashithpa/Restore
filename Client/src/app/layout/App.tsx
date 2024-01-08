import Catalog from "../../features/catalog/Catalog";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
// const products = [
//   { name: "product1", price: 100 },
//   { name: "product2", price: 200 },
// ];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function ChangeTheme() {
    setDarkMode(!darkMode);
  }

  return (
    // <>
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      {/* <Typography variant="h1">React JS</Typography> */}
      <Header ChangeTheme={ChangeTheme} darkMode={darkMode}></Header>

      <Container>
        {/* <Catalog></Catalog> */}
        <Outlet></Outlet>
      </Container>
    </ThemeProvider>
    // </>
  );
}
export default App;
