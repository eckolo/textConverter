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

    function convertStr(str) {
        var cchar, lastchar, last2char;
        var converted;
        var i;

        converted = lastchar = last2char = "";
        i = 0;
        while (i < str.length) {
            lastchar = last2char = "";
            loopcheck: while (i < str.length) {
                cchar = str.charAt(i++);
                if (isalpha(cchar) && cchar.toUpperCase() == lastchar.toUpperCase()) {
                    if (cchar.toUpperCase() == "N") {
                        converted += last2char + "ん";
                        lastchar = cchar = "";
                    } else {
                        converted += last2char + "っ";
                    }
                    last2char = "";
                    continue;
                }
                switch (cchar.toUpperCase()) {
                    case "A":
                    case "I":
                    case "U":
                    case "E":
                    case "O":
                        converted += toZen(cchar, lastchar, last2char);
                        lastchar = last2char = "";
                        break loopcheck;
                    case ",":
                        if (lastchar.toUpperCase() == "N") lastchar = "ん";
                        converted += last2char + lastchar + "，";
                        lastchar = last2char = "";
                        break loopcheck;
                    case ".":
                        if (lastchar.toUpperCase() == "N") lastchar = "ん";
                        converted += last2char + lastchar + "。";
                        lastchar = last2char = "";
                        break loopcheck;
                    case "-":
                        if (lastchar.toUpperCase() == "N") lastchar = "ん";
                        converted += last2char + lastchar + "ー";
                        lastchar = last2char = "";
                        break loopcheck;
                    default:
                        if (last2char != "") converted += last2char;
                        if (lastchar.toUpperCase() == "N" && cchar.toUpperCase() != "Y") {
                            converted += "ん";
                            lastchar = "";
                        }
                        break;
                }
                last2char = lastchar;
                lastchar = cchar;
            }
        }
        if (lastchar.toUpperCase() == "N") lastchar = "ん";
        return converted + last2char + lastchar;
    }

    function toZen(cchar, lastchar, last2char) {
        var ulastchar = lastchar.toUpperCase();
        var ulast2char = last2char.toUpperCase();
        switch (cchar.toUpperCase()) {
            case "A":
                if (ulast2char == "B" && ulastchar == "Y") return "びゃ";
                if (ulast2char == "C" && (ulastchar == "H" || ulastchar == "Y")) return "ちゃ";
                if (ulast2char == "D" && ulastchar == "H") return "でゃ";
                if (ulast2char == "D" && ulastchar == "Y") return "ぢゃ";
                if (ulast2char == "F" && ulastchar == "Y") return "ふゃ";
                if (ulast2char == "G" && ulastchar == "Y") return "ぎゃ";
                if (ulast2char == "H" && ulastchar == "Y") return "ひゃ";
                if (ulast2char == "J" && ulastchar == "Y") return "じゃ";
                if (ulast2char == "K" && ulastchar == "W") return "くぁ";
                if (ulast2char == "K" && ulastchar == "Y") return "きゃ";
                if ((ulast2char == "L" || ulast2char == "X") && ulastchar == "Y") return "ゃ";
                if (ulast2char == "M" && ulastchar == "Y") return "みゃ";
                if (ulast2char == "N" && ulastchar == "Y") return "にゃ";
                if (ulast2char == "P" && ulastchar == "Y") return "ぴゃ";
                if (ulast2char == "R" && ulastchar == "Y") return "りゃ";
                if (ulast2char == "S" && (ulastchar == "H" || ulastchar == "Y")) return "しゃ";
                if (ulast2char == "T" && ulastchar == "H") return "てゃ";
                if (ulast2char == "T" && ulastchar == "Y") return "ちゃ";
                if (ulast2char == "Z" && ulastchar == "Y") return "じゃ";
                if (ulast2char == "Q" && ulastchar == "Y") return "くゃ";
                if (ulastchar == "B") return last2char + "ば";
                if (ulastchar == "D") return last2char + "だ";
                if (ulastchar == "F") return last2char + "ふぁ";
                if (ulastchar == "G") return last2char + "が";
                if (ulastchar == "H") return last2char + "は";
                if (ulastchar == "J") return last2char + "じゃ";
                if (ulastchar == "K") return last2char + "か";
                if (ulastchar == "L" || ulastchar == "X") return last2char + "ぁ";
                if (ulastchar == "M") return last2char + "ま";
                if (ulastchar == "N") return last2char + "な";
                if (ulastchar == "P") return last2char + "ぱ";
                if (ulastchar == "R") return last2char + "ら";
                if (ulastchar == "S") return last2char + "さ";
                if (ulastchar == "T") return last2char + "た";
                if (ulastchar == "V") return last2char + "う゛ぁ";
                if (ulastchar == "W") return last2char + "わ";
                if (ulastchar == "Y") return last2char + "や";
                if (ulastchar == "Z") return last2char + "ざ";
                if (ulastchar == "Q") return last2char + "くぁ";
                return last2char + lastchar + "あ";
            case "I":
                if (ulast2char == "B" && ulastchar == "Y") return "びぃ";
                if (ulast2char == "C" && ulastchar == "H") return "ち";
                if (ulast2char == "C" && ulastchar == "Y") return "ちぃ";
                if (ulast2char == "D" && ulastchar == "H") return "でぃ";
                if (ulast2char == "D" && ulastchar == "Y") return "ぢぃ";
                if (ulast2char == "F" && ulastchar == "Y") return "ふぃ";
                if (ulast2char == "G" && ulastchar == "Y") return "ぎぃ";
                if (ulast2char == "H" && ulastchar == "Y") return "ひぃ";
                if (ulast2char == "J" && ulastchar == "Y") return "じぃ";
                if (ulast2char == "K" && ulastchar == "Y") return "きぃ";
                if ((ulast2char == "L" || ulast2char == "X") && ulastchar == "Y") return "ぃ";
                if (ulast2char == "M" && ulastchar == "Y") return "みぃ";
                if (ulast2char == "N" && ulastchar == "Y") return "にぃ";
                if (ulast2char == "P" && ulastchar == "Y") return "ぴぃ";
                if (ulast2char == "R" && ulastchar == "Y") return "りぃ";
                if (ulast2char == "S" && ulastchar == "H") return "し";
                if (ulast2char == "S" && ulastchar == "Y") return "しぃ";
                if (ulast2char == "T" && ulastchar == "H") return "てぃ";
                if (ulast2char == "T" && ulastchar == "Y") return "ちぃ";
                if (ulast2char == "Z" && ulastchar == "Y") return "じぃ";
                if (ulast2char == "Q" && ulastchar == "Y") return "くぃ";
                if (ulastchar == "B") return last2char + "び";
                if (ulastchar == "D") return last2char + "ぢ";
                if (ulastchar == "F") return last2char + "ふぃ";
                if (ulastchar == "G") return last2char + "ぎ";
                if (ulastchar == "H") return last2char + "ひ";
                if (ulastchar == "J") return last2char + "じ";
                if (ulastchar == "K") return last2char + "き";
                if (ulastchar == "L" || ulastchar == "X") return last2char + "ぃ";
                if (ulastchar == "M") return last2char + "み";
                if (ulastchar == "N") return last2char + "に";
                if (ulastchar == "P") return last2char + "ぴ";
                if (ulastchar == "R") return last2char + "り";
                if (ulastchar == "S") return last2char + "し";
                if (ulastchar == "T") return last2char + "ち";
                if (ulastchar == "V") return last2char + "う゛ぃ";
                if (ulastchar == "W") return last2char + "うぃ";
                if (ulastchar == "Y") return last2char + "い";
                if (ulastchar == "Z") return last2char + "じ";
                if (ulastchar == "Q") return last2char + "くぃ";
                return last2char + lastchar + "い";
            case "U":
                if (ulast2char == "B" && ulastchar == "Y") return "びゅ";
                if (ulast2char == "C" && (ulastchar == "H" || ulastchar == "Y")) return "ちゅ";
                if (ulast2char == "D" && ulastchar == "H") return "でゅ";
                if (ulast2char == "D" && ulastchar == "Y") return "ぢゅ";
                if (ulast2char == "F" && ulastchar == "Y") return "ふゅ";
                if (ulast2char == "G" && ulastchar == "Y") return "ぎゅ";
                if (ulast2char == "H" && ulastchar == "Y") return "ひゅ";
                if (ulast2char == "J" && ulastchar == "Y") return "じゅ";
                if (ulast2char == "K" && ulastchar == "Y") return "きゅ";
                if ((ulast2char == "L" || ulast2char == "X") && ulastchar == "Y") return "ゅ";
                if (ulast2char == "M" && ulastchar == "Y") return "みゅ";
                if (ulast2char == "N" && ulastchar == "Y") return "にゅ";
                if (ulast2char == "P" && ulastchar == "Y") return "ぴゅ";
                if (ulast2char == "R" && ulastchar == "Y") return "りゅ";
                if (ulast2char == "S" && (ulastchar == "H" || ulastchar == "Y")) return "しゅ";
                if (ulast2char == "T" && ulastchar == "H") return "てゅ";
                if (ulast2char == "T" && ulastchar == "S") return "つ";
                if (ulast2char == "T" && ulastchar == "Y") return "ちゅ";
                if (ulast2char == "Z" && ulastchar == "Y") return "じゅ";
                if (ulast2char == "Q" && ulastchar == "Y") return "くゅ";
                if (ulastchar == "B") return last2char + "ぶ";
                if (ulastchar == "D") return last2char + "づ";
                if (ulastchar == "F") return last2char + "ふ";
                if (ulastchar == "G") return last2char + "ぐ";
                if (ulastchar == "H") return last2char + "ふ";
                if (ulastchar == "J") return last2char + "じゅ";
                if (ulastchar == "K") return last2char + "く";
                if (ulastchar == "L" || ulastchar == "X") return last2char + "ぅ";
                if (ulastchar == "M") return last2char + "む";
                if (ulastchar == "N") return last2char + "ぬ";
                if (ulastchar == "P") return last2char + "ぷ";
                if (ulastchar == "R") return last2char + "る";
                if (ulastchar == "S") return last2char + "す";
                if (ulastchar == "T") return last2char + "つ";
                if (ulastchar == "V") return last2char + "う゛";
                if (ulastchar == "W") return last2char + "う";
                if (ulastchar == "Y") return last2char + "ゆ";
                if (ulastchar == "Z") return last2char + "ず";
                if (ulastchar == "Q") return last2char + "くぅ";
                return last2char + lastchar + "う";
            case "E":
                if (ulast2char == "B" && ulastchar == "Y") return "びぇ";
                if (ulast2char == "C" && (ulastchar == "H" || ulastchar == "Y")) return "ちぇ";
                if (ulast2char == "D" && ulastchar == "H") return "でぇ";
                if (ulast2char == "D" && ulastchar == "Y") return "ぢぇ";
                if (ulast2char == "F" && ulastchar == "Y") return "ふぇ";
                if (ulast2char == "G" && ulastchar == "Y") return "ぎぇ";
                if (ulast2char == "H" && ulastchar == "Y") return "ひぇ";
                if (ulast2char == "J" && ulastchar == "Y") return "じぇ";
                if (ulast2char == "K" && ulastchar == "Y") return "きぇ";
                if ((ulast2char == "L" || ulast2char == "X") && ulastchar == "Y") return "ぇ";
                if (ulast2char == "M" && ulastchar == "Y") return "みぇ";
                if (ulast2char == "N" && ulastchar == "Y") return "にぇ";
                if (ulast2char == "P" && ulastchar == "Y") return "ぴぇ";
                if (ulast2char == "R" && ulastchar == "Y") return "りぇ";
                if (ulast2char == "S" && (ulastchar == "H" || ulastchar == "Y")) return "しぇ";
                if (ulast2char == "T" && ulastchar == "H") return "てぇ";
                if (ulast2char == "T" && ulastchar == "Y") return "ちぇ";
                if (ulast2char == "Z" && ulastchar == "Y") return "じぇ";
                if (ulast2char == "Q" && ulastchar == "Y") return "くぇ";
                if (ulastchar == "B") return last2char + "べ";
                if (ulastchar == "D") return last2char + "で";
                if (ulastchar == "F") return last2char + "ふぇ";
                if (ulastchar == "G") return last2char + "げ";
                if (ulastchar == "H") return last2char + "へ";
                if (ulastchar == "J") return last2char + "じぇ";
                if (ulastchar == "K") return last2char + "け";
                if (ulastchar == "L" || ulastchar == "X") return last2char + "ぇ";
                if (ulastchar == "M") return last2char + "め";
                if (ulastchar == "N") return last2char + "ね";
                if (ulastchar == "P") return last2char + "ぺ";
                if (ulastchar == "R") return last2char + "れ";
                if (ulastchar == "S") return last2char + "せ";
                if (ulastchar == "T") return last2char + "て";
                if (ulastchar == "V") return last2char + "う゛ぇ";
                if (ulastchar == "W") return last2char + "うぇ";
                if (ulastchar == "Y") return last2char + "いぇ";
                if (ulastchar == "Z") return last2char + "ぜ";
                if (ulastchar == "Q") return last2char + "くぇ";
                return last2char + lastchar + "え";
            case "O":
                if (ulast2char == "B" && ulastchar == "Y") return "びょ";
                if (ulast2char == "C" && (ulastchar == "H" || ulastchar == "Y")) return "ちょ";
                if (ulast2char == "D" && ulastchar == "H") return "でょ";
                if (ulast2char == "D" && ulastchar == "Y") return "ぢょ";
                if (ulast2char == "F" && ulastchar == "Y") return "ふょ";
                if (ulast2char == "G" && ulastchar == "Y") return "ぎょ";
                if (ulast2char == "H" && ulastchar == "Y") return "ひょ";
                if (ulast2char == "J" && ulastchar == "Y") return "じょ";
                if (ulast2char == "K" && ulastchar == "Y") return "きょ";
                if ((ulast2char == "L" || ulast2char == "X") && ulastchar == "Y") return "ょ";
                if (ulast2char == "M" && ulastchar == "Y") return "みょ";
                if (ulast2char == "N" && ulastchar == "Y") return "にょ";
                if (ulast2char == "P" && ulastchar == "Y") return "ぴょ";
                if (ulast2char == "R" && ulastchar == "Y") return "りょ";
                if (ulast2char == "S" && (ulastchar == "H" || ulastchar == "Y")) return "しょ";
                if (ulast2char == "T" && ulastchar == "H") return "てょ";
                if (ulast2char == "T" && ulastchar == "Y") return "ちょ";
                if (ulast2char == "Z" && ulastchar == "Y") return "じょ";
                if (ulast2char == "Q" && ulastchar == "Y") return "くょ";
                if (ulastchar == "B") return last2char + "ぼ";
                if (ulastchar == "D") return last2char + "ど";
                if (ulastchar == "F") return last2char + "ふぉ";
                if (ulastchar == "G") return last2char + "ご";
                if (ulastchar == "H") return last2char + "ほ";
                if (ulastchar == "J") return last2char + "じょ";
                if (ulastchar == "K") return last2char + "こ";
                if (ulastchar == "L" || ulastchar == "X") return last2char + "ぉ";
                if (ulastchar == "M") return last2char + "も";
                if (ulastchar == "N") return last2char + "の";
                if (ulastchar == "P") return last2char + "ぽ";
                if (ulastchar == "R") return last2char + "ろ";
                if (ulastchar == "S") return last2char + "そ";
                if (ulastchar == "T") return last2char + "と";
                if (ulastchar == "V") return last2char + "う゛ぉ";
                if (ulastchar == "W") return last2char + "を";
                if (ulastchar == "Y") return last2char + "よ";
                if (ulastchar == "Z") return last2char + "ぞ";
                if (ulastchar == "Q") return last2char + "くぉ";
                return last2char + lastchar + "お";
        }
    }

    function isalpha(c) {
        return ((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"));
    }
});