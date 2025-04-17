// Import the Firebase SDK
import firebase from "firebase/app"
import "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXVx9hQ9QCmydR-Hmk0Z9U9_-7uI-vJ-8",
  authDomain: "hear4u-f9d58.firebaseapp.com",
  projectId: "hear4u-f9d58",
  storageBucket: "hear4u-f9d58.appspot.com",
  messagingSenderId: "1045244322881",
  appId: "1:1045244322881:web:9a1a9a9a1a9a9a1a9a9a9a",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Firestore
const db = firebase.firestore()
