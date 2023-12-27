import { useSelector } from "react-redux";
import { MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

export const NavBar = ({ drawerWidth = 240 }) => {
  const { displayName, lastname, photoURL } = useSelector(
    (state) => state.auth
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            {displayName} {lastname}
          </Typography>

          {photoURL && (
            <img src={photoURL} alt="perfil foto" width={50} height={50} />
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
