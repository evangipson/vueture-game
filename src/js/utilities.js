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
        "Bant",
        "Ban",
        "Bam",
        "Che",
        "Chi",
        "Cha",
        "Hi",
        "He",
        "Del",
        "Dip",
        "Ev",
        "Kev",
        "Kin",
        "Kee",
        "Kag",
        "Jen",
        "Shy",
        "Sty",
        "Gia",
        "Mich",
        "Bel",
        "Don",
        "Rem",
        "Cro",
        "Jame",
        "Mil",
        "Mor",
        "Mon",
        "Ni",
        "Nu",
        "Swe",
        "Nor",
        "Ear",
        "Ma",
        "Well",
        "Dam",
        "Dan",
        "Dal",
        "Dol",
        "La",
        "Lan",
        "Lam",
        "Lol",
        "Al",
        "Am",
        "An",
        "Ba",
        "Bo",
        "Nitt",
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
        "e",
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
    if(getRandomRange() < 8) {
        return getRandomElement(firstSyllables);
    }
    // Otherwise, just return two syllables made up of either...
    if(getRandomRange() < 33) {
        // Two first syllables
        return getRandomElement(firstSyllables) + getRandomElement(firstSyllables).toLowerCase();
    }
    else if(getRandomRange() < 50) {
        // first + second syllable
        return getRandomElement(firstSyllables) + getRandomElement(secondSyllables);
    }
    else {
        // first + third syllable
        return getRandomElement(firstSyllables) + getRandomElement(thirdSyllables);
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
}

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
    formatNumberAsMoney
};