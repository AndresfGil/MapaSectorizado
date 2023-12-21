import { Grid } from '@mui/material';

import { Fragment, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';



export const GeneralMap = () => {

  const centerOfColombia = { lat: 4.5709, lng: -74.2973 };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  });

  const [markerPosition, setMarkerPosition] = useState(() => {
    const storedPosition = localStorage.getItem('markerPosition');
    return storedPosition ? JSON.parse(storedPosition) : centerOfColombia;
  });

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem('markerPosition', JSON.stringify(markerPosition));
  }, [markerPosition]);

  useEffect(() => {
    if (isLoaded) {
      setMapLoaded(true);
    }
  }, [isLoaded]);

  if (loadError) return 'Error loading maps';

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'secondary.main', borderRadius: 3 }}
    >

<Fragment>
      <div style={{ width: '100%', height: '90vh' }}>
        <div style={{ width: '100%', height: '90vh' }}>
          {mapLoaded && (
            <GoogleMap
              center={centerOfColombia}
              zoom={6}
              mapContainerStyle={{
                width: '100%',
                height: '90vh',
              }}
            >
            </GoogleMap>
          )}
        </div>
      </div>
    </Fragment>
    
    </Grid>
  )
}