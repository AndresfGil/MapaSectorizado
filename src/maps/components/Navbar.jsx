
 import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
 import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
 import { useSelector } from 'react-redux';



 export const NavBar = ({ drawerWidth = 240 }) => {

    const { displayName, lastname, photoURL } = useSelector( state => state.auth );

    const profileimg = <img src="linkimg" alt="perfil foto" width={10} height={10} />

   return (
     <AppBar 
         position='fixed'
         sx={{ 
             width: { sm: `calc(100% - ${ drawerWidth }px)` },
             ml: { sm: `${ drawerWidth }px` }
          }}
     >
        <Toolbar>
             <IconButton
                 color='inherit'
                 edge="start"
                 sx={{ mr: 2, display: { sm: 'none' } }}
             >
                 <MenuOutlined />
             </IconButton>

             <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                 <Typography 
                    variant='h6' 
                    noWrap component='div'
                    >
                        { displayName } { lastname }
                     </Typography>

                     <Typography 
                    variant='h6' 
                    noWrap component='div'
                    >
                        { profileimg }
                     </Typography>
                 
             </Grid>

         </Toolbar>
     </AppBar>
   )
 }
