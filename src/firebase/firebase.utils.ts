import {initializeApp} from 'firebase/app';
import {addDoc, collection, doc, getDoc, getFirestore, setDoc} from 'firebase/firestore';
//import auth from 'firebase/auth';
import  { Auth, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signOut, updateProfile } from "firebase/auth";
import IAccount from '../interfaces/IAccount';
//import auth from "firebase/auth";
const config ={
    apiKey: "AIzaSyDwmehGHZTstWFYRkTIZGlgLiVEPLD0IWo",
    authDomain: "clothshop-b6cc2.firebaseapp.com",
    projectId: "clothshop-b6cc2",
    storageBucket: "clothshop-b6cc2.appspot.com",
    messagingSenderId: "644045758042",
    appId: "1:644045758042:web:5249b90958c8338bbc0263",
    measurementId: "G-ZCFMX14DKK"
};
const app = initializeApp(config);
const initauth = getAuth(app);
const auth = getAuth();

//export const signInWithGoogle = () => auth.signInWithPopup(initauth, provider);
export const createUser = async (account:Omit<IAccount,'displayName'>&{displayName?: string})=>{
    try{
        const userCredential = await createUserWithEmailAndPassword(initauth, account.email, account.password)
        const user = userCredential.user;
        if(account.displayName)
            updateProfile(user, {displayName: account.displayName});
        console.log(user);
    }
    catch(err){
        console.log(err);
    }
        
    }
export const ggSignOut = ()=> signOut(auth).then(() => {
    console.log('sign out');
    localStorage.removeItem('myclothToken');
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
export const createUserProfile = async (user:any)=>{

     try {
        const docRef = doc(db,'users',`${user.uid}`);
        const snapShot = await getDoc(docRef);
//   if(!snapShot)
            await setDoc(docRef,{displayName: user.displayName, email: user.email});
      } catch (e) {
        console.error("Error adding document: ", e);
      }

}
export const db = getFirestore(app);

export default initauth;