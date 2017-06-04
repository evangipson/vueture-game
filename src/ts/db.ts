import firebase from "firebase";
import Router from "./routes";
import Token from "./token";

/* INPUT YOUR FIREBASE CONFIG HERE
 * OR ELSE THIS WHOLE PROJECT DOESN'T WORK */
const firebaseConfig: object = {
    apiKey: Token.apiKey,
    authDomain: Token.authDomain,
    databaseURL: Token.databaseURL,
    projectId: Token.projectId,
    storageBucket: Token.storageBucket,
    messagingSenderId: Token.messagingSenderId,
};
firebase.initializeApp(firebaseConfig);

/* ================ */
/* PUBLIC FUNCTIONS */
/* ================ */

export function db(): any {
    return firebase.database();
}

export function auth(): any {
    return firebase.auth();
}

export function currentUser(): firebase.User | null {
    // Can't assign Firebase.User to null, so making this an "any" type
    let theReturn: any = null;
    if (firebase.auth().currentUser) {
        // This will cast theReturn to a firebase.User type
        theReturn = firebase.auth().currentUser;
    }
    /* But we can return both a firebase.User or null,
     * so just return theReturn. */
    return theReturn;
}

    // To log out, we just need to remove the token
export function logout(): void {
    firebase.auth().signOut().then(function() {
        // Redirect to trigger the login page.
        Router.go(0);
    }).catch(function(error) {
        // An error happened.
    });
}

export function fireInit(func): void {
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
}