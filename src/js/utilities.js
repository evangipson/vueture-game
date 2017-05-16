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
    return array[getRandomRange(0,array.length)];
};

/**
 * Will return the number given to it as money,
 * seperated by ',' and '.'
 * formatNumberAsMoney(156443.4633); // returns $156,443.46
 * formatNumberAsMoney(15788); // returns $15,788.00
 * @param {Number} number
 */
const formatNumberAsMoney = function(number) {
    var re = '\\d(?=(\\d{' + 3 + '})+' + '\\.' + ')';
    return Number(number).toFixed(Math.max(0, ~~2)).replace(new RegExp(re, 'g'), '$&,');
};

// Return our utilities module 
module.exports = {
    random: getRandomRange,
    randomElement: getRandomElement,
    formatNumberAsMoney
};