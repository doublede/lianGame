window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();


function createOderArray(from,to,arr){
	for(var i=from;i<=to;i++){
		arr.push(i);
	}
}

function selectOne(arr){
	if(arr.length>0){
            var arrIndex=Math.floor(Math.random()*arr.length);
            var location1=arr[arrIndex];
            arr.splice(arrIndex,1);
            return location1;
        }
}

//var c=selectOne(arr1);
function foundIndex(loc){
	for(var i=0;i<108;i++){
		if(square[i].location==loc){
			return i;
		}
		
	}

}

function checkGameOver(){
	for(var i=0;i<108;i++){
        if(square[i].alive==false){
            var gameOver=true;
        }else{
            var gameOver=false;
            break;
        }
    }
	return gameOver;
}

function checkGameCorrect(){
	outerLoop:
	for(var i=0;i<108;i++){
		if(square[i].alive){
			var lc1=square[i].location;
			var row1=lc1/12;
			var column1=lc1%12;
			for(var j=i+1;j<108;j++){
				var lc2=square[j].location;
				var row2=lc2/12;
				var column2=lc2%12;
				var su=samePic(row1,column1,row2,column2);
				if(su){

					break outerLoop;
				}

			}
		}
	}
	return su;
}


function drawScore(){
	ctx1.textAlign="start";
	ctx1.textBaseline="top";
	ctx1.save();
	ctx1.fillStyle="white";
	ctx1.strokeStyle="white";
	ctx1.font="bold 20px Arial";
	ctx1.fillText("分 数 :",20,20);
	ctx1.fillText(score,100,20);






	ctx1.restore();
}
