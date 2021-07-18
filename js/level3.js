const LEVEL_3_TIME = 240;
const LEVEL_3_LIVES = 5;
const LEVEL_3_CANDIES = 10;
let background;
let platforms;
let platformsIce;
let platformsMud;
let platformsSlime;
let ground;
let slime3;
let moveLeft3;
let moveRight3;
let jump3;
let shotBtn3;
let jumpAnim;
let moveAnim;
let chofAnim;
let air;
let XPlat = [400, 560, 1280, 1440, 1440, 1120, 1374, 1440, 496, 560, 800, 960];
let YPlat = [950, 950, 1050, 1050, 750,  400,  400,  400,  520, 520, 100, 100];
let XPlatIce = [750, 640,  960, 1120];
let YPlatIce = [750, 1168, 650, 650];
let XPlatMud = [0,   160,  960, 1120, 1280, 1440];
let YPlatMud = [310, 310, 1168, 1168, 1168, 1168];
let XPlatSlime = [ 160, 400, 1280];
let YPlatSlime = [1168, 520, 400];
let XCandy = [380, 1060, 1510, 580, 970, 780, 1460, 1460, 370, 420];
let YCandy = [60,  60,   20,   410, 610, 710, 710,  1128, 600, 910];
let XLife = [ 30,1540, 1540];
let YLife = [282, 372, 1022];
let XMutant = [ 430,  980, 1310, 1150, 1150, 430, 690];
let YMutant = [1142, 1142, 1024,  624,  374, 494, 494];
let XTrees = [ 590,  190];
let YTrees = [ 958,  318];
let XCactus = [ 815, 1460, 640, 780];
let YCactus = [1148, 380, 1002, 119];
let speedMod;
let jumpMod;
let candies;
let candiesLeft;
let exit3;
let lives3;
let currentLives;
let hudGroup3;
let hudTime3;
let hudCandies3;
let hudLives3;
let hearts3;
let time3;
let mutants3;
let cactuses;
let trees;

let level3State = {
    preload: preloadLevel3,
    create: createLevel3,
    update: updateLevel3/*,
    render:debugHitBox*/
};

function preloadLevel3(){
    game.load.image('sky','assets/imgs/fondo2.png');
    game.load.image('soilNormal','assets/imgs/Advanced/DirtBlock.png');
    game.load.image('soilFast','assets/imgs/Advanced/IceBlock.png');
    game.load.image('soilSlow','assets/imgs/Advanced/MudBlock.png');
    game.load.image('soilJump','assets/imgs/Advanced/SlimeBlock.png');
    game.load.spritesheet('slime','assets/imgs/Advanced/Slime3.png', 29, 26, 13);
    game.load.image('heart', 'assets/imgs/heart.png');
    game.load.spritesheet('candy', 'assets/imgs/caramelo.png',256,156,2);
    game.load.image('cactus', 'assets/imgs/cactus.png');
    game.load.image('tree', 'assets/imgs/Tree.png');
    game.load.image('exitClosed', 'assets/imgs/Advanced/La_puerta_hacia_el_dorado_negro_3.png');
    game.load.image('exitOpen', 'assets/imgs/Advanced/La_puerta_hacia_el_dorado_3.png');
    game.load.audio('sndDamage', 'assets/sounds/DamageSound.wav');
    game.load.audio('endsound', 'assets/sounds/EndSound.wav');
    game.load.audio('exitsound', 'assets/sounds/Exit.wav');
    game.load.audio('candysound', 'assets/sounds/candy.wav');
    game.load.spritesheet('slimeMutant','assets/imgs/Advanced/ZombieMutanteAdvanced.png',29,26,6);
    game.load.spritesheet('slimeShot','assets/imgs/SlimeShot.png',10,11,8);
    game.load.spritesheet('mutantShot','assets/imgs/mutantShot.png',8,8,8);
    game.load.audio('sndDamage', 'assets/sounds/DamageSound.wav');
    game.load.audio('endsound', 'assets/sounds/EndSound.wav');
    game.load.audio('exitsound', 'assets/sounds/Exit.wav');
    game.load.audio('candysound', 'assets/sounds/candy.wav');
    game.load.audio('collectPowerUp', 'assets/sounds/CollectPowerUp.wav');
    game.load.audio('hammerSound', 'assets/sounds/HammerSound.wav');
    game.load.audio('shieldSound', 'assets/sounds/ShieldSound.wav');
    game.load.audio('shotSound', 'assets/sounds/shotSound.wav');
    game.load.audio('zombieDeath', 'assets/sounds/Explosion.wav');
    game.load.spritesheet( 'zombieBlast','assets/imgs/zombieBlast.png',128,128);
}

function createLevel3(){
    musicMenu.pause();
    if (!musicLevel.isPlaying) musicLevel.play();
    game.world.resize(1600, 1200);
    access3=true;
    createControlKeys3();
    createBackgroundLevel3();
    createGround();
    createExit3();
    createLives3();
    createSlime3();
    createMutants3();
    createCactus();
    createTrees();
    createSoundsLevel2();
    createBlasts(BLAST_GROUP_SIZE);
    createMutantShots(SHOTS_GROUP_SIZE);
    createCandies(LEVEL_3_CANDIES);
    air=true;
    inmunity=false;
    victory3=false;
    speedMod=1;
    jumpMod=1;
    candiesLeft=LEVEL_3_CANDIES;
    currentLives=LEVEL_3_LIVES;
    hearts3=[];
    times=[];
    time3=LEVEL_3_TIME;
    createHUD3();
    timer3();
    createShots(SHOTS_GROUP_SIZE);
    enemiesKilled=0;
    end =false;
}

function createHUD3(){
    hudGroup3 = game.add.group();
    hudTime3 = game.add.text(250,20, setRemainingTime(time3), HUD_STYLE_TIME);
    hudTime3.anchor.setTo(0.5,0.5);
    hudLevel3=game.add.text(740,540,'Level: 3', HUD_STYLE_TEXT)
    hudLevel3.anchor.setTo(0.5,0.5);
    hudCandies3=game.add.text(700,574,'Candies left: '+candiesLeft, HUD_STYLE_TEXT);
    hudCandies3.anchor.setTo(0.5,0.5);
    hudGroup3.add(hudLevel3);
    hudGroup3.add(hudCandies3);
    hudGroup3.add(hudTime3);
    createHearts(hearts3, LEVEL_3_LIVES, hudGroup3);
    hudGroup3.fixedToCamera = true;
}

function createControlKeys3(){
    moveLeft3 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    moveRight3 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    jump3 = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    shotBtn3 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function createBackgroundLevel3(){
    background= game.add.tileSprite(0,0,800,600,'sky');
    background.scale.setTo(2,2);
}

function createGround(){
    platforms= game.add.group();
    for (let x=0; x<960; x+=160){
        if(x==640) continue;
        ground = game.add.sprite(160,32,'soilNormal');
        if (x==160) ground.x=256;
        else ground.x=x;
        ground.y=1168;
        platforms.add(ground);
        game.physics.arcade.enable(ground);
        ground.body.immovable=true;
    }
    createNormalPlatforms();
    createIcePlatforms();
    createMudPlatforms();
    createSlimePlatforms();
}

function createNormalPlatforms(){
    for (let i=0; i<XPlat.length; i++){
        let plat;
        let x = XPlat[i];
        let y = YPlat[i];
        plat = game.add.sprite(160,32,'soilNormal');
        plat.x=x;
        plat.y=y;
        platforms.add(plat);
        game.physics.arcade.enable(plat);
        plat.body.immovable=true;
    }
}

function createIcePlatforms(){
    platformsIce= game.add.group();
    for (let i=0; i<XPlatIce.length; i++){
        let plat;
        let x = XPlatIce[i];
        let y = YPlatIce[i];
        plat = game.add.sprite(160,32,'soilFast');
        plat.x=x;
        plat.y=y;
        platformsIce.add(plat);
        game.physics.arcade.enable(plat);
        plat.body.immovable=true;
    }
}

function createMudPlatforms(){
    platformsMud= game.add.group();
    for (let i=0; i<XPlatMud.length; i++){
        let plat;
        let x = XPlatMud[i];
        let y = YPlatMud[i];
        plat = game.add.sprite(160,32,'soilSlow');
        plat.x=x;
        plat.y=y;
        platformsMud.add(plat);
        game.physics.arcade.enable(plat);
        plat.body.immovable=true;
    }
}

function createSlimePlatforms(){
    platformsSlime= game.add.group();
    for (let i=0; i<XPlatSlime.length; i++){
        let plat;
        let x = XPlatSlime[i];
        let y = YPlatSlime[i];
        plat = game.add.sprite(96,32,'soilJump');
        plat.x=x;
        plat.y=y;
        platformsSlime.add(plat);
        game.physics.arcade.enable(plat);
        plat.body.immovable=true;
    }
}

function createTrees(){
    trees= game.add.group();
    for (let i=0; i<XTrees.length; i++){
        let tr;
        let x = XTrees[i];
        let y = YTrees[i];
        tr = game.add.sprite(40,52,'tree');
        tr.x=x;
        tr.y=y;
        trees.add(tr);
        tr.anchor.setTo(1,1);
        tr.scale.setTo(1.5,1.5);
        game.physics.arcade.enable(tr);
        tr.body.immovable=true;
    }
}

function createCactus(){
    cactuses= game.add.group();
    for (let i=0; i<XCactus.length; i++){
        let cac;
        let x = XCactus[i];
        let y = YCactus[i];
        cac = game.add.sprite(19,22,'cactus');
        game.physics.arcade.enable(cac);
        cac.anchor.setTo(0.5,0.5);
        cac.scale.setTo(1.8,1.8);
        if (i==3) cac.angle=270;
        else if (i==2) cac.angle=180;
        cac.x=x;
        cac.y=y;
        cactuses.add(cac);
        cac.body.immovable=true;

    }
}

function createExit3(){
    exit3 = game.add.sprite(60, 62, 'exitClosed')
    game.physics.arcade.enable(exit3);
    exit3.body.immovable = true;
    exit3.anchor.setTo(0, 1);
    exit3.x=820;
    exit3.y=100;
    exit3.smoothed= false;
    exit3.scale.setTo(1.5, 1.5);
}

function createSlime3(){
    slime3 = game.add.sprite(29,26,'slime',11);
    game.physics.arcade.enable(slime3);
    slime3.anchor.setTo(0.5,0.5);
    slime3.scale.setTo(2,2);
    slime3.body.collideWorldBounds = true;
    slime3.x=50;
    slime3.y=550;
    slime3.body.gravity.y = 400;
    jumpAnim= slime3.animations.add('jump', [11, 2, 3, 4, 5, 6, 7, 8, 9, 11]);
    moveAnim= slime3.animations.add('move', [11, 12]);
    chofAnim= slime3.animations.add('chof', [0]);

}

function createMutants3(){
    mutants3=game.add.group();
    for (let i=0; i<XMutant.length; i++){
        let mutant;
        let x = XMutant[i];
        let y = YMutant[i];
        mutant = game.add.sprite(174,26,'slimeMutant', 6);
        mutant.scale.setTo(2,2);
        mutant.anchor.setTo(0.5,0.5);
        mutant.animations.add('mutant');
        mutant.animations.play('mutant',6,true);
        mutant.x=x;
        mutant.y=y;
        mutants3.add(mutant);
        game.physics.arcade.enable(mutant);
        mutant.body.immovable=true;
    }
    mutants3.forEach(function(mutant) {game.time.events.add(2000,mutantShot3, mutant, this);}, this);
}

function createLives3(){
    lives3=game.add.group();
    for (let i=0; i<XLife.length; i++){
        let life;
        let x = XLife[i];
        let y = YLife[i];
        life = game.add.sprite(28,24,'heart');
        life.x=x;
        life.y=y;
        lives3.add(life);
        game.physics.arcade.enable(life);
        life.body.immovable=true;
    }
}

function createCandies(number){
    candies= game.add.group();
    for (let i=0; i<XCandy.length; i++){
        let candy;
        let x = XCandy[i];
        let y = YCandy[i];
        candy = game.add.sprite(256,156,'candy');
        candy.scale.setTo(0.25,0.25);
        candy.animations.add('candy');
        candy.animations.play('candy',2,true);
        candy.x=x;
        candy.y=y;
        candies.add(candy);
        game.physics.arcade.enable(candy);
        candy.body.immovable=true;
    }

}

function timer3(){
    time3--;
    hudTime3.setText(setRemainingTime(time3));
    if (time3 == 0)
        lose(time3);
    game.time.events.add(Phaser.Timer.SECOND, timer3);
}

function updateLevel3(){
    moveCamera3();
    moveSlime3();
    game.physics.arcade.collide(slime3, platforms, goNormal);
    game.physics.arcade.collide(slime3, platformsIce, gottaGoFast);
    game.physics.arcade.collide(slime3, platformsMud, gottaGoSlow);
    game.physics.arcade.collide(slime3, platformsSlime, gottaJump);
    game.physics.arcade.overlap(slime3, candies, pickCandy);
    game.physics.arcade.overlap(slime3, lives3, pickLife);
    game.physics.arcade.collide(slime3, mutants3, hitSlime);
    game.physics.arcade.collide(slime3, cactuses, hitSlime);
    game.physics.arcade.collide(slime3, trees);
    game.physics.arcade.overlap(shots, platforms, killShot);
    game.physics.arcade.overlap(shots, platformsIce, killShot);
    game.physics.arcade.overlap(shots, platformsMud, killShot);
    game.physics.arcade.overlap(shots, platformsSlime, killShot);
    game.physics.arcade.overlap(shots, candies, killShot);
    game.physics.arcade.overlap(shots, lives3, killShot);
    game.physics.arcade.overlap(mutants3, shots, shotHitsEnemyLevel2);
    game.physics.arcade.overlap(shots, cactuses, killShot);
    game.physics.arcade.overlap(shots, trees, killShot);
    game.physics.arcade.overlap(slime3, mutantShots, mutantShotHitsSlime3);
    game.physics.arcade.overlap(slime3, exit3, touchExit3);



    manageShots3();
    mutants3.forEach(manageMutant3);
    decreaseVelocity3();
    chof();
}

function touchExit3(){
    if (candiesLeft == 0){
        times.push(time3);
        victory3=true;
        exit3.body.enable=false;
        sc=2;
        slime3.x=865;
        slime3.y=54;
        end=true;
        slime3.body.immovable=true;
        slime3.body.velocity.x=0;
        slime3.body.velocity.y=0;
        inmunity= true;
        slime3.body.gravity.y = 0;
        smoothTransition3();
    }
}

function smoothTransition3(){
    slime3.angle+=20;
    slime3.scale.setTo(sc,sc);
    sc-=0.05;
    if(sc<0.1)
        game.state.start('endGame');
    else
        game.time.events.add(Phaser.Timer.SECOND*0.05, smoothTransition3);
}

function mutantShotHitsSlime3(slime, shot){
    shot.kill();
    hitSlime();
}

function manageMutant3(mutant){
    if (Phaser.Math.distance(mutant.x, mutant.y,slime3.x,slime3.y)<400){
        if (slime3.x<mutant.x)
            mutant.scale.setTo(2,2);
        else
            mutant.scale.setTo(-2,2);
    }
}

function mutantShot3(mutant){
    if (Phaser.Math.distance(slime3.x, slime3.y, mutant.x, mutant.y)<400 && mutant.alive){
        let dx;
        if (mutant.scale.x>0) dx = -1;
        else dx = 1;
        shoot(mutant.x+dx+25*dx,mutant.y, dx*300, 0, 'mutantShot', mutantShots, 90*dx);
    }
    game.time.events.add(1500,mutantShot3, mutant, this);
}

function manageShots3(){
    if (shotBtn3.justDown){
        let dx;
        if (slime3.scale.x>0) dx = 1;
        else dx = -1;
        let s= shoot(slime3.x+dx+25*dx,slime3.y, dx*400, 0, 'slimeShot',shots, 90*dx);
        if(s)
            shotSound.play();
    }
}


function hitSlime(){
    if (!inmunity){
        inmunity=true;
        dmgSound.play();
        currentLives--;
        hearts3[currentLives].kill();
        if (currentLives<=0)
            lose(time3);
        else{
            game.time.events.add(Phaser.Timer.SECOND*2, function() {inmunity=false; slime3.alpha=1;});
            alpha=0.7;
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarDown3);
        }
    }
}

function alphaVarDown3(){
    if (inmunity){
        slime3.alpha-=0.1;
        if (slime3.alpha<= 0.3)
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarUp3);
        else
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarDown3);
    }
}

function alphaVarUp3(){
    if (inmunity){
        slime3.alpha+=0.1;
        if (slime3.alpha>= 0.7)
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarDown3);
        else
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarUp3);
    }
}

function pickLife(slime,life){
    if (currentLives<LEVEL_3_LIVES){
        life.kill();
        collectPowerUp.play();
        hearts3[currentLives].reset(hearts3[currentLives-1].x + 40,7);
        currentLives++;
    }
}

function pickCandy(slime, candy){
    candy.kill();
    candiesLeft--;
    candySound.play();
    hudCandies3.setText('Candies left: '+candiesLeft);
    if(candiesLeft==0){
        exit3 = game.add.sprite(60, 62, 'exitOpen');
        game.physics.arcade.enable(exit3);
        exit3.body.immovable = true;
        exit3.anchor.setTo(0, 1);
        exit3.x=820;
        exit3.y=100;
        exit3.smoothed= false;
        exit3.scale.setTo(1.5, 1.5);
        exitSound.play();
        game.world.bringToTop(slime3);
        game.world.bringToTop(hudGroup3);
    }
}

function gottaGoFast(){
    speedMod=1.8;
    jumpMod=1;

}

function gottaJump(){
    speedMod=1;
    jumpMod=1.25;

}

function gottaGoSlow(){
    speedMod=0.35;
    jumpMod=0.7;
}

function goNormal(){
    speedMod=1;
    jumpMod=1;

}

function chof(){
    if (!air && slime3.body.velocity.y>0)
        air =true;

    if (air && slime3.body.velocity.y==0){
        air =false;
        slime3.animations.play('chof', 5.25, false);
    }
}

function moveCamera3(){
    if (end) return;
    game.camera.x=slime3.x-400;
    game.camera.y=slime3.y-235;
}

function moveSlime3(){
    if (end) return;
    if (jump3.isDown && (game.physics.arcade.collide(slime3, platforms) || game.physics.arcade.collide(slime3, platformsIce)
    || game.physics.arcade.collide(slime3, platformsMud) || game.physics.arcade.collide(slime3, platformsSlime)) && !chofAnim.isPlaying && !air){
        slime3.animations.play('jump', 7.5, false);
        slime3.body.velocity.y -= 450*jumpMod;
        air =true;
    }
    if (moveLeft3.isDown && moveRight3.isDown || chofAnim.isPlaying){
        return;
    }
    else if (moveLeft3.isDown){
        slime3.scale.setTo(-2,2);
        if (!moveAnim.isPlaying && !jumpAnim.isPlaying)
            slime3.animations.play('move',3, false);
        if (slime3.body.velocity.x>-275*speedMod)
            slime3.body.velocity.x-=50;
    }
    else if (moveRight3.isDown){
        slime3.scale.setTo(2,2);
        if (!moveAnim.isPlaying && !jumpAnim.isPlaying)
            slime3.animations.play('move',3,false);
        if (slime3.body.velocity.x<275*speedMod)
            slime3.body.velocity.x+=50;
    }
}

function decreaseVelocity3(){
    if (slime3.body.velocity.x>0 || slime3.body.velocity.x<0){
        slime3.body.velocity.x/=1.045;
    }
    if (Math.abs(slime3.body.velocity.x)<35){
        slime3.body.velocity.x=0;
    }
}

