$(function() {
    converteText = (originText) => {
        var outputString = "";

        outputString = [].map.call(originText, extractionChar).join("");
        return outputString;
    }

    extractionChar = (originChar) => specialChars.includes(originChar) ?
        `${originChar} ` :
        `${codeToChar(originChar.codePointAt(0))} `;

    codeToChar = (onceCode) => {
        var vowelIndex = onceCode % vowels.length;
        var consonantIndex = ((onceCode - vowelIndex) / vowels.length) % consonants.length;

        var vowel = vowels[vowelIndex];
        var consonant = consonants[consonantIndex];
        var nextIndex = (((onceCode - vowelIndex) / vowels.length) - consonantIndex) / consonants.length;
        var nextChar = nextIndex == 0 ? "" : codeToChar(nextIndex);
        return `${nextChar}${consonant}${vowel}`;
    }
});