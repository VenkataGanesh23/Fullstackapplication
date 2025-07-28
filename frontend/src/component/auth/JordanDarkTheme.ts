import { createTheme } from "@mui/material/styles";

const jordanDarkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1f1f21",
      paper: "#1f1f21",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
  },
});

export default jordanDarkTheme;
