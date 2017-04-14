// Set up our firebase database
const firebaseConfig = (function() {
    // Initialize Firebase
    const config = {
        apiKey: "<insert API key here>",
        authDomain: "<insert API key here>",
        databaseURL: "<insert API key here>",
        storageBucket: "<insert API key here>",
        messagingSenderId: "<insert API key here>"
    };
    firebase.initializeApp(config);
})(); // IIFE for closure

module.exports = firebaseConfig;