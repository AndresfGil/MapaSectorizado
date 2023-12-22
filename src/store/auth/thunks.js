import { loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { checkingCredentials, logout, login, setActiveUser } from './';
import { FirebaseDB } from '../../firebase/config';
import { collection, doc, getDoc } from 'firebase/firestore/lite';

export const checkingAuthentication = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName, lastname, age, photoURL }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailPassword({ email, password, displayName, lastname, age, photoURL });
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        console.log('Datos que se están pasando al Redux Store:', result);

    }

}


export const startLoginWithEmailPassword = ({ email, password, displayName, lastname, age, photoURL }) => {
    return async (dispatch) => {
      dispatch(checkingCredentials());
  
      try {
        const result = await loginWithEmailPassword({ email, password, displayName, lastname, age, photoURL });
        if (!result.ok) return dispatch(logout(result.errorMessage));
  
        // Aquí accedemos a la base de datos para obtener los datos del usuario
        const usersCollectionRef = collection(FirebaseDB, 'users');
        const userDocRef = doc(usersCollectionRef, result.uid);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
  
          // Establecemos los datos del usuario en el estado
          dispatch(setActiveUser(userData));
        } else {
          // Manejar el caso en el que no se encuentre la información del usuario en Firestore
          console.warn('Información del usuario no encontrada en Firestore');
        }
  
        // Continuamos con la acción de inicio de sesión
        dispatch(login(result));
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        dispatch(logout('Error al iniciar sesión'));
      }
    };
  };


export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();
        dispatch( logout() );

    }
}

