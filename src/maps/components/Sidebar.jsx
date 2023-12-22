import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton } from '@mui/material'
import MapIcon from '@mui/icons-material/Map' 
import { useSelector } from 'react-redux';

 import { DataSaverOffOutlined, LogoutOutlined, SpaceBar, SpaceBarOutlined, SpaceDashboardOutlined } from '@mui/icons-material';
 import { startLogout } from '../../store/auth';
 import { useDispatch } from 'react-redux';

 import logo from '../../resources/map2.png'
import { startActiveGeneralMap, startActiveMedellinMap, startActiveProfile,  } from '../../store/maps/thunks';

 export const Sidebar = ({ drawerWidth = 200 }) => {

    const dispatch = useDispatch();

    const activateGeneralMap = () => {
        dispatch (startActiveGeneralMap() );
    };
    const activateMedellinMap = () => {
        dispatch (startActiveMedellinMap() );
    };
    const activateProfile = () => {
        dispatch (startActiveProfile() );
    };

     const onLogout = () => {
         dispatch( startLogout() );
     }

     const { displayName, lastname } = useSelector( state => state.auth );

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


                 <Toolbar 
                 onClick={activateProfile}
                 >
                    <IconButton 
                     color='white'
                 >
                     <DataSaverOffOutlined />Mi perfil
                 </IconButton>
                    
                 </Toolbar>
                 <Divider />

                 <ListItemButton
                    onClick={activateGeneralMap}
                 >
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mapa General" />
                </ListItemButton>

                 <ListItemButton
                    onClick={activateMedellinMap}
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