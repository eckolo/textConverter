$(function() {
    var consonant = ["", "b", "c", "d", "f", "g", "h", "j", "k", "l", "n", "m", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var vowel = ["a", "e", "i", "o", "u"];

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
                return codeToChar(originChar.charCodeAt(0));
        }
    }

    codeToChar = (onceCode) => consonant[onceCode % consonant.length] + vowel[Math.floor(onceCode / consonant.length) % vowel.length];
});