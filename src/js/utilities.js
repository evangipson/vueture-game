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

// Return our utilities module 
module.exports = {
    random: getRandomRange
};