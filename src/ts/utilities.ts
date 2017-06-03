/**
 * Returns a number that is random within range.
 * @param {number} minimum value for the random range.
 * @param {number} maximum value for the random range.
 */
function getRandomRange(min = 0, max = 100): number {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Will create a name made up of 2 or
 * 3 syllables.
 */
function createName(): string {
    let syllable: string = "";
    // Set up the syllables that we will pull from.
    const firstSyllables: string[] = [
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
    const secondSyllables: string[] = [
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
        "zo",
    ];
    const thirdSyllables: string[] = [
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
        "ien",
    ];
    // Low chance to return three syllables.
    // Note: default for getRandomRange is 0 - 100
    if (getRandomRange() < 8) {
        return getRandomElement(firstSyllables) + getRandomElement(secondSyllables) + getRandomElement(thirdSyllables);
    }
    // Low chance to return one syllable.
    if (getRandomRange() < 4) {
        if (getRandomRange() < 66) {
            syllable = getRandomElement(firstSyllables);
        }
        else if (getRandomRange() < 50) {
            syllable = getRandomElement(secondSyllables);
        }
        else {
            syllable = getRandomElement(thirdSyllables).charAt(0).toUpperCase() + syllable.slice(1);
        }
        return syllable;
    }
    // Maybe even return two first syllables.
    if (getRandomRange() < 4) {
        return getRandomElement(firstSyllables) + getRandomElement(firstSyllables).toLowerCase();
    }
    // Otherwise, let's use first and second syllables.
    if (getRandomRange() < 50) {
        if (getRandomRange() < 66) {
            return getRandomElement(firstSyllables) + getRandomElement(secondSyllables);
        }
        else {
            syllable = getRandomElement(secondSyllables);
            return syllable.charAt(0).toUpperCase() + syllable.slice(1) + getRandomElement(firstSyllables).toLowerCase();
        }
    }
    // Of course, we can always just use first and third syllables.
    else {
        syllable = getRandomElement(thirdSyllables);
        if (getRandomRange() < 66) {
            return getRandomElement(firstSyllables) + getRandomElement(thirdSyllables);
        }
        else if (getRandomRange() < 50) {
            return syllable.charAt(0).toUpperCase() + syllable.slice(1)  + getRandomElement(secondSyllables);
        }
        else {
            return syllable.charAt(0).toUpperCase() + syllable.slice(1) + getRandomElement(firstSyllables).toLowerCase();
        }
    }
}

/**
 * Returns an element from the array passed in at
 * random, based on getRandomRange. Using generics here
 * to ensure the return type matches the type of array
 * passed in.
 * @param {any[]} array in which to find a random element.
 */
function getRandomElement(array: any[]): any {
    return array[getRandomRange(0,array.length)];
}

/**
 * Returns a random property of an object that
 * will be provided.
 * @param {Object} An object to get a random property of
 */
function getRandomProperty(obj: Object): Object {
      let result: string = "";
      let count: number = 0;
      for (let prop in obj)
        if (obj.hasOwnProperty(prop))
          if (Math.random() < 1 / ++count)
             result = prop;
      return result;
}

/**
 * Will return any similar entires in the array
 * containing arrays that is passed in.
 * @param {any[][]} An array containing
 * arrays.
 */
function getSimilarEntries(mdArray: any[][]): any[] {
    // Using a set here because we only want unique entries.
    let similarEntries = new Set();
    /* This will house temporary entries from the passed in mdArray,
     * so it needs to be the same type. */
    let indexArray: any[] = [];
    let numberOfArrays: number = mdArray.length;
    for (let i: number = 0; i < numberOfArrays; i++) {
        /* Use the first element of the multi-dimensional
         * array as the "master" array to key off of. */
        indexArray = mdArray[i];
        for (let array in mdArray) {
            for (let element in mdArray[array]) {
                if (mdArray[array][element] === indexArray[i]) {
                    similarEntries.add(mdArray[array][element]);
                }
            }
        }
    }
    // Cast the Set back to an array to return it.
    return  [...similarEntries];
}

/**
 * Will return the number passed in as a string representing
 * money, seperated by ',' and '.'
 * formatNumberAsMoney(156443.4633); // returns $156,443.46
 * formatNumberAsMoney(15788); // returns $15,788.00
 * @param {number} amount
 */
function formatNumberAsMoney(amount: number): string {
    // TODO: Look into typing RegEx stuff... I don't like declaring this as an "any"
    const re: any = "\\d(?=(\\d{" + 3 + "})+" + "\\." + ")";
    return Number(amount).toFixed(Math.max(0, ~~2)).replace(new RegExp(re, "g"), "$&,");
}

// Return our utilities module
module.exports = {
    random: getRandomRange,
    randomElement: getRandomElement,
    randomObject: getRandomProperty,
    createName,
    formatNumberAsMoney,
    getSimilarEntries,
};