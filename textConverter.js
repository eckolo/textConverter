$(function() {
    var consonant = ["", "b", "c", "d", "f", "g", "h", "j", "k", "l", "n", "m", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var vowel = ["a", "e", "i", "o", "u"];

    $("#mainForm").on("click", "#converteButton", function() {
        $("#outputConverted").html(converteText($("#originString").val()));
        $("#outputReConverted").html(convertStr($("#outputConverted").val()));
    });

    $("#mainForm").on("change", "#originString", function() {
        $("#outputConverted").html(converteText($("#originString").val()));
        $("#outputReConverted").html(convertStr($("#outputConverted").val()));
    });

    function converteText(originText) {
        var outputString = "";
        var onceCode;
        var onceCodeArray;

        for (var index = 0; index < originText.length; index++) outputString += extractionChar(originText, index);
        return outputString;
    }

    function extractionChar(originText, index) {
        switch (originText.substr(index, 1)) {
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
                return originText.substr(index, 1);

            default:
                return codeToChar(originText.charCodeAt(index));
                //return codeToChar(originText.charCodeAt(index) % (16 * 16)) + codeToChar(Math.floor(originText.charCodeAt(index) / (16 * 16)));
        }
    }

    function codeToChar(onceCode) {
        return consonant[onceCode % consonant.length] + vowel[Math.floor(onceCode / consonant.length) % vowel.length];
        //return String.fromCharCode("a".charCodeAt() + onceCode % 26);
    }
});