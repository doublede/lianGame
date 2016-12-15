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
	for(var i=0;i<70;i++){
		if(square[i].location==loc){
			return i;
		}
		
	}

}

function checkGameOver(){
	for(var i=0;i<70;i++){
        if(square[i].alive==false){
            var gameOver=true;
        }else{
            var gameOver=false;
            break;
        }
    }
	return gameOver;
}
