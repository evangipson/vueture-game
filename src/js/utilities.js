let VUETURE = (function(vuetureModule) {
    /**
     * Returns a number that is random within range.
     * @param {Number} min
     * @param {Number} max
     * @returns A number in the range specified. Defaults
     * to 0 - 100.
     */
    const getRandomRange = function(min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    // Return our vuetureModule utilities
    vuetureModule.utilities = {
        random: getRandomRange
    };
    // Give back the module
    return vuetureModule;
})(VUETURE || {}); // Loosely augmented IIFE - will fill up our module if it's there, otherwise will create one.