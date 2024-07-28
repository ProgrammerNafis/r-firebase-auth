import "./App.css";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";

initializeApp(firebaseConfig);

function App() {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState({
    iSi: false,
    name: '',
    photo:'',
    email:'',
  })
  
  const SignInClick = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // console.log(token);
        // The signed-in user info.
        const {displayName, photoURL, email} = result.user;
        const userInfo = {
          iSi: true,
          name: displayName,
          photo: photoURL,
          email: email,
        }
        setUser(userInfo)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // // The email of the user's account used.
        // const email = error.customData.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  
  const SignOutClick = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      const SignOUTed = {
        iSi: false,
        name:'',
        photo:'',
        email:'',
      }
      setUser(SignOUTed)
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <div className="App">
      {
        user.iSi ? <button onClick={SignOutClick}>Sign OUt</button> :
        <button onClick={SignInClick}>SIGN IN</button>

      }
    {
      user.iSi && <div>
        <h1>Welcome Back, {user.name}</h1>
        <h3>YOur Email: {user.email}</h3>
        <img src={user.photo} width={80} height={80} alt="" />
      </div>
    }

    </div>
  );
}

export default App;
