import firebase from "firebase";
import router from "./routes";
import token from "./token";

/* INPUT YOUR FIREBASE CONFIG HERE
 * OR ELSE THIS WHOLE PROJECT DOESN'T WORK */
var firebaseConfig = {
    apiKey: token.apiKey,
    authDomain: token.authDomain,
    databaseURL: token.databaseURL,
    projectId: token.projectId,
    storageBucket: token.storageBucket,
    messagingSenderId: token.messagingSenderId
};
firebase.initializeApp(firebaseConfig);

export default {

    firebaseInterface: {
        db: firebase.database(),
        auth: firebase.auth()
    },

    fireInit: function(func) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                func(true);
                console.log("user logged in " + user.email);
            } else {
                func(false);
                console.log("user not logged in.");
            }
        }, function(error) {
            console.log(error);
        });
    },

    currentUser: function() {
        var theReturn = null;
        if (firebase.auth().currentUser) {
            theReturn = firebase.auth().currentUser;
        }
        return theReturn;
    },

    // To log out, we just need to remove the token
    logout() {
        firebase.auth().signOut().then(function() {
            // Redirect to a specified route
            router.go({path:"/login"});
        }).catch(function(error) {
        // An error happened.
        });
    },

    data() {
        return {
        };
    }
};