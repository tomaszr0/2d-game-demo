oP=[];
oP[oP.length]={
    type: "unit",
    name: "human",
    width: 0.4,
    height: 1.8,
    xAccI: 0.006,
    xAccD: 0.02,
    xAccMax: 0.1,
    yAccJump: 0.2,
    yAccFall: 0.01,
    yAccMax: 0.4
};
oP[oP.length]={
    type: "projectile",
    texture: "arrow",
    width: .15,
    height: .15,
    xAccD: 0.001,
    xAccMax: 0.4,
    yAccMax: 0.4,
    yAccFall: 0.01
}
oP[oP.length]={
    type: "projectile",
    name: "fireball",
    texture: "fireball",
    width: .7,
    height: .7,
    xAccD: 0.00,
    xAccMax: 0.3,
    yAccMax: 0.3,
    yAccFall: 0.00
};
oP[oP.length]={
    name: "rat",
    type: "unit",
    width: .5,
    height: .2,
    xAccI: 0.003,
    xAccD: 0.01,
    xAccMax: 0.09,
    yAccMax: 0.4,
    yAccJump: 0.1,
    yAccFall: 0.01
};
oP[oP.length]={
    name: "point",
    type: "unit",
    width: .1,
    height: .1,
    xAccI: 0,
    xAccD: 0,
    xAccMax: 0.5,
    yAccMax: 0.5,
    yAccJump: 0,
    yAccFall: 0
}



o=[];
o[o.length]={
    object: 0,
    name: "player",
    status: "asd",
    x: 0,
    y: 0,
    xAcc: 0,
    yAcc: 0,
    buffs: [
        
    ]
};