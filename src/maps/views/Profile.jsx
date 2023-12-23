import { Alert, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const Profile = () => {
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
      
      <form className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre" 
                type="text" 
                placeholder='Nombre' 
                fullWidth
                name="displayName"
                // value={ displayName }
                // onChange={ onInputChange }
                // error={ !!displayNameValid && formSubmitted }
                // helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Apellido" 
                type="text" 
                placeholder='Apellido' 
                fullWidth
                name="lastname"

              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Edad" 
                type="number" 
                placeholder='Edad' 
                fullWidth
                name="age"
      
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Foto de perfil" 
                type="text" 
                placeholder='Foto de perfil' 
                fullWidth
                name="photoURL"

              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
            
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
            
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid item xs={ 12 }>
                <Button 
                  type="submit"
                  variant='contained' 
                  fullWidth>
                  Editar
                </Button>
              </Grid>
            </Grid>


          </Grid>


        </form>

    </Grid>
  )
}
