import { PaletteOptions, createTheme } from "@mui/material";


const palette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: '#FF5733',
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#242526",
  },
};

const theme = createTheme({
  palette
});

export default theme;