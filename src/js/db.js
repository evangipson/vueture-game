import Vue from "vue"
import VueFire from "vuefire"
import Firebase from "firebase"

// Link VueFire so we get all that nice auth stuff
Vue.use(VueFire);

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAgQR53lgPu39fWHUZ-kYqy4ZHO3xGuw-g",
    authDomain: "vueture-caf88.firebaseapp.com",
    databaseURL: "https://vueture-caf88.firebaseio.com",
    projectId: "vueture-caf88",
    storageBucket: "vueture-caf88.appspot.com",
    messagingSenderId: "1026212136384"
};
firebase.initializeApp(firebaseConfig);

export default firebase;