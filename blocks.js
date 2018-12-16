bP=[];
bP[bP.length]={
    texture: "wood"
}


b=[];
b[b.length]={x:-3,y:0,block:0};
b[b.length]={x:-3,y:1,block:0};
b[b.length]={x:-3,y:2,block:0};
b[b.length]={x:-2,y:3,block:0};
b[b.length]={x:-1,y:3,block:0};
b[b.length]={x:4,y:0,block:0};
b[b.length]={x:3,y:0,block:0};
b[b.length]={x:3,y:1,block:0};
b[b.length]={x:-3,y:-1,block:0};
b[b.length]={x:-1,y:-1,block:0};
b[b.length]={x:0,y:-1,block:0};
b[b.length]={x:1,y:-1,block:0};
b[b.length]={x:2,y:-1,block:0};
b[b.length]={x:3,y:-1,block:0};
b[b.length]={x:4,y:-1,block:0};
bIndex=[]; // index of blocks
b.forEach(function(item,id){
    if(bIndex[item.x]==undefined)
      bIndex[item.x]=[];
    bIndex[item.x][item.y]=id;
});