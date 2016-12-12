$( document ).ready(function() {
    console.log( "audio.js ready!" );

    function fadeIn(){
    	$(".audio__background")[0].volume = 0;
    	$(".audio__background").animate({volume: 1}, 5000);
    }
 	fadeIn();
	
});