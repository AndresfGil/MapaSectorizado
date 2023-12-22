import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth, FirebaseDB } from '../firebase/config';
import { logout, setActiveUser } from '../store/auth';
import { loginWithEmailPassword } from '../firebase/providers';
import { collection, doc, getDoc } from 'firebase/firestore/lite';



export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            if ( !user ) return dispatch( logout() );
       
  
        // // Aquí accedemos a la base de datos para obtener los datos del usuario
        //         const usersCollectionRef = collection(FirebaseDB, 'users');
        //         const userDocRef = doc(usersCollectionRef, user.uid);
        //         const userDocSnapshot = await getDoc(userDocRef);
  
  
        //     const userData = userDocSnapshot.data(); , photoURL, lastname, age
        //     const { lastname, age, photoURL } = userData;

            const { uid, email, displayName } = user;
            dispatch( setActiveUser({ uid, email, displayName }) );
        })
    }, []);

    return status;
}
