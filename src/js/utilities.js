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

/**
 * Returns an element from the array passed in at
 * random, based on getRandomRange.
 * @param {Array} array
 */
const getRandomElement = function(array) {
    return array[getRandomRange(0,array.length-1)];
}

// Return our utilities module 
module.exports = {
    random: getRandomRange,
    randomElement: getRandomElement
};