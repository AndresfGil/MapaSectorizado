import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton } from '@mui/material'
import MapIcon from '@mui/icons-material/Map' 
import { useSelector } from 'react-redux';

 import { DataSaverOffOutlined, EditAttributesOutlined, EditNoteOutlined, LogoutOutlined, SpaceBar, SpaceBarOutlined, SpaceDashboardOutlined } from '@mui/icons-material';
 import { startLogout } from '../../store/auth';
 import { useDispatch } from 'react-redux';

 import logo from '../../resources/map2.png'
import { startActiveGeneralMap, startActiveMedellinMap  } from '../../store/maps/thunks';
import { InfoModal } from './InfoModal';
import { useModalStore } from '../../hooks/useModalStore';


 export const Sidebar = ({ drawerWidth = 200 }) => {

    const { openInfoModal } = useModalStore();

    const onClick = ( event ) => {
        openInfoModal()
    }

    const dispatch = useDispatch();

    const activateGeneralMap = () => {
        dispatch (startActiveGeneralMap() );
    };
    const activateMedellinMap = () => {
        dispatch (startActiveMedellinMap() );
    };

    const onLogout = () => {
         dispatch( startLogout() );
     }

     return (
        <>
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
                 
                 >
                    <IconButton 
                     color='white'
                     onClick={onClick}
                 >
                    <EditNoteOutlined />  Editar datos
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
         <InfoModal></InfoModal>
         </>
     )
 }