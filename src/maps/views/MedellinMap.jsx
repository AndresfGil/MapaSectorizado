import { Grid } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Polygon } from '@react-google-maps/api';

export const MedellinMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const centerOfMedellin = { lat: 6.2442, lng: -75.5811 };
  const [mapLoaded, setMapLoaded] = useState(false);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://usc1.contabostorage.com/d069ea98e2df4b0e9e99b1e7b2ca9a58:pruebasceluweb/jsonciudad/medellin.geojson');
        
        if (!response.ok) {
          throw new Error('Error al obtener polígonos');
        }
  
        try {
          const data = await response.json();
          setPolygons(data.features);
        } catch (jsonError) {
          const htmlContent = await response.text();
          console.log('HTML Response:', htmlContent);
          throw jsonError;
        }
      } catch (error) {
        console.error('Error al obtener polígonos:', error);
      }
    };

    if (isLoaded) {
      setMapLoaded(true);
      fetchData();
    }
  }, [isLoaded]);

  if (loadError) return 'Error loading maps';

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'secondary.main', borderRadius: 3 }}
    >
      <Fragment>
        <div style={{ width: '100%', height: '90vh' }}>
          {mapLoaded && (
            <GoogleMap
              center={centerOfMedellin}
              zoom={11.5}
              mapContainerStyle={{
                width: '100%',
                height: '90vh',
              }}
            >
              {polygons.map((feature, index) => {
                if (feature.type === 'Polygon' && feature.coordinates) {
                  return (
                    <Polygon
                      key={index}
                      paths={feature.coordinates[0].map(coords => ({ lat: coords[1], lng: coords[0] }))}
                      options={{ fillColor: '#578B9B', strokeColor: '#000000' }}
                    />
                  );
                } else {
                  // Manejar otros tipos de características si es necesario
                  return null;
                }
              })}
            </GoogleMap>
          )}
        </div>
      </Fragment>
    </Grid>
  );
};