import { FirebaseDB, FirebaseAuth } from "../../firebase/config";
import { checkingCredentials, logout, login, setActiveUser } from "./";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { loginWithEmailPassword, registerUserWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, verifyBeforeUpdateEmail } from "firebase/auth";


export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName, lastname, age, photoURL }) => {

  return async (dispatch) => {

    const result = await registerUserWithEmailPassword({ email, password, displayName, lastname, age, photoURL, });
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(logout());
  };
};

export const startLoginWithEmailPassword = ({ email, password, displayName, lastname, age, photoURL }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const result = await loginWithEmailPassword({ email, password, displayName, lastname, age, photoURL, });
      if (!result.ok) return dispatch(logout(result.errorMessage));

      const usersCollectionRef = collection(FirebaseDB, "users");
      const userDocRef = doc(usersCollectionRef, result.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        dispatch(setActiveUser(userData));
      } else {

        console.warn("Información del usuario no encontrada en Firestore");
      }
      dispatch(login(result));

    } catch (error) {

      console.error("Error al iniciar sesión:", error);
      dispatch(logout("Error al iniciar sesión"));
    }
  };
};

export const startUpdatingUser = ({ email, oldPassword, newPassword, displayName, lastname, age, photoURL }) => {

  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const userData = { email, newPassword, displayName, lastname, age, photoURL, };

    try {
      const user = FirebaseAuth.currentUser;

      if (email && email !== user.email) {

        const credentials = EmailAuthProvider.credential( user.email, oldPassword );
        await reauthenticateWithCredential(user, credentials);

        await verifyBeforeUpdateEmail(user, email);

      }

      if (newPassword) {

        const credentials = EmailAuthProvider.credential( user.email, oldPassword ); 

        await reauthenticateWithCredential(user, credentials);

        await updatePassword(user, newPassword);

      }

      const usersCollectionRef = collection(FirebaseDB, "users");
      const userDocRef = uid ? doc(usersCollectionRef, uid) : null;

      await updateDoc(userDocRef, { displayName, lastname, age, photoURL });
      console.log("Datos actulizados");

      dispatch(setActiveUser(userData));

      return Promise.resolve();
      
    } catch (error) {
      console.error("Error updating user:", error);
      return Promise.reject(error);
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
