$(function() {
    $("#mainForm").on("click", "#converteButton", function() {
        $("#outputConverted").val(converteText($("#originString").val()));
        $("#outputHiragana").html(convertStr($("#outputConverted").val()));
    });
    $("#mainForm").on("click", "#reconverteButton", function() {
        $("#originString").val(reConverteText($("#outputConverted").val()));
        $("#outputHiragana").html(convertStr($("#outputConverted").val()));
    });
});