import { initializeApp } from 'firebase/app'
//import { collection, query, where, onSnapshot  } from 'firebase/firestore'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = ({ 
  apiKey: "AIzaSyDhg7-FjE40x1m7kr9rWk3UgGFOerVTGqU",
  authDomain: "qtwitter-e3c81.firebaseapp.com",
  projectId: "qtwitter-e3c81",
  storageBucket: "qtwitter-e3c81.appspot.com",
  messagingSenderId: "547309898202",
  appId: "1:547309898202:web:2508f976f237ae15e258e3"
 })

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db

//const db = getFirestore(firebaseApp)
