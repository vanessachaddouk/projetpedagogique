var canvas = document.querySelector('.canvas__words');
var ctx = canvas.getContext("2d");
var my_words = ["pyramide","kheops","louvre","chapeau"];
var n = my_words.length;

function displayWords(){ //draws the words on screen
	var gradient = ctx.createLinearGradient(150,30,150,170);
	
	gradient.addColorStop(0,  'rgb(255,0,0)');    
	gradient.addColorStop(0.4,'rgb(255,200,0)');  
	gradient.addColorStop(1,  'rgb(100,246,200)'); 
	
	ctx.fillStyle = gradient; 
	
	var title = 'MON MOT';
	
	ctx.font         = 'bold 70px Arial';
	ctx.textAlign    = 'center';
	ctx.textBaseline = 'top';     
	for (var i=0; i<n; i++){
		ctx.fillText(my_words[i],150,25);
	}
}

displayWords();
