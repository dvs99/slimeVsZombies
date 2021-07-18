let tileSizes=[128, 160, 192, 224, 256, 288];
const TILES_SIZE = 5;
const NORMAL_OBJECTS_SIZE=15;
const DAMAGE_OBJECTS_SIZE=10;
const LIVES_SIZE=3;
const WIN_OBJECTS_SIZE=10;
const LEVEL_1_TIME = 300;
const LEVEL_1_LIVES = 5;
const HUD_STYLE_TIME={font: 'bold 25pt Pacifico', fontWeight: 'bold',
fill: '#ffffff'};
const HUD_STYLE_TEXT={font: 'bold 20pt Pacifico', fontWeight: 'bold',
fill: '#e312e5'};
let fastTiles;
let slowTiles;
let tileNormal;
let normalObjects;
let damageObjects;
let winObjects;
let Sounddmg;
let lives;
let time;
let exit;
let objLeft;
let hudGroup;
let hudTime;
let hudObjects;
let hudLevel;
let hearts;
let currentLevel;
let inmunity;
let sc;
let collectPowerUp;
let hammerSound;
let shieldSound;
let liveItems;
let liveItem;

let level1State = {
    preload: preloadLevel1,
    create: createLevel1,
    update: updateLevel1/*,
    render: debugHitBox*/
};

function preloadLevel1() {
    game.load.spritesheet('slimeMove','assets/imgs/SlimeMov.png',25,29,7);
    game.load.image('soilNormal','assets/imgs/DirtBlock.png');
    game.load.image('soilFast','assets/imgs/IceBlock.png');
    game.load.image('soilSlow','assets/imgs/MudBlock.png');
    game.load.image('bush', 'assets/imgs/Bush.png');
    game.load.image('heart', 'assets/imgs/heart.png');
    game.load.spritesheet('candy', 'assets/imgs/caramelo.png',256,156,2);
    game.load.image('cactus', 'assets/imgs/cactus.png');
    game.load.spritesheet('vortex', 'assets/imgs/Vortice.png',161,165,27);
    game.load.image('tree', 'assets/imgs/Tree.png');
    game.load.image('exitClosed', 'assets/imgs/La_puerta_hacia_el_dorado_negro.png');
    game.load.image('exitOpen', 'assets/imgs/La_puerta_hacia_el_dorado.png');
    game.load.audio('sndDamage', 'assets/sounds/DamageSound.wav');
    game.load.audio('endsound', 'assets/sounds/EndSound.wav');
    game.load.audio('exitsound', 'assets/sounds/Exit.wav');
    game.load.audio('candysound', 'assets/sounds/candy.wav');
    game.load.audio('collectPowerUp', 'assets/sounds/collectPowerUp.wav');

}   

function createLevel1() {
    musicMenu.pause();
    if (!musicLevel.isPlaying) musicLevel.play();
    game.world.resize(1600, 1200);
    createBackgroundLevels();
    hearts=[];
    times=[];
    victory1=false;
    inmunity=false;
    createExit();
    createSlimeLevels(LEVEL_1_LIVES);
    createKeyControlsLevel1();
    createNormalObjects();
    createDamageObjects();
    createWinObjects();
    createLives(LIVES_SIZE);
    createSoundsLevel1();
    time=LEVEL_1_TIME;
    currentLevel=1;
    access1=true;
    createHUD();
    timer();
    end=false;
    inmunity=false;

}

function createLives(number){
    liveItems=game.add.group();
            for(let i = 0; i<number; i++){
                liveItem= game.add.sprite(28,24,'heart');
                liveItem.x=Math.random()*1520;
                liveItem.y=Math.random()*1120;
                game.physics.arcade.enable(liveItem);
                liveItem.body.immovable=true;
                while (game.physics.arcade.overlap(liveItem, normalObjects) || game.physics.arcade.overlap(liveItem, damageObjects) ||
                game.physics.arcade.overlap(liveItem, winObjects) || checkCoordinates(270,450,170,350,liveItem.x, liveItem.y)
                || checkCoordinates(660,850,460,650,liveItem.x, liveItem.y)){
                    liveItem.destroy();
                    liveItem= game.add.sprite(28,24,'heart');
                    liveItem.x=Math.random()*1520;
                    liveItem.y=Math.random()*1120;
                    game.physics.arcade.enable(liveItem);
                    liveItem.body.immovable=true;
                }
                liveItems.add(liveItem);

            }
        game.world.sendToBack(liveItems);
        game.world.sendToBack(fastTiles);
        game.world.sendToBack(slowTiles);
        game.world.sendToBack(tileNormal);
}

function createHUD() {
    hudGroup = game.add.group();
    hudTime = game.add.text(250,20, setRemainingTime(time), HUD_STYLE_TIME);
    hudTime.anchor.setTo(0.5,0.5);
    hudObjects=game.add.text(700,575,'Objects left: '+objLeft, HUD_STYLE_TEXT);
    hudObjects.anchor.setTo(0.5,0.5);
    hudLevel=game.add.text(740,540,'Level: '+currentLevel, HUD_STYLE_TEXT);
    hudLevel.anchor.setTo(0.5,0.5);
    hudGroup.add(hudLevel);
    hudGroup.add(hudObjects);
    hudGroup.add(hudTime);
    createHearts(hearts, LEVEL_1_LIVES, hudGroup);
    hudGroup.fixedToCamera = true;
}

function createHearts(array, number, group){
    let aux=10;
    let heart;
    for(let i = 0; i<number; i++){
        heart = game.add.sprite(aux,7,'heart');
        heart.scale.setTo(1.2,1.2);
        group.add(heart);
        array.push(heart);
        aux+=40;}
}

function setRemainingTime(seconds) {
    return String(Math.trunc(seconds / 60)).padStart(2, "0") + ":" +
        String(seconds % 60).padStart(2, "0");
}

function createExit(){
    exit = game.add.sprite(60, 76, 'exitClosed')
    game.physics.arcade.enable(exit);
    exit.body.immovable = true;
    exit.anchor.setTo(0.5, 0.5);
    exit.x=800;
    exit.y=600;
    exit.smoothed= false;
    exit.scale.setTo(1.7, 1.7);
}

function timer(){
    time--;
    hudTime.setText(setRemainingTime(time));
    if (time == 0)
        lose(time);
    game.time.events.add(Phaser.Timer.SECOND, timer);
}

function createSoundsLevel1(){
    dmgSound = game.add.audio('sndDamage');
    endSound = game.add.audio('endsound');
    exitSound = game.add.audio('exitsound');
    candySound = game.add.audio('candysound');
    shotSound = game.add.audio('shotSound');
    zombieDeath = game.add.audio('zombieDeath');
    collectPowerUp = game.add.audio('collectPowerUp');
}

function createBackgroundLevels(){
    tileNormal= game.add.tileSprite(0,0,1600,1200,'soilNormal');
    createFast();
    createSlow();
}

function createFast(){
    fastTiles = game.add.group();
    for(let i = 0; i<TILES_SIZE; i++){
        let tile= game.add.tileSprite(Math.floor(Math.random()*44)*32,Math.floor(Math.random()*34)*32,
                    tileSizes[Math.round(Math.random()*tileSizes.length)],tileSizes[Math.round(Math.random()*tileSizes.length)],'soilFast');
        game.physics.arcade.enable(tile);
        fastTiles.add(tile);
    }
}

function createSlow(){
    slowTiles = game.add.group();
    for(let i = 0; i<TILES_SIZE; i++){
        let tile= game.add.tileSprite(Math.floor(Math.random()*44)*32,Math.floor(Math.random()*34)*32,
        tileSizes[Math.round(Math.random()*tileSizes.length)],tileSizes[Math.round(Math.random()*tileSizes.length)],'soilSlow');
        game.physics.arcade.enable(tile);
        while (game.physics.arcade.overlap(tile, fastTiles)){
            tile.destroy();
            tile= game.add.tileSprite(Math.floor(Math.random()*44)*32,Math.floor(Math.random()*34)*32,
            tileSizes[Math.round(Math.random()*tileSizes.length)],tileSizes[Math.round(Math.random()*tileSizes.length)],'soilSlow');
            game.physics.arcade.enable(tile);
        }
        slowTiles.add(tile);
    }
}

function createSlimeLevels(number){
    slimeTrain = game.add.sprite(29, 26, 'slimeMove')
    game.physics.arcade.enable(slimeTrain);
    slimeTrain.body.collideWorldBounds = true;
    slimeTrain.x=400;
    slimeTrain.y=300;
    slimeTrain.anchor.setTo(0.5, 0.5);
    slimeTrain.smoothed= false;
    slimeTrain.scale.setTo(2, 2);
    slimeTrain.animations.add('move');
    lives = number;
    objLeft = WIN_OBJECTS_SIZE;
}

function checkCoordinates(minX,maxX,minY,maxY,objX,objY){
    if(objY>minY & objY<maxY & objX>minX & objX<maxX){
        return true;
    }
    return false;
}

function createNormalObjects(){
    normalObjects=game.add.group();
    for(let i = 0; i<NORMAL_OBJECTS_SIZE; i++){
        let normal;
        if (i<NORMAL_OBJECTS_SIZE/2)
            normal= game.add.sprite(64,64,'bush');
        else{
            normal = game.add.sprite(40,52,'tree');
            normal.scale.setTo(1.7,1.7);
        }
        normal.x=Math.random()*1520;
        normal.y=Math.random()*1120;
        game.physics.arcade.enable(normal);
        normal.body.immovable=true;
        while (game.physics.arcade.overlap(normal, normalObjects) || checkCoordinates(270,450,170,350,normal.x, normal.y)
                || checkCoordinates(660,850,460,650,normal.x, normal.y)){
            normal.destroy();
            if (i<NORMAL_OBJECTS_SIZE/2)
                normal= game.add.sprite(64,64,'bush');
            else{
                normal = game.add.sprite(40,52,'tree');
                normal.scale.setTo(1.7,1.7);
            }
            normal.x=Math.random()*1520;
            normal.y=Math.random()*1120;
            game.physics.arcade.enable(normal);
            normal.body.immovable=true;
        }
        normalObjects.add(normal);
    }
}


function createDamageObjects(){
    damageObjects=game.add.group();
    for(let i = 0; i<DAMAGE_OBJECTS_SIZE; i++){
        let damage;
        if (i<DAMAGE_OBJECTS_SIZE/2){
            damage= game.add.sprite(19,22,'cactus');
            damage.scale.setTo(2,2);
        }
        else{
            damage= game.add.sprite(161,165,'vortex');
            damage.scale.setTo(0.5,0.5);
            damage.animations.add('vort');
            damage.animations.play('vort',7, true);
        }
        damage.x=Math.random()*1520;
        damage.y=Math.random()*1120;
        game.physics.arcade.enable(damage);
        damage.body.immovable=true;
        while (game.physics.arcade.overlap(damage, normalObjects) || game.physics.arcade.overlap(damage, damageObjects) ||
        checkCoordinates(270,450,170,350,damage.x, damage.y) || checkCoordinates(660,850,460,650,damage.x, damage.y)){
            damage.destroy();
            if (i<DAMAGE_OBJECTS_SIZE/2){
                damage= game.add.sprite(19,22,'cactus');
                damage.scale.setTo(2,2);
            }
            else{
                damage= game.add.sprite(161,165,'vortex');
                damage.scale.setTo(0.5,0.5);
                damage.animations.add('vort');
                damage.animations.play('vort',7, true);
            }
            damage.x=Math.random()*1520;
            damage.y=Math.random()*1120;
            game.physics.arcade.enable(damage);
            damage.body.immovable=true;
        }
        damageObjects.add(damage);
    }
}

function createWinObjects(){
    winObjects=game.add.group();
        for(let i = 0; i<WIN_OBJECTS_SIZE; i++){
            win= game.add.sprite(256,156,'candy');
            win.scale.setTo(0.25,0.25);
            win.animations.add('candyAn');
            win.animations.play('candyAn',2, true);
            win.x=Math.random()*1520;
            win.y=Math.random()*1120;
            game.physics.arcade.enable(win);
            win.body.immovable=true;
            while (game.physics.arcade.overlap(win, normalObjects) || game.physics.arcade.overlap(win, damageObjects) ||
            game.physics.arcade.overlap(win, winObjects) || checkCoordinates(270,450,170,350,win.x, win.y)
            || checkCoordinates(660,850,460,650,win.x, win.y)){
                win.destroy();
                win= game.add.sprite(256,156,'candy');
                win.scale.setTo(0.25,0.25);
                win.animations.add('candyAn');
                win.animations.play('candyAn',2, true);
                win.x=Math.random()*1520;
                win.y=Math.random()*1120;
                game.physics.arcade.enable(win);
                win.body.immovable=true;
            }
        winObjects.add(win);
    }
}
    

function createKeyControlsLevel1() {
    let canvas= document.getElementById('gamestage').children[0];
    canvas.addEventListener('mouseout', activateKeyboard)
    canvas.addEventListener('mouseover', deactivateKeyboard)
    cursors = game.input.keyboard.createCursorKeys();
    rotateLeftTraining = game.input.keyboard.addKey(
        Phaser.Keyboard.LEFT);
    rotateRightTraining = game.input.keyboard.addKey(
        Phaser.Keyboard.RIGHT);
    dashSlimeTraining = game.input.keyboard.addKey(
        Phaser.Keyboard.UP);
}

function updateLevel1() {
    moveSlimeLevels();
    decreaseVelocityLevels();
    moveCamera();
    game.physics.arcade.collide(slimeTrain, normalObjects);
    game.physics.arcade.collide(slimeTrain, damageObjects, damageSlime);
    game.physics.arcade.overlap(slimeTrain, exit, touchExit);
    game.physics.arcade.overlap(slimeTrain, liveItems, pickLive);
    game.physics.arcade.overlap(slimeTrain, winObjects, pickObject);
}

function pickLive(slimeTrain,liveItem){
    if (lives<LEVEL_1_LIVES){
        liveItem.kill();
        collectPowerUp.play();
        hearts[lives].reset(hearts[lives-1].x + 40,7);
        lives++;

    }
}

function pickObject(player, object){
    object.destroy();
    candySound.play();
    objLeft--;
    hudObjects.setText('Objects left: '+objLeft);

    if (objLeft==0){
        exit = game.add.sprite(60, 76, 'exitOpen');
        game.physics.arcade.enable(exit);
        exit.body.immovable = true;
        exit.anchor.setTo(0.5, 0.5);
        exit.x=800;
        exit.y=600;
        exit.smoothed= false;
        exit.scale.setTo(1.7, 1.7);
        exitSound.play();
        game.world.bringToTop(slimeTrain);
        game.world.bringToTop(hudGroup);
    }
}

function touchExit(){
    if (objLeft == 0){
        times.push(time);
        victory1=true;
        exit.body.enable=false;
        sc=2;
        slimeTrain.x=800;
        slimeTrain.y=600;
        end=true;
        slimeTrain.body.immovable=true;
        slimeTrain.body.velocity.x=0;
        slimeTrain.body.velocity.y=0;
        smoothTransition();
    }
}

function smoothTransition(){
    slimeTrain.angle+=20;
    slimeTrain.scale.setTo(sc,sc);
    sc-=0.05;        
    if(sc<0.1) 
        game.state.start('level2');
    else     
        game.time.events.add(Phaser.Timer.SECOND*0.05, smoothTransition);
}

function damageSlime(){
    if (!inmunity){  
        inmunity=true;
        dmgSound.play();
        lives--;
        hearts[lives].kill();
        if (lives<=0)
            lose(time);
        else{
            game.time.events.add(Phaser.Timer.SECOND*2, function() {inmunity=false; slimeTrain.alpha=1;});
            alpha=0.7;
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarDown);
        }
    }
}

function alphaVarDown(){
    if (inmunity){
        slimeTrain.alpha-=0.1;
        if (slimeTrain.alpha<= 0.3)
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarUp);
        else
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarDown);
    }
}

function alphaVarUp(){
    if (inmunity){
        slimeTrain.alpha+=0.1;
        if (slimeTrain.alpha>= 0.7)
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarDown);
        else
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarUp);
    }
}

function lose(seconds){
    times.push(seconds);
    endSound.play();
    game.state.start('endGame');
}

function moveSlimeLevels(){
    if (end)
        return;
    if (control==0){
        if (slimeTrain.body.velocity.y == 0 & slimeTrain.body.velocity.x == 0)
            slimeTrain.angle = Phaser.Math.angleBetween(slimeTrain.x,slimeTrain.y,game.input.x+game.camera.x,game.input.y+game.camera.y)*180/Math.PI+90;
        if (game.input.mousePointer.rightButton.duration >= 0)
            holdDuration= game.input.mousePointer.rightButton.duration+500;
        if (game.input.activePointer.rightButton.justReleased(30)){
            let dx = Math.cos((slimeTrain.angle-90)*Math.PI/180);
            let dy = Math.sin((slimeTrain.angle-90)*Math.PI/180);
            if(holdDuration>MAX_HOLD_DURATION)
                holdDuration=MAX_HOLD_DURATION;
            slimeTrain.body.velocity.y=dy*DASH_VELOCITY*holdDuration/1000;
            slimeTrain.body.velocity.x=dx*DASH_VELOCITY*holdDuration/1000;
            slimeTrain.animations.play('move',750/Math.abs(Math.sqrt(slimeTrain.body.velocity.y*slimeTrain.body.velocity.y+slimeTrain.body.velocity.x*slimeTrain.body.velocity.x)),false);
        }
    }
    else if (control==1){
        if (slimeTrain.body.velocity.y == 0 & slimeTrain.body.velocity.x == 0 & (rotateLeftTraining.isDown))
            slimeTrain.angle -= ROTATE_VELOCITY;
        else if (slimeTrain.body.velocity.y == 0 & slimeTrain.body.velocity.x == 0 & (rotateRightTraining.isDown))
            slimeTrain.angle += ROTATE_VELOCITY;
        if (dashSlimeTraining.justUp){
            let dx = Math.cos((slimeTrain.angle-90)*Math.PI/180);
            let dy = Math.sin((slimeTrain.angle-90)*Math.PI/180);
            let holdDuration = dashSlimeTraining.duration+500;
            if(holdDuration>MAX_HOLD_DURATION)
                holdDuration=MAX_HOLD_DURATION;
            slimeTrain.body.velocity.y=dy*DASH_VELOCITY*holdDuration/1000;
            slimeTrain.body.velocity.x=dx*DASH_VELOCITY*holdDuration/1000;
            slimeTrain.animations.play('move',750/Math.abs(Math.sqrt(slimeTrain.body.velocity.y*slimeTrain.body.velocity.y+slimeTrain.body.velocity.x*slimeTrain.body.velocity.x)),false);
        }
    }
}

function decreaseVelocityLevels(){
    if (slimeTrain.body.velocity.y>0 || slimeTrain.body.velocity.y<0){
        slimeTrain.body.velocity.y/=1.012;
    }
    if (slimeTrain.body.velocity.x>0 || slimeTrain.body.velocity.x<0){
        slimeTrain.body.velocity.x/=1.012;
    }
    if (Math.abs(Math.sqrt(slimeTrain.body.velocity.y*slimeTrain.body.velocity.y+slimeTrain.body.velocity.x*slimeTrain.body.velocity.x)<35)){
        slimeTrain.body.velocity.y=0;
        slimeTrain.body.velocity.x=0;
    }

    if (game.physics.arcade.overlap(slimeTrain, fastTiles)){
        slimeTrain.body.velocity.y*=1.009;
        slimeTrain.body.velocity.x*=1.009;
    }
    else if(slimeTrain.animations.frame==6){
        slimeTrain.body.velocity.y/=1.5;
        slimeTrain.body.velocity.x/=1.5;
    }

    if (game.physics.arcade.overlap(slimeTrain, slowTiles)){
        slimeTrain.body.velocity.y/=1.01;
        slimeTrain.body.velocity.x/=1.01;
    }

}

function debugHitBox() {
    //normalObjects.forEach( game.debug.body, game.debug, true);
    //damageObjects.forEach( game.debug.body, game.debug, true);
    cactuses.forEach( game.debug.body, game.debug, true);
    game.debug.body(slime3);
}