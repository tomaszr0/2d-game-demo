function skillF(obj){
    if(typeof s[obj.skill] === "undefined")
        return;
    skillList=s[obj.skill];
    angle=obj.skillAngle;
    
    skillList.forEach(function(skill){
        switch(skill.type){
            case "spawn":
                obj2=oP[skill.object];
                angle2=angleCalc(angle+skill.angle);
                o[o.length]={       
                    object: skill.object,
                    status: "asd",
                    x: obj.x-oP[obj.object].width/2,
                    y: obj.y+oP[obj.object].height/2,
                    xAcc: Math.cos(angle2*Math.PI/180)*obj2.yAccMax,
                    yAcc: Math.sin(angle2*Math.PI/180)*obj2.yAccMax
                }
                break; // spawn /
    
            case "transform":
                pos=findBuff(obj.buffs,"transform");
                if(pos==-1){
                    obj.buffs[obj.buffs.length]={type: "transform", id: skill.id}
                    if(typeof skill.ticks !== "undefined")
                        obj.buffs[obj.buffs.length-1].ticks=skill.ticks;
                }
                else{
                    if(obj.buffs[pos].id==skill.id)
                        obj.buffs[pos]=0;
                    else
                        obj.buffs[pos].id=skill.id;
                }
                break;// transform /
            case "accToAngle":
                obj.xAcc=Math.cos(angle*Math.PI/180)*skill.acc;
                obj.yAcc=Math.sin(angle*Math.PI/180)*skill.acc;
                break;
        } // switch /
    });
    obj.skill=undefined;
}

function findBuff(buffs,buffType){
    found=-1;
    buffs.forEach(function(buff,id){
        if(buff.type==buffType)
            found=id;
    });
    return found;
}

function checkXAcc(x,y,w,h,xAcc){
    if(!xAcc)
        return {x:x,hit:0};
    if(xAcc>0){
        xMax=Math.round(x+w/2+xAcc-0.00001);
        xMin=Math.round(x-w/2);
    }
    else if(xAcc<0){
        xMax=Math.round(x+w/2-0.00001);
        xMin=Math.round(x-w/2+xAcc);
    }
    i=xMin;
    xAccIndex=[];
    while(i<=xMax){
        xAccIndex[xAccIndex.length]=i;
        i++;
    }
    if(xAcc<0)
        xAccIndex.reverse();
    yMin=Math.floor(y);
    yMax=Math.floor(y+h-0.00001);
    i=yMin;
    yIndex=[];
    while(i<=yMax){
        yIndex[yIndex.length]=i;
        i++;
    }
    xBreak=undefined;
    hit=0;
    xAccIndex.forEach(function(x){
        if(bIndex[x]!=undefined)
            yIndex.forEach(function(y){
                if(bIndex[x][y]!=undefined)
                    if( (xAcc>0 && xMax>x-.5 && (xBreak==undefined || xBreak<x)) || (xAcc<0 && xMin<x+.5 && (xBreak==undefined || xBreak>x)) ){
                        xBreak=x-(w/2+.5)*Math.abs(xAcc)/xAcc;
                        hit=1;
                       }
            });
    });
    if(xBreak==undefined)
        xBreak=x+xAcc;
    return {x:xBreak,hit:hit};
}

function checkYAcc(x,y,w,h,yAcc){
    if(!yAcc)
        return {y:y,hit:0};
    if(yAcc>0){
        yMax=Math.ceil(y+h+yAcc-0.00001);
        yMin=Math.ceil(y+h-0.00001);
    }
    else if(yAcc<0){
        yMax=Math.floor(y);
        yMin=Math.floor(y+yAcc);
    }
    i=yMin;
    yAccIndex=[];
    while(i<=yMax){
        yAccIndex[yAccIndex.length]=i;
        i++;
    }
    if(yAcc<0)
        yAccIndex.reverse();
    xMin=Math.round(x-w/2);
    xMax=Math.round(x+w/2-.00001);
    i=xMin;
    xIndex=[];
    while(i<=xMax){
        xIndex[xIndex.length]=i;
        i++;
    }
    yBreak=undefined;
    hit=0;
    xIndex.forEach(function(x){
        if(bIndex[x]!=undefined)
            yAccIndex.forEach(function(y){
                if(yBreak!=undefined)
                    return;
                if(bIndex[x][y]!=undefined)
                    if((x==xMin && x-w/2<x+.5)||(x==xMax && x+w/2>x-.5)||(x!=xMin && x!=xMax))
                        if(yAcc<0){
                            yBreak=y+1;
                            hit=1;
                        }
                        else if(yMax+yAcc>y+1 && yAcc>0){
                            yBreak=y-h;
                            hit=1;
                        }
            });
        if(yBreak!=undefined)
            return;
    });
    if(yBreak==undefined)
        yBreak=y+yAcc;
    return {y:yBreak,hit:hit};
}

function checkBlockDown(x,y,w){
    if(y!=Math.round(y))
        return 0;
    xMin=Math.round(x-w/2);
    xMax=Math.round(x+w/2-.00001);
    if(xMax<xMin){
        temp=xMax;
        xMax=xMin;
        xMin=temp;
        }
    i=xMin;
    xIndex=[];
    while(i<=xMax){
        xIndex[xIndex.length]=i;
        i++;
    }
    count=0;
    xIndex.forEach(function(x){
        if(bIndex[x]!=undefined)
            if(bIndex[x][y-1]!=undefined)
                if( (x==xMin && x-w/2<x+.5) || (x==xMax && x+w/2>x-.5) || (x!=xMin && x!=xMax) )
                    count++;
    });
    if(count>0)
        return 1;
    else
        return 0;
}

function angleCalc(angle){
    if(angle<0)
        angle+=360;
    if(angle>=360)
        angle-=360;
    return angle;
}

function accToAngle(xAcc,yAcc){
    angle=Math.atan(yAcc/xAcc)*180/Math.PI;
    angle*=-1;
    if(xAcc<0)
        angle-=180;
    if(angle<0)
        angle+=360;
    return angle;
}

function mkImg(texture){
    img=new Image(10,10);
    img.src=texture;
    img.width=img.naturalWidth;
    img.height=img.naturalHeight;
    return img;
}

// CONTROLS AND DEBUG
function drawCenter(){
    p.moveTo(0,c.height/2);
    p.lineTo(c.width,c.height/2);
    p.moveTo(c.width/2,0);
    p.lineTo(c.width/2,c.height);
    p.strokeStyle="#888888";
    p.stroke();
}
function debugF(){
    debug=1;
    update();
}
function debugOffF(){
    debugPrev=debug;
    debug=0;
    if(debugPrev)
        update();
}