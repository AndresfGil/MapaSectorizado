import { useState } from "react";
import Modal from "react-modal"
import { useModalStore } from '../../hooks/useModalStore';


import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, TextField } from '@mui/material';
import { useForm } from '../../hooks';


const formData = {
  displayName: '',
  lastname: '',
  age: '',
  photoURL: '',
  email: '',
  password: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
  lastname: [ (value) => value.length >= 1, 'El apellido es obligatorio.'],
  age: [ (value) => value.length >= 1, 'La edad es obligatoria.'],
  photoURL: [ (value) => value.length >= 5, 'Debe agregar una foto desde un URL valido.']
}


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
Modal.setAppElement('#root');
  

export const InfoModal = () => {

    const { isModalOpen, closeInfoModal } = useModalStore();

    const onCloseModal = () => {
        closeInfoModal();
    }




  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { 
    formState, displayName, email, password, lastname, age, photoURL, onInputChange,
    isFormValid, displayNameValid, lastnameValid, ageValid, photoURLValid, emailValid, passwordValid, 
  } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

  }



  return (
    <Modal
        isOpen={ isModalOpen }
        onRequestClose={ onCloseModal }
        style={ customStyles }
        className={"modal"}
        overlayClassName={"modal-fondo"}
        closeTimeoutMS={ 300 }
    >
        <h1>Actualiza tu informacion</h1>
        <hr />
        <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre" 
                type="text" 
                placeholder='Nombre' 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmitted }
                helperText={ displayNameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Apellido" 
                type="text" 
                placeholder='Apellido' 
                fullWidth
                name="lastname"
                value={ lastname }
                onChange={ onInputChange }
                error={ !!lastnameValid && formSubmitted }
                helperText={ lastnameValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Edad" 
                type="number" 
                placeholder='Edad' 
                fullWidth
                name="age"
                value={ age }
                onChange={ onInputChange }
                error={ !!ageValid && formSubmitted }
                helperText={ ageValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Foto de perfil" 
                type="text" 
                placeholder='Foto de perfil' 
                fullWidth
                name="photoURL"
                value={ photoURL }
                onChange={ onInputChange }
                error={ !!photoURLValid && formSubmitted }
                helperText={ photoURLValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted  }
                helperText={ passwordValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>

              <Grid item xs={ 12 }>
                <Button 
                  type="submit"
                  variant='contained' 
                  fullWidth>
                  Actualizar
                </Button>
              </Grid>
            </Grid>

          </Grid>


        </form>
    </Modal>
  )
}
