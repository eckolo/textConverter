$(function() {
    $("#mainForm").on("click", "#converteButton", function() {
        $("#outputConverted").html(converteText($("#originString").val()));
        $("#outputReConverted").html(reConverteText($("#outputConverted").val()));
        $("#outputHiragana").html(convertStr($("#outputConverted").val()));
    });

    $("#mainForm").on("change", "#originString", function() {
        $("#outputConverted").html(converteText($("#originString").val()));
        $("#outputReConverted").html(reConverteText($("#outputConverted").val()));
        $("#outputHiragana").html(convertStr($("#outputConverted").val()));
    });
});