import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUUn-Id8poq-9kC7NVjWUUSqljoRAhL6M",
  authDomain: "timesweeper-defcf.firebaseapp.com",
  projectId: "timesweeper-defcf",
  storageBucket: "timesweeper-defcf.appspot.com",
  messagingSenderId: "593818531207",
  appId: "1:593818531207:web:e1e2f7946b13802dd28f22",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)


