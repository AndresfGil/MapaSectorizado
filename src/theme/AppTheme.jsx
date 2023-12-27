import { blueTheme } from "./";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";


export const AppTheme = ({ children }) => {
  
  return (
    <ThemeProvider theme={blueTheme}>
      <CssBaseline />

      {children}

    </ThemeProvider>
  );
};
