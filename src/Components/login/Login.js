
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import firebase from "firebase/app";
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";


firebase.initializeApp(firebaseConfig);

function Login() {
  const[newUser, setNewUser] = useState(false)
  const[user,setUser] = useState({
    isSignedIn: false,
    newUser: false,
    name:'',
    email:'',
    password:'',
    photo:''
    
  });

  const[loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbprovider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(googleProvider)
    .then(res=>{
      const {displayName, photoURL, email} = res.user
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        
      }
      setUser(signedInUser)      
      console.log(displayName, email, photoURL,)
    })

    .catch(err =>{
      console.log(err);
      console.log(err.message)
    })
  }

  const handleFbSignIn = () =>{
    firebase.auth().signInWithPopup(fbprovider)
    .then((result) => {
    
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    console.log("User after fb login", user)

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
  }

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res=>{
      const signedOutUser = {
        isSignedIn: false,
        name:'',
        email:'',
        photo:'',
        error:'',
        success:false
       
      }

      setUser(signedOutUser)
      console.log(res)
    })

    
  }

  const handleChange = (e) =>{
    
    let isFieldValid = true;
    if(e.target.name === "email"){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
    }

    if(e.target.name === "password"){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber
    }

    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }

  const handleSubmit = (e) =>{
    //console.log(user.email, user.password)
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
    // Signed in 
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name)
    // ...
  })
  .catch(error => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false
    setUser(newUserInfo)

    // ..
  });
    }

    if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log('sign in user info', res.user)
    })
    .catch((error) => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false
      setUser(newUserInfo);
     
    });
    }

  e.preventDefault()
  }

  const updateUserName = (name) =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
      
    }).then(res=> {
      console.log('username updated!')
    }).catch(error => {
      console.log(error)
    });
  }
  return (
    <div style = {{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick = {handleSignOut}>Sign Out</button> :
        <button onClick = {handleSignIn}>Sign in</button>
      }
      <button onClick = {handleFbSignIn}>login in with facebook</button>

      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our authentication system</h1>
      <input type="checkbox" onChange = {()=>setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">new user sign up</label>
      <form onSubmit = {handleSubmit}>
      {newUser && <input type="text" name = "name" onBlur = {handleChange} placeholder = "Name" />}
      <br/>
        <input type="text" name = "email" onBlur = {handleChange} placeholder = "Email" required/>
        <br/>
        <input type="password" name = "password" onBlur = {handleChange} placeholder = "Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'sign up' : 'sign in'}/>
      
      </form>
      <p style = {{color: 'red'}}>{user.error}</p>
      {user.success && <p style = {{color: 'green'}}>user {newUser ? 'created' : 'logged in'} successfully!</p>}
    </div>
  );
}

export default Login;
