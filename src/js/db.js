let VUETURE = (function(vuetureModule) {
    // Set up our firebase database
    vuetureModule.firebaseConfig = (function() {
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
    // Give back the module
    return vuetureModule;
})(VUETURE || {}); // Loosely Augmented IIFE