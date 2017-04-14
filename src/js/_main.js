let VUETURE = (function(vuetureModule) {
    // vueture runs on ECMAScript 6!
    'use strict';
    // Import our utility functions
    const utils = vuetureModule.utilities;
    // Variables

    // Functions
    /**
     * Function for initialization of the VUETURE module
     */
    vuetureModule.init = function() {
        return utils.random(-1383874.1,13135030);
    }
    // Give back the module
    return vuetureModule;
})(VUETURE); // Using a tightly augmented IIFE here to ensure this is the driver

// Create a story as soon as we have
// the DOMContentLoaded event fire off.
//adocument.addEventListener("DOMContentLoaded", function() {
    new Vue({
        el: "#app",
        data() {
            return {
                message: VUETURE.init()
            }
        }
    });
//});