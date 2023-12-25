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
        const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
          if (!user) {
            dispatch(logout());
            return;
          }
    
          // Acceder a la información proporcionada por Firebase Authentication
          const { uid, email } = user;
    
          // Acceder a la información adicional en Firestore si está disponible
          const usersCollectionRef = collection(FirebaseDB, 'users');
          const userDocRef = doc(usersCollectionRef, uid);
          const userDocSnapshot = await getDoc(userDocRef);
    
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            // Actualizar el estado del usuario con información de Firestore
            dispatch(setActiveUser(userData));
          } else {
            // Si no hay datos en Firestore, actualizar solo con la información de Firebase Authentication
            dispatch(setActiveUser({ uid, email }));
          }
        });
    
        // Limpieza del efecto al desmontar el componente
        return () => unsubscribe();
      }, [dispatch]);
    
      return status;
    };