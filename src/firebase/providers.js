import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseAuth, FirebaseDB } from './config';
import { collection, doc, setDoc } from 'firebase/firestore/lite';


export const registerUserWithEmailPassword = async({ email, password, displayName, lastname, age, photoURL }) => {

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName, email, password });
        
        const userData = {
            displayName,
            lastname,
            age,
            photoURL,
        }

        // const usersCollectionRef = doc(collection(FirebaseDB, 'users'));
        // await setDoc( usersCollectionRef, userData )

        const usersCollectionRef = collection(FirebaseDB, 'users');
        const userDocRef = doc(usersCollectionRef, uid);
        await setDoc( userDocRef, userData )

        //userData.id = usersCollectionRef.id

        return {
            ok: true,
            uid, photoURL, email, displayName, lastname, age, photoURL
        }

    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message }
    }

}


export const loginWithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, displayName } = resp.user;

        return {
            ok: true,
            uid, displayName, email, password
        };

    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}



