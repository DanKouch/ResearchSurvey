var attempts = 0;


$(function() {
    $("#voteInput").change(() => {
        if(attempts < 3){
            inFavor = $("#voteInput").val() == "In Favor";
            $("#voteInput").val(inFavor ? "Not in Favor" : "In Favor")
            attempts++;
        }
    })
});