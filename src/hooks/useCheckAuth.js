import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { logout, setActiveUser } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth, FirebaseDB } from "../firebase/config";
import { collection, doc, getDoc } from "firebase/firestore/lite";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) {
        dispatch(logout());
        return;
      }

      const { uid, email } = user;

      // Acceder a la información adicional en Firestore
      const usersCollectionRef = collection(FirebaseDB, "users");
      const userDocRef = doc(usersCollectionRef, uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        dispatch(setActiveUser(userData));
      } else {

        dispatch(setActiveUser({ uid, email }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return status;
};
