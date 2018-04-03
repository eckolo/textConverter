$(function() {
    var consonants = ["", "b", "c", "d", "f", "g", "h", "j", "k", "l", "n", "m", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
    var vowels = ["a", "e", "i", "o", "u"];
    var specialChars = ["\r", "\n", "\r\n", "!", "?", "！", "？", "「", "」", "…", "、", "。", " ", "　"];

    reConverteText = (originText) => {
        var outputString = "";

        outputString = [].map.call(originText.split(" "), reExtractionChar);
        return outputString;
    }

    reExtractionChar = (originString) => specialChars.includes(originString) ?
        originString :
        String.fromCharCode(consonantToCode(0, originString));

    consonantToCode = (resultCode, originString) => {
        if (originString == "") return resultCode;

        var top = originString.slice(0, 1);
        var remaining = originString.slice(1);

        var nextCode = resultCode * consonants.length;
        if (consonants.includes(top)) return vowelToCode(nextCode + consonants.indexOf(top), remaining);
        else return vowelToCode(nextCode, originString);
    }
    vowelToCode = (resultCode, originString) => {
        if (originString == "") return resultCode;

        var top = originString.slice(0, 1);
        var remaining = originString.slice(1);

        var nextCode = resultCode * vowels.length;
        if (vowels.includes(top)) return consonantToCode(nextCode + vowels.indexOf(top), remaining);
        else return consonantToCode(nextCode, originString);
    }
});