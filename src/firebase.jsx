import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBW8PI0L21jh5tDEuNiaLv-DoveRZWfUxA",
    authDomain: "e-commerce-otp-c119f.firebaseapp.com",
    projectId: "e-commerce-otp-c119f",
    storageBucket: "e-commerce-otp-c119f.appspot.com",
    messagingSenderId: "301751431483",
    appId: "1:301751431483:web:25b3a9cbbce5ccef73c71e",
    measurementId: "G-1NVV6508KX"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)