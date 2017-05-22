import firebase from "firebase";
import token from "../js/token";
import business from "../js/business";
import staff from "../js/staff";

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

function monitorUserBusiness() {
    // Look at user's businesses and evaulate them
    firebase.database().ref("users/").once("value", function(data) {
        // do some stuff once
        var userList = data.val();
        var businessRef = {};
        var businessList = [];
        var happyIndex = 0;
        for(user in userList) {
            businessList = userList.user.businesses;
            for(business in businessList) {
                staffList = businessList.business.staff;
                businessRef = firebase.database().ref("users/" + user + "/businesses");
                for(employee in staffList) {
                    happyIndex = staff.findHappiness(staffList.employee, businessList.business.type);
                    if(happyIndex > 1) {
                        businessRef.child(business).update({
                            value: happyIndex
                        });
                    }
                }
            }
        }
    });
};

firebase.auth().signInWithEmailAndPassword(token.email, token.password).then(function() {
    console.log("signed into firebase!");
    monitorUserBusiness();
}).catch(function(error) {
    // Handle Errors here.
    console.log(error);
});