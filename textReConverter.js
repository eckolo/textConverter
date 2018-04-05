$(function() {
    const consonants = ["", "b", "c", "d", "f", "g", "h", "j", "k", "l", "n", "m", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
    const vowels = ["a", "e", "i", "o", "u"];
    const specialChars = ["\r", "\n", "\r\n", "!", "?", "！", "？", "「", "」", "…", "、", "。", " ", "　"];

    reConverteText = (originText) => originText
        .split(" ")
        .map(text => reExtractionChar(text))
        .join("")
        .replace("\r\n ", "\r\n");

    reExtractionChar = (originString) => specialChars.includes(originString) ?
        originString :
        consonantToCode(0, originString) > 0 ?
        String.fromCharCode(consonantToCode(0, originString)) :
        "";

    consonantToCode = (resultCode, originString) => charToCode(resultCode, originString, consonants, vowelToCode);
    vowelToCode = (resultCode, originString) => charToCode(resultCode, originString, vowels, consonantToCode);
    charToCode = (resultCode, originString, charList, nextAction) => {
        if (originString == "") return resultCode;

        var top = originString.slice(0, 1);
        var remaining = originString.slice(1);

        var nextCode = resultCode * charList.length;
        if (charList.includes(top)) return nextAction(nextCode + charList.indexOf(top), remaining);
        else return nextAction(nextCode, originString);
    }
});