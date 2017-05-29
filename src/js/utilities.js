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
 * Will create a name made up of 2 or
 * 3 syllables.
 * @returns {String} A name.
 */
function createName() {
    // First syllables(ish)
    var firstSyllables = [
        "Bot",
        "Ba",
        "Ban",
        "Bam",
        "Che",
        "Chi",
        "Cha",
        "Hi",
        "He",
        "De",
        "Di",
        "Ev",
        "Ki",
        "Ke",
        "Ka",
        "Jen",
        "Shy",
        "Sty",
        "Gia",
        "Mi",
        "Bel",
        "Don",
        "Rem",
        "Cro",
        "Ja",
        "Mi",
        "Mo",
        "Ni",
        "Nu",
        "Swe",
        "Nor",
        "Ear",
        "Ma",
        "We",
        "Dam",
        "Da",
        "Do",
        "La",
        "Lan",
        "Lam",
        "Lo",
        "Al",
        "Am",
        "An",
        "Ba",
        "Bo",
        "Ni",
        "Mi",
        "Mi",
    ];
    // Second and Third syllables(ish)
    var secondSyllables = [
        "ov",
        "ski",
        "wate",
        "ate",
        "te",
        "er",
        "isk",
        "it",
        "ter",
        "bal",
        "fal",
        "tal",
        "wi",
        "zo"
    ];
    var thirdSyllables = [
        "son",
        "sson",
        "orn",
        "is",
        "es",
        "ins",
        "ens",
        "ons",
        "uns",
        "ims",
        "ems",
        "oms",
        "ums",
        "wood",
        "er",
        "man",
        "sun",
        "ig",
        "ing",
        "ting",
        "wes",
        "ien"
    ];
    // Low chance to return three syllables.
    // Note: default for getRandomRange is 0 - 100
    if(getRandomRange() < 8) {
        return getRandomElement(firstSyllables) + getRandomElement(secondSyllables) + getRandomElement(thirdSyllables);
    }
    // Low chance to return one syllable.
    if(getRandomRange() < 4) {
        let syllable = getRandomElement(thirdSyllables);
        if(getRandomRange() < 66) {
            syllable = getRandomElement(firstSyllables);
        }
        else if(getRandomRange() < 50) {
            syllable = getRandomElement(secondSyllables);
        }
        return getRandomElement(syllable).charAt(0).toUpperCase() + syllable.slice(1);
    }
    // Maybe even return two first syllables.
    if(getRandomRange() < 4) {
        return getRandomElement(firstSyllables) + getRandomElement(firstSyllables).toLowerCase();
    }
    // Otherwise, let's use first and second syllables.
    if(getRandomRange() < 50) {
        let syllable = getRandomElement(secondSyllables);
        if(getRandomRange() < 66) {
            return getRandomElement(firstSyllables) + getRandomElement(secondSyllables);
        }
        else if(getRandomRange() < 50) {
            return syllable.charAt(0).toUpperCase() + syllable.slice(1)  + getRandomElement(firstSyllables).toLowerCase();
        }
        else {
            syllable = getRandomElement(thirdSyllables);
            return syllable.charAt(0).toUpperCase() + syllable.slice(1) + getRandomElement(firstSyllables).toLowerCase();
        }
    }
    // Of course, we can always just use first and third syllables.
    else {
        let syllable = getRandomElement(thirdSyllables);
        if(getRandomRange() < 66) {
            return getRandomElement(firstSyllables) + getRandomElement(thirdSyllables);
        }
        else if(getRandomRange() < 50) {
            return syllable.charAt(0).toUpperCase() + syllable.slice(1)  + getRandomElement(secondSyllables);
        }
        else {
            return syllable.charAt(0).toUpperCase() + syllable.slice(1) + getRandomElement(firstSyllables).toLowerCase();
        }
    }
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
 * Returns a random property of an objec that
 * will be provided.
 * @param {Object} An object to get a random property of
 * @returns {Array} The property and object property that was picked.
 */
const getRandomProperty = function(obj) {
      var result = "";
      var count = 0;
      for (var prop in obj)
        if(obj.hasOwnProperty(prop))
          if (Math.random() < 1/++count)
             result = prop;
      return result;
};

/**
 * Will return any similar entires between
 * the two passed in array of arrays.
 * @param {MultidimensionalArray}
 */
const getSimilarEntries = function(mdArray) {
    // Using a set here because we only want unique entries.
    let similarEntries = new Set();
    let indexArray = [];
    let dimensions = mdArray.length;
    for(let i = 0; i < dimensions; i++) {
        /* Use the first element of the multi-dimensional
         * array as the "master" array to key off of. */
        indexArray = mdArray[i];
        for(let array in mdArray) {
            for(let element in mdArray[array]) {
                if(mdArray[array][element] === indexArray[i]) {
                    similarEntries.add(mdArray[array][element]);
                }
            }
        }
    }
    // Cast the Set back to an array
    similarEntries = [...similarEntries];
    return similarEntries;
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
    randomObject: getRandomProperty,
    createName,
    formatNumberAsMoney,
    getSimilarEntries
};