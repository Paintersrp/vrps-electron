import "./App.css";
import { lazy, Suspense } from "react";
import { Sidebar } from "./components/Sidebar";
import { HashRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "./components/Loading";

const Duplication = lazy(() => import("./pages/Duplication/Duplication"));
const BarcodeGenerator = lazy(
  () => import("./pages/BarcodeGenerator/BarcodeGenerator")
);
const Dwells = lazy(() => import("./pages/Dwells/Dwells"));

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD166",
    },
    secondary: {
      main: "#FFD166",
    },
    background: {
      default: "#001F3F",
      paper: "#002b57",
    },
    text: {
      primary: "#FFD166",
      secondary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
    duration: {
      shortest: 150,
      enteringScreen: 225,
      leavingScreen: 195,
      standard: 250,
    },
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 2,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Sidebar>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Duplication />} />
              <Route path="/barcode" element={<BarcodeGenerator />} />
              <Route path="/dwells" element={<Dwells />} />
            </Routes>
          </Suspense>
        </Sidebar>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
