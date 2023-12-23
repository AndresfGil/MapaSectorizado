import { loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { checkingCredentials, logout, login, setActiveUser } from './';
import { FirebaseDB, FirebaseAuth } from '../../firebase/config';
import { collection, doc, getDoc, updateDoc} from 'firebase/firestore/lite';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from 'firebase/auth';

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
        dispatch( logout() )
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


export const startUpdatingUser = ({ email, oldPassword, newPassword, displayName, lastname, age, photoURL }) => {
  return async( dispatch, getState ) => {

      const { uid } = getState().auth;

      const userData = { email, newPassword, displayName, lastname, age, photoURL }

      try {

        const user = FirebaseAuth.currentUser;

        //Correo
        if (email && email !== user.email) {
          // Vuelve a autenticar al usuario con su contraseña actual
          const credentials = EmailAuthProvider.credential(user.email, oldPassword); // Reemplaza 'userProvidedPassword' con la contraseña proporcionada por el usuario
          await reauthenticateWithCredential(user, credentials);
  
          // Actualiza la dirección de correo electrónico
          await updateEmail(user, email);
          console.log('Correo actualizado');
        }

        //Contraseña
        if ( newPassword ) {
           // Vuelve a autenticar al usuario con su contraseña actual
          const credentials = EmailAuthProvider.credential(user.email, oldPassword); // Reemplaza 'userProvidedPassword' con la contraseña proporcionada por el usuario
          await reauthenticateWithCredential(user, credentials);

          await updatePassword(user, newPassword);
          console.log('contraseña actulizada')
        }

        //Datos
        const usersCollectionRef = collection(FirebaseDB, 'users');
        const userDocRef = doc(usersCollectionRef, uid);
        await updateDoc(userDocRef, {
          displayName,
          lastname,
          age,
          photoURL,
        })
        console.log('Datos actulizados')

        dispatch(setActiveUser(userData));

        return Promise.resolve();
        
      } catch (error) {
        console.error('Error updating user:', error);
        return Promise.reject(error);
      }

      
}







}


export const startLogout = () => {
    return async( dispatch ) => {
        
        await logoutFirebase();
        dispatch( logout() );

    }
}

