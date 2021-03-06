var can1,can2;

var ctx1,ctx2;

var lastTime,deltaTime,now;

var bgpic=new Image();

var canWidth,canHeight;

var body;
var bodyWidth;
var canMarginLeft;
var canMarginTop;

var square=[];
var squareNo=[];
//var squares=[];

var hover1x,hover1y;
var hover2x,hover2y;

var hover1Column,hover1Row;
var hover2Column,hover2Row;

var arr1=new Array();
var arr2=new Array();
var index;

var refresh;

var score=0;

window.onload=game;

function game(){
    init();
  //  window.requestAnimFrame(gameLoop);
    lastTime=Date.now();
    deltaTime=0;
    gameLoop();

}

function init(){
    can1=document.getElementById("canvas1");
    can2=document.getElementById("canvas2");
    refresh=document.getElementById("refresh");
    if(can1.getContext){
        ctx1=can1.getContext("2d");
        ctx2=can2.getContext("2d");
    }


    can2.addEventListener("click",squareOnclick,false);//给canvas2添加鼠标事件
    
    canWidth=can1.width;
    canHeight=can1.height;


   // createOderArray(0,107,arr1);
   for(var i=0;i<9;i++){
       for(var j=0;j<12;j++){
           if(i!=0 && i!=8 && j!=0 && j!=11){
               var lc1=i*12+j;
               arr1.push(lc1);
           }
       }
	}

    for(var i=0;i<9;i++){
       for(var j=0;j<12;j++){
           if(i==0 || i==8 || j==0 || j==11){
               var lc2=i*12+j;
               arr2.push(lc2);
           }
       }
	}


    body=document.getElementsByTagName("body")[0];
    bodyWidth=body.scrollWidth;
    canMarginLeft=(bodyWidth-canWidth)/2;
    canMarginTop=20;

    bgpic.src="./src/background0.jpg";

    // square=new squareObj();
    // square.init();
    inits();
    

    for(var i=0;i<19;i++){
        squareNo[i]=new Image();
        squareNo[i].src="./src/square"+i+".jpg";
    }

    // for(var i=0;i<square.num;i++){
    //     squares[i]
    // }

    hover1x=hover1y=hover2x=hover2y=100;

    




}

function gameLoop(){
    window.requestAnimFrame(gameLoop);
    now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>50){
        deltaTime=50;
    }

    drawBackground();
    
    for(var i=0;i<108;i++){
        square[i].draw();
    }

    drawScore();

    var gameOver=checkGameOver();
    if(gameOver){
        ctx1.font="bold 25px Arial";
        ctx1.textAlign="center";
        ctx1.fillStyle="yellow";
        ctx1.fillText("GAMEOVER",400,300);
    }
    
}

function drawBackground(){
    ctx1.drawImage(bgpic,0,0,canWidth,canHeight);
}


function squareOnclick(event){
    var e=event || window.event;
     if(hover1x==100){
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        hover1x=e.pageX || e.clientX+scrollX;
        hover1y=e.pageY || e.clientY+scrollY;
        hover1Column=Math.floor((hover1x-canMarginLeft-50)/70)+1;//[0,9]
        hover1Row=Math.floor((hover1y-canMarginTop-100)/70)+1;//[0,6]
        index=foundIndex(hover1Row*12+hover1Column);
        square[index].hover=true;
    }else if(hover2x==100){
        hover2x=e.pageX || e.clientX+scrollX;
        hover2y=e.pageY || e.clientY+scrollY;
        hover2Column=Math.floor((hover2x-canMarginLeft-50)/70)+1;//[0,9]
        hover2Row=Math.floor((hover2y-canMarginTop-100)/70)+1;//[0,6]
        index=foundIndex(hover2Row*12+hover2Column);
        square[index].hover=true;
    }else{
        hover1x=e.pageX || e.clientX+scrollX;
        hover1y=e.pageY || e.clientY+scrollY;
        hover1Column=Math.floor((hover1x-canMarginLeft-50)/70)+1;
        hover1Row=Math.floor((hover1y-canMarginTop-100)/70)+1;
        hover2x=100;
        hover2y=100;
        index=foundIndex(hover1Row*12+hover1Column);
        square[index].hover=true;
    }
    if(hover1x!=100 && hover2x != 100){
        //判断两图是否可消除
        var result=samePic(hover1Row,hover1Column,hover2Row,hover2Column);
        if(result){
            var aLocation=hover1Row*12+hover1Column;
            var bLocation=hover2Row*12+hover2Column;
            if(square[foundIndex(aLocation)].alive && square[foundIndex(bLocation)].alive){
                square[foundIndex(aLocation)].alive=false;
                square[foundIndex(bLocation)].alive=false;
                score += 10;
            }
                               
        }else{
            for(var i=0;i<108;i++){
        square[i].hover=false;
        }
        }     
     

    }
 
   
}

