import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyAb_8-6oU6ZgJpT-XDDQQ6Q1uXzR53-W5s",
  authDomain: "form-20a7b.firebaseapp.com",
  projectId: "form-20a7b",
  storageBucket: "form-20a7b.appspot.com",
  messagingSenderId: "1207723243",
  appId: "1:1207723243:web:2c3608a0e1399e300b4aae",
  measurementId: "G-LWDLDJBCWT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 


const querySnapshot = await getDocs(collection(db, "Admin"));
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  const data = doc.data();
  console.log(data);
  getDownloadURL(ref(storage, doc.id))
    .then((url) => {
      console.log(url);
      document.getElementById("inner").innerHTML +=
      `<div class="card mt-2 mb-2" style="width: 20rem;height: 32rem">
      <img src="${url}" class="card-img-top" alt="..." style="width: 20rem;height: 16rem">
      <div class="card-body">
      <h5 class="card-title">Title : ${data.names}</h5>
      <p class="card-text">Description : ${data.descripation}</p>
      <h6 class="card-title">Price : ${data.amount}</h6>
      </div>
      </div>
      `
    })
    .catch((error) => {
      console.log(error);
    });
}); 