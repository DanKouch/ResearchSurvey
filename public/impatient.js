$(function() {
    currentSize = 16;
    setInterval(()=>{
        alert("Please fill out this poll as quickly as possible.")
        if(currentSize < 50)
            $("#impatientText").css("font-size", (currentSize+=2) + "px")
    }, 10 * 1000);
});