import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton } from '@mui/material'
import MapIcon from '@mui/icons-material/Map' 
import { useSelector } from 'react-redux';

 import { LogoutOutlined } from '@mui/icons-material';
 import { startLogout } from '../../store/auth';
 import { useDispatch } from 'react-redux';

 import logo from '../../resources/map2.png'
import { startActiveMap } from '../../store/maps/thunks';

 export const Sidebar = ({ drawerWidth = 200 }) => {

    const dispatch = useDispatch();

    const activateMap = () => {
        dispatch (startActiveMap() );
    };

     const onLogout = () => {
         dispatch( startLogout() );
     }

     const { displayName } = useSelector( state => state.auth );

     return (
         <Box
             component='nav'
             sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
         >
             <Drawer
                 variant='permanent' // temporary
                 open
                 sx={{ 
                     display: { xs: 'block' },
                     '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                 }}
             >
                 <Toolbar >
                    <img src={logo} alt="Logo del mapa" width={100} height={100} />
                 </Toolbar>
                 <Divider />

                 <ListItem>
                    <Typography 
                    variant='h6' 
                    noWrap component='div'
                    >
                         { displayName }
                     </Typography>
                </ListItem>

    
                 <Divider />

                 <ListItemButton
                    onClick={activateMap}
                 >
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mapa Medellín" />
                </ListItemButton>

                 <IconButton 
                     color='error'
                     onClick={ onLogout }
                 >
                     <LogoutOutlined />
                 </IconButton>

             </Drawer>

         </Box>
     )
 }