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
        var targetChar, lastChar, beforeLastChar;
        var converted;
        var index;
        var firstChar;

        converted = lastChar = beforeLastChar = "";
        index = 0;
        firstChar = true;
        while (index < str.length) {
            lastChar = beforeLastChar = "";
            loopCheck: while (index < str.length) {
                targetChar = str.charAt(index++);
                if (!isalpha(targetChar)) firstChar = true;
                if (isalpha(targetChar) && targetChar.toUpperCase() == lastChar.toUpperCase()) {
                    if (targetChar.toUpperCase() == "N") {
                        converted += beforeLastChar + "ん";
                        lastChar = targetChar = "";
                    } else {
                        converted += beforeLastChar + "っ";
                    }
                    beforeLastChar = "";
                    continue;
                }
                switch (targetChar.toUpperCase()) {
                    case "A":
                    case "I":
                    case "U":
                    case "E":
                    case "O":
                        converted += convertChar(targetChar, lastChar, beforeLastChar, firstChar);
                        if (converted !== "") firstChar = false;
                        lastChar = beforeLastChar = "";
                        break loopCheck;
                    case ",":
                        if (lastChar.toUpperCase() == "N") lastChar = "ん";
                        converted += beforeLastChar + lastChar + "，";
                        lastChar = beforeLastChar = "";
                        break loopCheck;
                    case ".":
                        if (lastChar.toUpperCase() == "N") lastChar = "ん";
                        converted += beforeLastChar + lastChar + "。";
                        lastChar = beforeLastChar = "";
                        break loopCheck;
                    case "-":
                        if (lastChar.toUpperCase() == "N") lastChar = "ん";
                        converted += beforeLastChar + lastChar + "ー";
                        lastChar = beforeLastChar = "";
                        break loopCheck;
                    default:
                        if (beforeLastChar !== "") converted += beforeLastChar;
                        if (lastChar.toUpperCase() == "N" && targetChar.toUpperCase() != "Y") {
                            converted += "ん";
                            lastChar = "";
                        }
                        break;
                }
                beforeLastChar = lastChar;
                lastChar = targetChar;
            }
        }
        if (lastChar.toUpperCase() == "N") lastChar = "ん";
        return converted + beforeLastChar + lastChar;
    }

    function convertChar(targetChar, lastChar, beforeLastChar, isHead) {
        var lastCharBig = lastChar.toUpperCase();
        var beforeLastCharBig = beforeLastChar.toUpperCase();
        switch (targetChar.toUpperCase()) {
            case "A":
                if (beforeLastCharBig == "B" && lastCharBig == "Y") return "びゃ";
                if (beforeLastCharBig == "C" && (lastCharBig == "H" || lastCharBig == "Y")) return "ちゃ";
                if (beforeLastCharBig == "D" && lastCharBig == "H") return "でゃ";
                if (beforeLastCharBig == "D" && lastCharBig == "Y") return "ぢゃ";
                if (beforeLastCharBig == "F" && lastCharBig == "Y") return "ふゃ";
                if (beforeLastCharBig == "G" && lastCharBig == "Y") return "ぎゃ";
                if (beforeLastCharBig == "H" && lastCharBig == "Y") return "ひゃ";
                if (beforeLastCharBig == "J" && lastCharBig == "Y") return "じゃ";
                if (beforeLastCharBig == "K" && lastCharBig == "W") return "くぁ";
                if (beforeLastCharBig == "K" && lastCharBig == "Y") return "きゃ";
                if (beforeLastCharBig == "L" && lastCharBig == "Y" && isHead) return "りゃ";
                if (beforeLastCharBig == "X" && lastCharBig == "Y" && isHead) return "くしゃ";
                if ((beforeLastCharBig == "L" || beforeLastCharBig == "X") && lastCharBig == "Y") return "ゃ";
                if (beforeLastCharBig == "M" && lastCharBig == "Y") return "みゃ";
                if (beforeLastCharBig == "N" && lastCharBig == "Y") return "にゃ";
                if (beforeLastCharBig == "P" && lastCharBig == "Y") return "ぴゃ";
                if (beforeLastCharBig == "R" && lastCharBig == "Y") return "りゃ";
                if (beforeLastCharBig == "S" && (lastCharBig == "H" || lastCharBig == "Y")) return "しゃ";
                if (beforeLastCharBig == "T" && lastCharBig == "H") return "てゃ";
                if (beforeLastCharBig == "T" && lastCharBig == "Y") return "ちゃ";
                if (beforeLastCharBig == "Z" && lastCharBig == "Y") return "じゃ";
                if (beforeLastCharBig == "Q" && lastCharBig == "Y") return "くゃ";
                if (lastCharBig == "B") return beforeLastChar + "ば";
                if (lastCharBig == "D") return beforeLastChar + "だ";
                if (lastCharBig == "F") return beforeLastChar + "ふぁ";
                if (lastCharBig == "G") return beforeLastChar + "が";
                if (lastCharBig == "H") return beforeLastChar + "は";
                if (lastCharBig == "J") return beforeLastChar + "じゃ";
                if (lastCharBig == "K") return beforeLastChar + "か";
                if (lastCharBig == "L" && isHead) return beforeLastChar + "ら";
                if (lastCharBig == "X" && isHead) return beforeLastChar + "くさ";
                if (lastCharBig == "L" || lastCharBig == "X") return beforeLastChar + "ぁ";
                if (lastCharBig == "M") return beforeLastChar + "ま";
                if (lastCharBig == "N") return beforeLastChar + "な";
                if (lastCharBig == "P") return beforeLastChar + "ぱ";
                if (lastCharBig == "R") return beforeLastChar + "ら";
                if (lastCharBig == "S") return beforeLastChar + "さ";
                if (lastCharBig == "T") return beforeLastChar + "た";
                if (lastCharBig == "V") return beforeLastChar + "う゛ぁ";
                if (lastCharBig == "W") return beforeLastChar + "わ";
                if (lastCharBig == "Y") return beforeLastChar + "や";
                if (lastCharBig == "Z") return beforeLastChar + "ざ";
                if (lastCharBig == "Q") return beforeLastChar + "くぁ";
                return beforeLastChar + lastChar + "あ";
            case "I":
                if (beforeLastCharBig == "B" && lastCharBig == "Y") return "びぃ";
                if (beforeLastCharBig == "C" && lastCharBig == "H") return "ち";
                if (beforeLastCharBig == "C" && lastCharBig == "Y") return "ちぃ";
                if (beforeLastCharBig == "D" && lastCharBig == "H") return "でぃ";
                if (beforeLastCharBig == "D" && lastCharBig == "Y") return "ぢぃ";
                if (beforeLastCharBig == "F" && lastCharBig == "Y") return "ふぃ";
                if (beforeLastCharBig == "G" && lastCharBig == "Y") return "ぎぃ";
                if (beforeLastCharBig == "H" && lastCharBig == "Y") return "ひぃ";
                if (beforeLastCharBig == "J" && lastCharBig == "Y") return "じぃ";
                if (beforeLastCharBig == "K" && lastCharBig == "Y") return "きぃ";
                if (beforeLastCharBig == "L" && lastCharBig == "Y" && isHead) return "りぃ";
                if (beforeLastCharBig == "X" && lastCharBig == "Y" && isHead) return "くしぃ";
                if ((beforeLastCharBig == "L" || beforeLastCharBig == "X") && lastCharBig == "Y") return "ぃ";
                if (beforeLastCharBig == "M" && lastCharBig == "Y") return "みぃ";
                if (beforeLastCharBig == "N" && lastCharBig == "Y") return "にぃ";
                if (beforeLastCharBig == "P" && lastCharBig == "Y") return "ぴぃ";
                if (beforeLastCharBig == "R" && lastCharBig == "Y") return "りぃ";
                if (beforeLastCharBig == "S" && lastCharBig == "H") return "し";
                if (beforeLastCharBig == "S" && lastCharBig == "Y") return "しぃ";
                if (beforeLastCharBig == "T" && lastCharBig == "H") return "てぃ";
                if (beforeLastCharBig == "T" && lastCharBig == "Y") return "ちぃ";
                if (beforeLastCharBig == "Z" && lastCharBig == "Y") return "じぃ";
                if (beforeLastCharBig == "Q" && lastCharBig == "Y") return "くぃ";
                if (lastCharBig == "B") return beforeLastChar + "び";
                if (lastCharBig == "D") return beforeLastChar + "ぢ";
                if (lastCharBig == "F") return beforeLastChar + "ふぃ";
                if (lastCharBig == "G") return beforeLastChar + "ぎ";
                if (lastCharBig == "H") return beforeLastChar + "ひ";
                if (lastCharBig == "J") return beforeLastChar + "じ";
                if (lastCharBig == "K") return beforeLastChar + "き";
                if (lastCharBig == "L" && isHead) return beforeLastChar + "り";
                if (lastCharBig == "X" && isHead) return beforeLastChar + "くし";
                if (lastCharBig == "L" || lastCharBig == "X") return beforeLastChar + "ぃ";
                if (lastCharBig == "M") return beforeLastChar + "み";
                if (lastCharBig == "N") return beforeLastChar + "に";
                if (lastCharBig == "P") return beforeLastChar + "ぴ";
                if (lastCharBig == "R") return beforeLastChar + "り";
                if (lastCharBig == "S") return beforeLastChar + "し";
                if (lastCharBig == "T") return beforeLastChar + "ち";
                if (lastCharBig == "V") return beforeLastChar + "う゛ぃ";
                if (lastCharBig == "W") return beforeLastChar + "うぃ";
                if (lastCharBig == "Y") return beforeLastChar + "い";
                if (lastCharBig == "Z") return beforeLastChar + "じ";
                if (lastCharBig == "Q") return beforeLastChar + "くぃ";
                return beforeLastChar + lastChar + "い";
            case "U":
                if (beforeLastCharBig == "B" && lastCharBig == "Y") return "びゅ";
                if (beforeLastCharBig == "C" && (lastCharBig == "H" || lastCharBig == "Y")) return "ちゅ";
                if (beforeLastCharBig == "D" && lastCharBig == "H") return "でゅ";
                if (beforeLastCharBig == "D" && lastCharBig == "Y") return "ぢゅ";
                if (beforeLastCharBig == "F" && lastCharBig == "Y") return "ふゅ";
                if (beforeLastCharBig == "G" && lastCharBig == "Y") return "ぎゅ";
                if (beforeLastCharBig == "H" && lastCharBig == "Y") return "ひゅ";
                if (beforeLastCharBig == "J" && lastCharBig == "Y") return "じゅ";
                if (beforeLastCharBig == "K" && lastCharBig == "Y") return "きゅ";
                if (beforeLastCharBig == "L" && lastCharBig == "Y" && isHead) return "りゅ";
                if (beforeLastCharBig == "X" && lastCharBig == "Y" && isHead) return "くしゅ";
                if ((beforeLastCharBig == "L" || beforeLastCharBig == "X") && lastCharBig == "Y") return "ゅ";
                if (beforeLastCharBig == "M" && lastCharBig == "Y") return "みゅ";
                if (beforeLastCharBig == "N" && lastCharBig == "Y") return "にゅ";
                if (beforeLastCharBig == "P" && lastCharBig == "Y") return "ぴゅ";
                if (beforeLastCharBig == "R" && lastCharBig == "Y") return "りゅ";
                if (beforeLastCharBig == "S" && (lastCharBig == "H" || lastCharBig == "Y")) return "しゅ";
                if (beforeLastCharBig == "T" && lastCharBig == "H") return "てゅ";
                if (beforeLastCharBig == "T" && lastCharBig == "S") return "つ";
                if (beforeLastCharBig == "T" && lastCharBig == "Y") return "ちゅ";
                if (beforeLastCharBig == "Z" && lastCharBig == "Y") return "じゅ";
                if (beforeLastCharBig == "Q" && lastCharBig == "Y") return "くゅ";
                if (lastCharBig == "B") return beforeLastChar + "ぶ";
                if (lastCharBig == "D") return beforeLastChar + "づ";
                if (lastCharBig == "F") return beforeLastChar + "ふ";
                if (lastCharBig == "G") return beforeLastChar + "ぐ";
                if (lastCharBig == "H") return beforeLastChar + "ふ";
                if (lastCharBig == "J") return beforeLastChar + "じゅ";
                if (lastCharBig == "K") return beforeLastChar + "く";
                if (lastCharBig == "L" && isHead) return beforeLastChar + "る";
                if (lastCharBig == "X" && isHead) return beforeLastChar + "くす";
                if (lastCharBig == "L" || lastCharBig == "X") return beforeLastChar + "ぅ";
                if (lastCharBig == "M") return beforeLastChar + "む";
                if (lastCharBig == "N") return beforeLastChar + "ぬ";
                if (lastCharBig == "P") return beforeLastChar + "ぷ";
                if (lastCharBig == "R") return beforeLastChar + "る";
                if (lastCharBig == "S") return beforeLastChar + "す";
                if (lastCharBig == "T") return beforeLastChar + "つ";
                if (lastCharBig == "V") return beforeLastChar + "う゛";
                if (lastCharBig == "W") return beforeLastChar + "う";
                if (lastCharBig == "Y") return beforeLastChar + "ゆ";
                if (lastCharBig == "Z") return beforeLastChar + "ず";
                if (lastCharBig == "Q") return beforeLastChar + "くぅ";
                return beforeLastChar + lastChar + "う";
            case "E":
                if (beforeLastCharBig == "B" && lastCharBig == "Y") return "びぇ";
                if (beforeLastCharBig == "C" && (lastCharBig == "H" || lastCharBig == "Y")) return "ちぇ";
                if (beforeLastCharBig == "D" && lastCharBig == "H") return "でぇ";
                if (beforeLastCharBig == "D" && lastCharBig == "Y") return "ぢぇ";
                if (beforeLastCharBig == "F" && lastCharBig == "Y") return "ふぇ";
                if (beforeLastCharBig == "G" && lastCharBig == "Y") return "ぎぇ";
                if (beforeLastCharBig == "H" && lastCharBig == "Y") return "ひぇ";
                if (beforeLastCharBig == "J" && lastCharBig == "Y") return "じぇ";
                if (beforeLastCharBig == "K" && lastCharBig == "Y") return "きぇ";
                if (beforeLastCharBig == "L" && lastCharBig == "Y" && isHead) return "りぇ";
                if (beforeLastCharBig == "X" && lastCharBig == "Y" && isHead) return "くしぇ";
                if ((beforeLastCharBig == "L" || beforeLastCharBig == "X") && lastCharBig == "Y") return "ぇ";
                if (beforeLastCharBig == "M" && lastCharBig == "Y") return "みぇ";
                if (beforeLastCharBig == "N" && lastCharBig == "Y") return "にぇ";
                if (beforeLastCharBig == "P" && lastCharBig == "Y") return "ぴぇ";
                if (beforeLastCharBig == "R" && lastCharBig == "Y") return "りぇ";
                if (beforeLastCharBig == "S" && (lastCharBig == "H" || lastCharBig == "Y")) return "しぇ";
                if (beforeLastCharBig == "T" && lastCharBig == "H") return "てぇ";
                if (beforeLastCharBig == "T" && lastCharBig == "Y") return "ちぇ";
                if (beforeLastCharBig == "Z" && lastCharBig == "Y") return "じぇ";
                if (beforeLastCharBig == "Q" && lastCharBig == "Y") return "くぇ";
                if (lastCharBig == "B") return beforeLastChar + "べ";
                if (lastCharBig == "D") return beforeLastChar + "で";
                if (lastCharBig == "F") return beforeLastChar + "ふぇ";
                if (lastCharBig == "G") return beforeLastChar + "げ";
                if (lastCharBig == "H") return beforeLastChar + "へ";
                if (lastCharBig == "J") return beforeLastChar + "じぇ";
                if (lastCharBig == "K") return beforeLastChar + "け";
                if (lastCharBig == "L" && isHead) return beforeLastChar + "れ";
                if (lastCharBig == "X" && isHead) return beforeLastChar + "くせ";
                if (lastCharBig == "L" || lastCharBig == "X") return beforeLastChar + "ぇ";
                if (lastCharBig == "M") return beforeLastChar + "め";
                if (lastCharBig == "N") return beforeLastChar + "ね";
                if (lastCharBig == "P") return beforeLastChar + "ぺ";
                if (lastCharBig == "R") return beforeLastChar + "れ";
                if (lastCharBig == "S") return beforeLastChar + "せ";
                if (lastCharBig == "T") return beforeLastChar + "て";
                if (lastCharBig == "V") return beforeLastChar + "う゛ぇ";
                if (lastCharBig == "W") return beforeLastChar + "うぇ";
                if (lastCharBig == "Y") return beforeLastChar + "いぇ";
                if (lastCharBig == "Z") return beforeLastChar + "ぜ";
                if (lastCharBig == "Q") return beforeLastChar + "くぇ";
                return beforeLastChar + lastChar + "え";
            case "O":
                if (beforeLastCharBig == "B" && lastCharBig == "Y") return "びょ";
                if (beforeLastCharBig == "C" && (lastCharBig == "H" || lastCharBig == "Y")) return "ちょ";
                if (beforeLastCharBig == "D" && lastCharBig == "H") return "でょ";
                if (beforeLastCharBig == "D" && lastCharBig == "Y") return "ぢょ";
                if (beforeLastCharBig == "F" && lastCharBig == "Y") return "ふょ";
                if (beforeLastCharBig == "G" && lastCharBig == "Y") return "ぎょ";
                if (beforeLastCharBig == "H" && lastCharBig == "Y") return "ひょ";
                if (beforeLastCharBig == "J" && lastCharBig == "Y") return "じょ";
                if (beforeLastCharBig == "K" && lastCharBig == "Y") return "きょ";
                if (beforeLastCharBig == "L" && lastCharBig == "Y" && isHead) return "りょ";
                if (beforeLastCharBig == "X" && lastCharBig == "Y" && isHead) return "くしょ";
                if ((beforeLastCharBig == "L" || beforeLastCharBig == "X") && lastCharBig == "Y") return "ょ";
                if (beforeLastCharBig == "M" && lastCharBig == "Y") return "みょ";
                if (beforeLastCharBig == "N" && lastCharBig == "Y") return "にょ";
                if (beforeLastCharBig == "P" && lastCharBig == "Y") return "ぴょ";
                if (beforeLastCharBig == "R" && lastCharBig == "Y") return "りょ";
                if (beforeLastCharBig == "S" && (lastCharBig == "H" || lastCharBig == "Y")) return "しょ";
                if (beforeLastCharBig == "T" && lastCharBig == "H") return "てょ";
                if (beforeLastCharBig == "T" && lastCharBig == "Y") return "ちょ";
                if (beforeLastCharBig == "Z" && lastCharBig == "Y") return "じょ";
                if (beforeLastCharBig == "Q" && lastCharBig == "Y") return "くょ";
                if (lastCharBig == "B") return beforeLastChar + "ぼ";
                if (lastCharBig == "D") return beforeLastChar + "ど";
                if (lastCharBig == "F") return beforeLastChar + "ふぉ";
                if (lastCharBig == "G") return beforeLastChar + "ご";
                if (lastCharBig == "H") return beforeLastChar + "ほ";
                if (lastCharBig == "J") return beforeLastChar + "じょ";
                if (lastCharBig == "K") return beforeLastChar + "こ";
                if (lastCharBig == "L" && isHead) return beforeLastChar + "ろ";
                if (lastCharBig == "X" && isHead) return beforeLastChar + "くそ";
                if (lastCharBig == "L" || lastCharBig == "X") return beforeLastChar + "ぉ";
                if (lastCharBig == "M") return beforeLastChar + "も";
                if (lastCharBig == "N") return beforeLastChar + "の";
                if (lastCharBig == "P") return beforeLastChar + "ぽ";
                if (lastCharBig == "R") return beforeLastChar + "ろ";
                if (lastCharBig == "S") return beforeLastChar + "そ";
                if (lastCharBig == "T") return beforeLastChar + "と";
                if (lastCharBig == "V") return beforeLastChar + "う゛ぉ";
                if (lastCharBig == "W") return beforeLastChar + "を";
                if (lastCharBig == "Y") return beforeLastChar + "よ";
                if (lastCharBig == "Z") return beforeLastChar + "ぞ";
                if (lastCharBig == "Q") return beforeLastChar + "くぉ";
                return beforeLastChar + lastChar + "お";
        }
    }

    function isalpha(c) {
        return ((c >= "A" && c <= "Z") || (c >= "a" && c <= "z"));
    }
});