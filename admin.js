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


let btn = document.getElementById("public-post")
btn.addEventListener("click", async (e) => {
  let img = document.getElementById("image").files[0];
  let titel = document.getElementById("title")
  let amount = document.getElementById("name1")
  let des = document.getElementById("description");
  if(titel.value == '' || amount.value == '' || des.value == '' || img.files == ''){
    alert('All Fileld are required')
  }else{
    try {
      const docRef = await addDoc(collection(db, "Admin"), {
      names: titel.value,
      amount: amount.value,
      descripation: des.value,
    });
    console.log("Document written with ID: ", docRef.id);
    const storageRef = ref(storage, docRef.id);
    uploadBytes(storageRef, img).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      alert('Data Save successfully');
      location.reload();
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
})


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
      <div class="d-flex justify-content-around align-items-end">
      <button onclick="edit('${doc.id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
      <button onclick="dele('${doc.id}')">Delete</button>
      </div>
      </div>
      </div>
      `
    })
    .catch((error) => {
      console.log(error);
    });
});


function edit(e) {
  console.log(e);
  document.getElementById('edit-post').addEventListener('click',() => {
    let img = document.getElementById("image-edit").files[0];
    let titel = document.getElementById("title-edit")
    let amount = document.getElementById("name1-edit")
    let des = document.getElementById("description-edit");
    if(titel.value == '' || amount.value == '' || des.value == '' || img.files == undefined){
      alert('All Fileld are required')
    }else{
      const storageRef = ref(storage, e);
      uploadBytes(storageRef, img).then( async (snapshot) => {
      const washingtonRef = doc(db, "Admin", e);
      await updateDoc(washingtonRef, {
        names: titel.value,
        amount: amount.value,
        descripation: des.value,
      });
      console.log('Uploaded a blob or file!');
      alert('Data Edit successfully');
      location.reload();
    });
  }
  });
}

function dele(e) {
  console.log(e);
  const desertRef = ref(storage, e);
  deleteObject(desertRef).then(async () => {
    await deleteDoc(doc(db, "Admin", e));
    alert('File deleted successfully');
    location.reload();
  }).catch((error) => {
    console.log(error);
  });
}

window.edit = edit
window.dele = dele





