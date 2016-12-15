var squareObj=function(){
    this.x;
    this.y;
    this.picNo;   //图片选择
    this.alive;
    this.location;    //方块位置
    this.hover;
    this.row;
    this.Column;
}


function inits(){
     for(var i=0;i<35;i++){
        square[i]=new squareObj();
        square[i+35]=new squareObj();
        square[i].x=0;
        square[i].y=0;
        square[i+35].x=0;
        square[i+35].y=0;
        square[i].picNo=square[i+35].picNo=Math.floor(Math.random()*14);
     //   square[i+35].picNo=Math.floor(Math.random()*14);
        square[i].alive=true;
        square[i+35].alive=true;
        
        





        square[i].location=selectOne(arr1);
        square[i+35].location=selectOne(arr1);
        square[i].hover=false;
        square[i+35].hover=false;
        square[i].row=Math.floor(square[i].location/10);
        square[i].column=square[i].location % 10;
        square[i+35].row=Math.floor(square[i+35].location/10);
        square[i+35].column=square[i+35].location % 10;
        
    }

}

squareObj.prototype.num=70;

squareObj.prototype.picNum=14;


squareObj.prototype.draw=function(){
    if(this.alive){
        
        var no=this.picNo;
        ctx2.drawImage(squareNo[no],this.column*70+50,this.row*70+100);
        if(this.hover){
            ctx2.globalpha=0.5;
            ctx2.fillStyle="rgba(255,0,0,0.5)";
            ctx2.fillRect(this.column*70+50,this.row*70+100,70,70);
        }
    }else{
        ctx2.clearRect(this.column*70+50,this.row*70+100,70,70);
    }
    
    
   
}

function samePic(aRow,aColumn,bRow,bColumn){
    var aLocation=aRow*10+aColumn;
    var bLocation=bRow*10+bColumn;
    if(square[foundIndex(aLocation)].picNo != square[foundIndex(bLocation)].picNo){
    
        return false;
        

    }else{
       
        var ss=truePath(aRow,aColumn,bRow,bColumn);
        return ss;
    }
   
}

function truePath(aRow,aColumn,bRow,bColumn){
   var a=sameRow(aRow,aColumn,bRow,bColumn);
   var b=sameColumn(aRow,aColumn,bRow,bColumn);
   var c=turnOnce(aRow,aColumn,bRow,bColumn);
   var d=turnTwice(aRow,aColumn,bRow,bColumn);
   return a || b || c || d;
}

function sameRow(aRow,aColumn,bRow,bColumn){
    if(aRow==bRow){//同行
         var maxColumn=aColumn>bColumn?aColumn:bColumn;
         var minColumn=aColumn<bColumn?aColumn:bColumn;
         if(maxColumn-minColumn==1){
             return true;
         }else{
             for(var i=0;i<maxColumn-minColumn-1;i++){
             if(!square[foundIndex(aRow*10+minColumn+i+1)].alive){
                 var flag=true;
             }else{
                 var flag=false;
                 break;
             }

             }
             return flag;
         }
    }else{
        return false;
    }
}
function sameColumn(aRow,aColumn,bRow,bColumn){
    if(aColumn==bColumn){//同列
         var maxRow=aRow>bRow?aRow:bRow;
         var minRow=aRow<bRow?aRow:bRow;
         if(maxRow-minRow==1){
             return true;
         }else{
             for(var i=0;i<maxRow-minRow-1;i++){
             if(!square[foundIndex((minRow+i+1)*10+aColumn)].alive){
                 var flag=true;
             }else{
                 var flag=false;
                 break;
             }

             }
             return flag;
         }
    }else{
        return false;
    }

}

function turnOnce(aRow,aColumn,bRow,bColumn){
    if(aRow!=bRow && aColumn!= bColumn){
        if(!square[foundIndex(aRow*10+bColumn)].alive){
            var flag1=sameRow(aRow,aColumn,aRow,bColumn);
            var flag2=sameColumn(bRow,bColumn,aRow,bColumn);
            var flag3=flag1 && flag2;
        }else {
            var flag3=false;
        }
        if(!square[foundIndex(bRow*10+aColumn)].alive){///
            var flag4=sameRow(bRow,bColumn,bRow,aColumn);
            var flag5=sameColumn(aRow,aColumn,bRow,aColumn);
            var flag6=flag4 && flag5;
        }else{
            var flag6=false;
        }
        return (flag3||flag6);

    }else{
        return false;
    }
}

function turnTwice(aRow,aColumn,bRow,bColumn){
    for(var i=0;i<10;i++){
        if(!square[foundIndex(aRow*10+i)].alive){
            var flag1=sameRow(aRow,aColumn,aRow,i);
            var flag2=turnOnce(bRow,bColumn,aRow,i);
            var flag3=flag1 && flag2;
            if(flag3){
                break;
            }
        }else{
            var flag3=false;
        }
    }
    for(var i=0;i<7;i++){
        if(!square[foundIndex(i*10+aColumn)].alive){
            var flag4=sameColumn(aRow,aColumn,i,aColumn);
            var flag5=turnOnce(bRow,bColumn,i,aColumn);
            var flag6=flag4 && flag5;
            if(flag6){
                break;
            }
        }else{
            var flag6=false;
        }
    }
    return (flag3 || flag6);
}