import firebase from "firebase";
import token from "./token";
import business from "./business";

/* INPUT YOUR FIREBASE CONFIG HERE
 * OR ELSE THIS WHOLE PROJECT DOESN'T WORK */
const firebaseConfig = {
    apiKey: token.apiKey,
    authDomain: token.authDomain,
    databaseURL: token.databaseURL,
    projectId: token.projectId,
    storageBucket: token.storageBucket,
    messagingSenderId: token.messagingSenderId
};
firebase.initializeApp(firebaseConfig);

function createStaff() {
    // Create a staff member and put him in the database
};

function monitorUserBusiness() {
    // Look at user's businesses and evaulate them
};

firebase.auth().signInWithEmailAndPassword(token.email, token.password).then(function() {
    console.log("signed into firebase!");
    firebase.database().ref("staff/").push().update({
    });
}).catch(function(error) {
    // Handle Errors here.
    console.log(error);
});