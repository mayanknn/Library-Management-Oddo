import {initializeApp} from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyCUUDm7wfyFJoBWBQZAEv8YDKvo3JDdVBg",
    authDomain: "bookify-c7139.firebaseapp.com",
    projectId: "bookify-c7139",
    storageBucket: "bookify-c7139.appspot.com",
    messagingSenderId: "806231357641",
    appId: "1:806231357641:web:f6fc1b290868804f867518",
    measurementId: "G-JVYRWKPD31",
    databaseURL:"https://bookify-c7139-default-rtdb.firebaseio.com/"

};
export const app = initializeApp(firebaseConfig);