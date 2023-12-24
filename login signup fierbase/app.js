
let  sbtna=document.getElementById("Signup")
sbtna.addEventListener("click",()=>{

    
    

    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: crimson";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";
    
})

let lbtnq=document.getElementById("logino")
lbtnq.addEventListener("click",()=>{

    
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "crimson";
    document.querySelector(".button-2").style.cssText = "display: none";
    document.querySelector(".button-1").style.cssText = "display: block";
    
})










  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth ,createUserWithEmailAndPassword 
,signInWithEmailAndPassword 
,GoogleAuthProvider,
signInWithPopup, 
// signInWithRedirect 
// , getRedirectResult, 

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
 

  const firebaseConfig = {
    apiKey: "AIzaSyAb_8-6oU6ZgJpT-XDDQQ6Q1uXzR53-W5s",
    authDomain: "form-20a7b.firebaseapp.com",
    projectId: "form-20a7b",
    storageBucket: "form-20a7b.appspot.com",
    messagingSenderId: "1207723243",
    appId: "1:1207723243:web:2c3608a0e1399e300b4aae",
    measurementId: "G-LWDLDJBCWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const provider = new GoogleAuthProvider();


let  btn1=document.getElementById("sbtn")
btn1.addEventListener("click",()=>{
    let  emailq=document.getElementById("sema")
    let  passwordq=document.getElementById("spass")
    createUserWithEmailAndPassword(auth, emailq.value, passwordq.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("signup successfully",user)
      if(user.email == 'admin!@#$@@gmail.com'){
        window.location.href('adminpage')
      }else{
        window.location.href('homepage')
      }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("error",errorCode,errorMessage)
    });
    
})



let shento=document.getElementById("loginhj")
shento.addEventListener("click",()=>{

    let email=document.getElementById("i")
    let password=document.getElementById("p")
    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("usre login  successfully",user)
  })
  .catch((error) => {
      const errorCode = error.code;
    const errorMessage = error.message;
    alert("error  login",errorCode,errorMessage)
  });   
})


let  Googleauth=document.getElementById("googleauth")
Googleauth.addEventListener("click",()=>{  
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user; 
  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
   
});

})






















