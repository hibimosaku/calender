import { createApp } from "vue";
import router from "./router/router";
import top from "./view/top.vue";
import reservationCalendar from "../src/view/reservationCalendar.vue";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYMRGF4EoPgGLdBLaFHWTWFyj0xbEWfUM",
  authDomain: "calender-69eea.firebaseapp.com",
  projectId: "calender-69eea",
  storageBucket: "calender-69eea.appspot.com",
  messagingSenderId: "265095474653",
  appId: "1:265095474653:web:901024d9b68a03e19c9a34",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// const app = createApp(reservationCalendar);
const app = createApp(top);
app.use(router);
app.mount("#app");
