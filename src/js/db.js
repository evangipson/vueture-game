import Vue from "vue"
import firebase from "firebase"
import router from "./routes"

var firebaseConfig = {
    apiKey: "AIzaSyAgQR53lgPu39fWHUZ-kYqy4ZHO3xGuw-g",
    authDomain: "vueture-caf88.firebaseapp.com",
    databaseURL: "https://vueture-caf88.firebaseio.com",
    projectId: "vueture-caf88",
    storageBucket: "vueture-caf88.appspot.com",
    messagingSenderId: "1026212136384"
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
                func(true)
                console.log("user logged in " + user.email);
            } else {
                func(false)
                console.log("user not logged in.");
            }
        }, function(error) {
            console.log(error)
        });
    },

    currentUser: function() {
        var theReturn = null;
        if (firebase.auth().currentUser) {
            theReturn = firebase.auth().currentUser;
        }
        return theReturn;
    },

    // Send a request to the login URL and save the returned JWT
    login(email, password) {
        var loginWorked = 0;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            router.go("/");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode == "auth/user-not-found") {
                console.log("user not found.");
                loginWorked = 1;
            }
            else if(errorCode == "auth/wrong-password") {
                console.log("password is wrong.");
                loginWorked = 2;
            }
        });
        return loginWorked;
    },

    signup(email, password) {
        var signupWorked = 0;
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                router.go("/");
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            })

        ).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/email-already-in-use") {
                console.log("Email already in use.");
                signupWorked = 1;
            }
            // ...
        });
        return signupWorked;
    },

    // To log out, we just need to remove the token
    logout() {
        firebase.auth().signOut().then(function() {
            // Redirect to a specified route
            router.go("login");
        }).catch(function(error) {
        // An error happened.
        });
    }
}