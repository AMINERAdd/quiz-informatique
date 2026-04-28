const firebaseConfig = {
    apiKey: "AIzaSyAF7aaeksLKsjCBLhDzTDpJjfv8fapq8WM",
    authDomain: "excel-e3987.firebaseapp.com",
    projectId: "excel-e3987",
    storageBucket: "excel-e3987.firebasestorage.app",
    messagingSenderId: "916795973569",
    appId: "1:916795973569:web:4b51c831384f9d9c845940",
    measurementId: "G-Z8B1GNY2QK"
};
const appId = "plickers-1apic-radouani-live";
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
