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
        }
    }
}