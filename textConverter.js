$(function() {
    var consonants = ["", "b", "c", "d", "f", "g", "h", "j", "k", "l", "n", "m", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var vowels = ["a", "e", "i", "o", "u"];

    converteText = (originText) => {
        var outputString = "";
        var onceCode;
        var onceCodeArray;

        outputString = [].map.call(originText, extractionChar);
        return outputString;
    }

    extractionChar = (originChar) => {
        switch (originChar) {
            case "\r":
            case "\n":
            case "\r\n":
            case "!":
            case "?":
            case "！":
            case "？":
            case "「":
            case "」":
            case "…":
            case "、":
            case "。":
            case " ":
            case "　":
                return originChar;

            default:
                return `${codeToChar(originChar.charCodeAt(0))} `;
        }
    }

    codeToChar = (onceCode) => {
        var vowel = vowels[onceCode % vowels.length];
        var consonant = consonants[Math.floor(onceCode / vowels.length) % consonants.length];
        var nextIndex = Math.floor(Math.floor(onceCode / vowels.length) / consonants.length);
        var nextChar = nextIndex == 0 ? "" : codeToChar(nextIndex);
        return `${nextChar}${consonant}${vowel}`;
    }
});