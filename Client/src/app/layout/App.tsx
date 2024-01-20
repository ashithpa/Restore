import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./LoadingComponent";
import { useAppdispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
// const products = [
//   { name: "product1", price: 100 },
//   { name: "product2", price: 200 },
// ];

function App() {
  const dispatch = useAppdispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

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

  if (loading)
    return <LoadingComponent message="Initialising..."></LoadingComponent>;

  return (
    // <>
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        theme="colored"
      ></ToastContainer>
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
