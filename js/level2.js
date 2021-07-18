const LEVEL_2_TIME = 240;
const LEVEL_2_LIVES = 4;
let hudGroup2;
let hudLevel2;
let hudObjects2;
let hudPowerUps;
let hudHammer;
let hudShield;
let time2;
let hearts2;
let enemiesKilled;
let hammer;
let shield;
let haveHammer;
let haveShield;
let hammerBtn;
let shieldBtn;
let smoke;
let shieldActive;
let shieldIsActive;

let level2State = {
    preload: preloadLevel2,
    create: createLevel2,
    update: updateLevel2
};

function preloadLevel2(){
    game.load.spritesheet('slimeMove','assets/imgs/SlimeMov.png',25,29,7);
    game.load.image('soilNormal','assets/imgs/DirtBlock.png');
    game.load.image('soilFast','assets/imgs/IceBlock.png');
    game.load.image('soilSlow','assets/imgs/MudBlock.png');
    game.load.image('bush', 'assets/imgs/Bush.png');
    game.load.image('rock', 'assets/imgs/rock.png');
    game.load.image('heart', 'assets/imgs/heart.png');
    game.load.image('shield', 'assets/imgs/shield.png');
    game.load.image('hammer', 'assets/imgs/hammer.png');
    game.load.image('shieldActive', 'assets/imgs/shieldActive.png');
    game.load.image('shieldHud', 'assets/imgs/Invent_shield.png');
    game.load.image('hammerHud', 'assets/imgs/Invent_Hammer.png');
    game.load.image('smoke', 'assets/imgs/Smoke.png');
    game.load.spritesheet('candy', 'assets/imgs/caramelo.png',256,156,2);
    game.load.spritesheet('fire', 'assets/imgs/fire.png',23,28,4);
    game.load.image('cactus', 'assets/imgs/cactus.png');
    game.load.spritesheet('vortex', 'assets/imgs/Vortice.png',161,165,27);
    game.load.image('tree', 'assets/imgs/Tree.png');
    game.load.image('exitClosed', 'assets/imgs/La_puerta_hacia_el_dorado_negro.png');
    game.load.image('exitOpen', 'assets/imgs/La_puerta_hacia_el_dorado.png');
    game.load.audio('sndDamage', 'assets/sounds/DamageSound.wav');
    game.load.audio('endsound', 'assets/sounds/EndSound.wav');
    game.load.audio('exitsound', 'assets/sounds/Exit.wav');
    game.load.audio('candysound', 'assets/sounds/candy.wav');
    game.load.audio('collectPowerUp', 'assets/sounds/CollectPowerUp.wav');
    game.load.audio('hammerSound', 'assets/sounds/HammerSound.wav');
    game.load.audio('shieldSound', 'assets/sounds/ShieldSound.wav');
    game.load.spritesheet('slimeMutant','assets/imgs/ZombieMutante.png',25,26,2);
    game.load.spritesheet('slimeZombie','assets/imgs/zombieNormal.png',25,26,2);
    game.load.spritesheet('slimeShot','assets/imgs/SlimeShot.png',10,11,8);
    game.load.spritesheet('mutantShot','assets/imgs/mutantShot.png',8,8,8);
    game.load.audio('shotSound', 'assets/sounds/shotSound.wav');
    game.load.audio('zombieDeath', 'assets/sounds/Explosion.wav');
    game.load.spritesheet( 'zombieBlast','assets/imgs/zombieBlast.png',128,128);
}

function createLevel2(){
    musicMenu.pause();
    if (!musicLevel.isPlaying)
        musicLevel.play();
    game.world.resize(1600, 1200);
    createBackgroundLevels();
    victory2=false;
    hearts2=[];
    if (!access1)
        times=[];
    createKeyControlsLevel1();
    shotBtn = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    shieldBtn = game.input.keyboard.addKey(Phaser.Keyboard.X);
    hammerBtn = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    createExit();
    createSlimeLevels(LEVEL_2_LIVES);
    createShots(SHOTS_GROUP_SIZE);
    createNormalObjects2();
    createDamageObjects2();
    createWinObjects();
    createLives(LEVEL_2_LIVES);
    createMutantShots(SHOTS_GROUP_SIZE);
    createMutantsLevel2(MUTANTS_GROUP_SIZE);
    createZombiesLevel2(ZOMBIES_GROUP_SIZE);
    createSoundsLevel2();
    createBlasts(BLAST_GROUP_SIZE);
    createHammer();
    createShield();
    time2=LEVEL_2_TIME;
    currentLevel=2;
    enemiesKilled=0;
    access2=true;
    createHUD2();
    timer2();
    end=false;
    haveHammer=false;
    haveShield=false;
    shieldIsActive=false;
    inmunity=false;
}

function createNormalObjects2(){
    normalObjects=game.add.group();
    for(let i = 0; i<NORMAL_OBJECTS_SIZE; i++){
        let normal;
        if (i<NORMAL_OBJECTS_SIZE/3)
            normal= game.add.sprite(64,64,'bush');
        else if(i<NORMAL_OBJECTS_SIZE*2/3){
            normal = game.add.sprite(40,52,'tree');
            normal.scale.setTo(1.7,1.7);
        }
        else{
            normal = game.add.sprite(30,30,'rock');
            normal.scale.setTo(2,2);
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

function createSoundsLevel2(){
    dmgSound = game.add.audio('sndDamage');
    endSound = game.add.audio('endsound');
    exitSound = game.add.audio('exitsound');
    candySound = game.add.audio('candysound');
    shotSound = game.add.audio('shotSound');
    zombieDeath = game.add.audio('zombieDeath');
    collectPowerUp = game.add.audio('collectPowerUp');
    hammerSound = game.add.audio('hammerSound');
    shieldSound = game.add.audio('shieldSound');
}

function createDamageObjects2(){
    damageObjects=game.add.group();
    for(let i = 0; i<DAMAGE_OBJECTS_SIZE; i++){
        let damage;
        if (i<DAMAGE_OBJECTS_SIZE/3){
            damage= game.add.sprite(19,22,'cactus');
            damage.scale.setTo(2,2);
        }
        else if (i<DAMAGE_OBJECTS_SIZE*2/3){
            damage= game.add.sprite(161,165,'vortex');
            damage.scale.setTo(0.5,0.5);
            damage.animations.add('vort');
            damage.animations.play('vort',7, true);
        }
        else{
            damage= game.add.sprite(23,28,'fire');
            damage.scale.setTo(2,2);
            damage.animations.add('fire');
            damage.animations.play('fire',7, true);
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

function createHammer(){
    hammer= game.add.sprite(104,64,'hammer');
    hammer.scale.setTo(1,1);
    hammer.x=Math.random()*1520;
    hammer.y=Math.random()*1120;
    game.physics.arcade.enable(hammer);
    hammer.body.immovable=true;
    while (game.physics.arcade.overlap(hammer, normalObjects) || game.physics.arcade.overlap(hammer, damageObjects) ||
    game.physics.arcade.overlap(hammer, winObjects) || game.physics.arcade.overlap(hammer, winObjects) || 
    game.physics.arcade.overlap(hammer, zombies) || checkCoordinates(270,450,170,350,hammer.x, hammer.y) ||
    game.physics.arcade.overlap(hammer, mutants) || checkCoordinates(660,850,460,650,hammer.x, hammer.y)){
        hammer.destroy();
        hammer= game.add.sprite(104,64,'hammer');
        hammer.scale.setTo(1,1);
        hammer.x=Math.random()*1520;
        hammer.y=Math.random()*1120;
        game.physics.arcade.enable(hammer);
        hammer.body.immovable=true;
    }
    game.world.sendToBack(hammer);
    game.world.sendToBack(fastTiles);
    game.world.sendToBack(slowTiles);
    game.world.sendToBack(tileNormal);
}

function createShield(){
    shield= game.add.sprite(32,32,'shield');
    shield.scale.setTo(1.3,1.3);
    shield.x=Math.random()*1520;
    shield.y=Math.random()*1120;
    game.physics.arcade.enable(shield);
    shield.body.immovable=true;
    while (game.physics.arcade.overlap(shield, normalObjects) || game.physics.arcade.overlap(shield, damageObjects) ||
    game.physics.arcade.overlap(shield, winObjects) || game.physics.arcade.overlap(shield, winObjects) || 
    game.physics.arcade.overlap(shield, zombies) || checkCoordinates(270,450,170,350,hammer.x, hammer.y) ||
    game.physics.arcade.overlap(shield, mutants) || checkCoordinates(660,850,460,650,hammer.x, hammer.y) ||
    game.physics.arcade.overlap(shield, hammer)){
        shield.destroy();
        shield= game.add.sprite(104,64,'shield');
        shield.scale.setTo(1.3,1.3);
        shield.x=Math.random()*1520;
        shield.y=Math.random()*1120;
        game.physics.arcade.enable(shield);
        shield.body.immovable=true;
    }
}

function createHUD2(){
    hudGroup2 = game.add.group();
    hudTime2 = game.add.text(210,20, setRemainingTime(time2), HUD_STYLE_TIME);
    hudTime2.anchor.setTo(0.5,0.5);
    hudLevel2=game.add.text(740,505,'Level: '+currentLevel, HUD_STYLE_TEXT)
    hudLevel2.anchor.setTo(0.5,0.5);
    hudObjects2=game.add.text(700,540,'Objects left: '+objLeft, HUD_STYLE_TEXT);
    hudObjects2.anchor.setTo(0.5,0.5);
    hudPowerUps=game.add.text(655,575,'Power ups: ', HUD_STYLE_TEXT);
    hudPowerUps.anchor.setTo(0.5,0.5);
    hudGroup2.add(hudLevel2);
    hudGroup2.add(hudObjects2);
    hudGroup2.add(hudTime2);
    hudGroup2.add(hudPowerUps);
    createHearts(hearts2, LEVEL_2_LIVES, hudGroup2);
    hudGroup2.fixedToCamera = true;
}

function createMutantsLevel2(number){
    mutants = game.add.group();
    mutants.createMultiple(number, 'slimeMutant');
    mutants.callAll(
        'anchor.setTo', 'anchor', 0.5, 0.5);
    mutants.callAll(
        'scale.setTo', 'scale', 2, 2);
    mutants.forEach(placeMutantLevel2, this);
    mutants.forEach(function(mutant) {game.time.events.add(2500,mutantShot, mutant, this);}, this);
}

function placeMutantLevel2(mutant){
    let done=false;
    while(!done){
        let x=Math.random()*1600;
        let y=Math.random()*1200;
        mutant.reset(x, y);
        game.physics.arcade.enable(mutant)
        mutant.body.immovable=true;
        mutant.animations.add('mutantIdle');
        mutant.animations.play('mutantIdle',4, true);
        if (Phaser.Math.distance(slimeTrain.x, slimeTrain.y, x, y)>150 && 
        !game.physics.arcade.overlap(mutant, normalObjects) &&
        !game.physics.arcade.overlap(mutant, damageObjects) && 
        !game.physics.arcade.overlap(mutant, mutants) && 
        !game.physics.arcade.overlap(mutant, liveItems)){
            done=true;
        }
    }
}

function createZombiesLevel2(number){
    zombies = game.add.group();
    zombies.createMultiple(number, 'slimeZombie');
    zombies.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
    zombies.callAll('scale.setTo', 'scale', 2, 2);
    zombies.forEach(placeZombieLevel2, this);
    game.world.sendToBack(zombies);
    game.world.sendToBack(exit);
    game.world.sendToBack(fastTiles);
    game.world.sendToBack(slowTiles);
    game.world.sendToBack(tileNormal);
}

function placeZombieLevel2(zombie){
    let done=false;
    while(!done){
        let x=Math.random()*1600;
        let y=Math.random()*1200;
        zombie.reset(x, y)
        game.physics.arcade.enable(zombie);
        zombie.body.immovable=true;
        zombie.animations.add('slimeZombie');
        zombie.animations.play('slimeZombie',4, true);
        if (Phaser.Math.distance(slimeTrain.x, slimeTrain.y, x, y)>150 && 
        !game.physics.arcade.overlap(zombie, normalObjects) &&
        !game.physics.arcade.overlap(zombie, damageObjects) &&
        !game.physics.arcade.overlap(zombie, mutants) &&
        !game.physics.arcade.overlap(zombie, zombies) &&
        !game.physics.arcade.overlap(zombie, liveItems)){
            done=true;
        }
    }
}

function updateLevel2(){
    moveSlimeLevels();
    decreaseVelocityLevels();
    manageShots();
    moveCamera();
    useHammer();
    useShield();
    game.physics.arcade.collide(mutants, slimeTrain);
    game.physics.arcade.collide(slimeTrain, normalObjects);
    game.physics.arcade.collide(slimeTrain, damageObjects, damageSlime2);
    game.physics.arcade.overlap(slimeTrain, winObjects, pickObject2);
    game.physics.arcade.overlap(shots, normalObjects, killShot)
    game.physics.arcade.overlap(shots, damageObjects, killShot)
    game.physics.arcade.overlap(mutants,shots,shotHitsEnemyLevel2,null,this);
    game.physics.arcade.overlap(zombies,shots,shotHitsEnemyLevel2,null,this);
    game.physics.arcade.overlap(slimeTrain,mutantShots,mutantShotHitsSlime,null,this);
    game.physics.arcade.collide(slimeTrain, zombies, damageSlime2);
    game.physics.arcade.overlap(slimeTrain, exit, touchExit2);
    game.physics.arcade.overlap(slimeTrain, hammer, pickHammer);
    game.physics.arcade.overlap(slimeTrain, shield, pickShield);
    game.physics.arcade.overlap(slimeTrain, liveItems, pickLive2);
    mutants.forEach(manageMutant, this);
    manageZombiesLevel2();
}

function pickLive2(slimeTrain,liveItem){
    if (lives<LEVEL_2_LIVES){
        liveItem.kill();
        collectPowerUp.play();
        hearts2[lives].reset(hearts2[lives-1].x + 40,7);
        lives++;

    }
}

function pickHammer(){
    hammer.kill();
    collectPowerUp.play();
    haveHammer=true;
    hudHammer=game.add.sprite(16,16,'hammerHud');
    hudHammer.scale.setTo(1.4,1.4);
    hudHammer.x=hudPowerUps.x+75;
    hudHammer.y=hudPowerUps.y-8;
    hudGroup2.add(hudHammer);
}

function pickShield(){
    shield.kill();
    collectPowerUp.play();
    haveShield=true;
    hudShield=game.add.sprite(16,16,'shieldHud');
    hudShield.scale.setTo(1.4,1.4);
    hudShield.x=hudPowerUps.x+105;
    hudShield.y=hudPowerUps.y-8;
    hudGroup2.add(hudShield);
}

function useHammer(){
    if (end)
    return;
    if(haveHammer && hammerBtn.justDown){
        hudHammer.kill();
        hammerSound.play();
        smoke=game.add.sprite(38, 33, 'smoke');
        game.physics.arcade.enable(smoke);
        smoke.anchor.setTo(0.5,0.5);
        smoke.alpha=0.5;
        game.world.sendToBack(smoke);
        game.world.sendToBack(fastTiles);
        game.world.sendToBack(slowTiles);
        game.world.sendToBack(tileNormal);
        smoke.x=slimeTrain.x;
        smoke.y=slimeTrain.y;
        sc=1;
        growSmoke();
    }
}

function useShield(){
    if (end)
        return;
    if (shieldActive){
        shieldActive.x=slimeTrain.x;
        shieldActive.y=slimeTrain.y;
    }
    if(haveShield && shieldBtn.justDown){
        hudShield.kill();
        shieldSound.play();
        inmunity=true;
        shieldActive=game.add.sprite(720, 720, 'shieldActive');
        game.physics.arcade.enable(shieldActive);
        shieldActive.anchor.setTo(0.5,0.5);
        shieldActive.scale.setTo(0.09,0.09);
        shieldActive.x=slimeTrain.x;
        shieldActive.y=slimeTrain.y;
        game.time.events.add(Phaser.Timer.SECOND*10, function() {shieldActive.kill(); inmunity=false; createShield();});   
    }
}

function growSmoke(){
    smoke.scale.setTo(sc,sc);
    sc+=0.1;      
    smoke.x=slimeTrain.x;
    smoke.y=slimeTrain.y;  
    game.physics.arcade.overlap(smoke,zombies,smokeDestroyer);
    game.physics.arcade.overlap(smoke,mutants,smokeDestroyer);
    game.physics.arcade.overlap(mutantShots,smoke,killShot);
    if(sc>10) {
        smoke.kill();
        createHammer();
    }
    else     
        game.time.events.add(Phaser.Timer.SECOND*0.01, growSmoke);
}

function smokeDestroyer(smoke, enemy){
    enemy.kill();
    displayBlast(enemy);
    zombieDeath.play();
    enemiesKilled++;
}

function touchExit2(){
    if (objLeft == 0){
        times.push(time2);
        victory2=true;
        exit.body.enable=false;
        sc=2;
        slimeTrain.x=800;
        slimeTrain.y=600;
        end=true;
        slimeTrain.body.immovable=true;
        slimeTrain.body.velocity.x=0;
        slimeTrain.body.velocity.y=0;
        inmunity= true;
        smoothTransition2();
    }
}

function smoothTransition2(){
    slimeTrain.angle+=20;
    slimeTrain.scale.setTo(sc,sc);
    sc-=0.05;        
    if(sc<0.1) 
        game.state.start('endGame');
    else     
        game.time.events.add(Phaser.Timer.SECOND*0.05, smoothTransition2);
}

function manageZombiesLevel2(){
    countAngleSwitch++;
    zombies.forEach(manageZombieLevel2, this);
    if (countAngleSwitch==SWITCH_ANGLE_TIME)
        countAngleSwitch=0;
}

function manageZombieLevel2(zombie){
    if (end)
        return;
    if (Phaser.Math.distance(slimeTrain.x, slimeTrain.y, zombie.x, zombie.y)<250 && zombie.alive)
        zombie.angle=Phaser.Math.angleBetween(zombie.x,zombie.y,slimeTrain.x, slimeTrain.y)*180/Math.PI+90;
    else if (countAngleSwitch==SWITCH_ANGLE_TIME){
        zombie.angle+=Math.random()*60-30
        if (zombie.y<30 && zombie.x<30)
            zombie.angle=135;
        else if (zombie.y<30 && zombie.x>1570)
            zombie.angle=225;
        else if (zombie.y>1170 && zombie.x>1570)
            zombie.angle=315;
        else if (zombie.y>1170 && zombie.x<30)
            zombie.angle=45;
        else{
            if (zombie.y<100)
                zombie.angle=180;
            else if (zombie.y>1100)
                zombie.angle=0;
            if (zombie.x<100)
                zombie.angle=90;
            else if (zombie.x>1500)
                zombie.angle=270;
        }

    }
    if(!game.physics.arcade.collide(slimeTrain, zombie)){
        let dx = Math.cos((zombie.angle-90)*Math.PI/180);
        let dy = Math.sin((zombie.angle-90)*Math.PI/180);
        zombie.x+=dx/2;
        zombie.y+=dy/2;
    }
    
}

function mutantShotHitsSlime(slime, shot){
    shot.kill();
    damageSlime2();
}

function killShot(shot, object){
    shot.kill();
}

function pickObject2(player, object){
    object.destroy();
    candySound.play();
    objLeft--;
    hudObjects2.setText('Objects left: '+objLeft);

    if (objLeft==0){
        exit.kill();
        exit = game.add.sprite(60, 76, 'exitOpen');
        game.physics.arcade.enable(exit);
        exit.body.immovable = true;
        exit.anchor.setTo(0.5, 0.5);
        exit.x=800;
        exit.y=600;
        exit.smoothed= false;
        exit.scale.setTo(1.7, 1.7);
        exitSound.play();
        game.world.sendToBack(exit);
        game.world.sendToBack(fastTiles);
        game.world.sendToBack(slowTiles);
        game.world.sendToBack(tileNormal);
    }
}

function shotHitsEnemyLevel2(enemy, shot) {
    shot.kill();
    enemy.kill();
    displayBlast(enemy);
    zombieDeath.play();
    enemiesKilled++;
}

function timer2(){
    time2--;
    hudTime2.setText(setRemainingTime(time2));
    if (time2 == 0)
        lose(time2);
    game.time.events.add(Phaser.Timer.SECOND, timer2);
}

function damageSlime2(){
    if (!inmunity){  
        inmunity=true;
        dmgSound.play();
        lives--;
        hearts2[lives].kill();
        if (lives<=0)
            lose(time2);
        else{
            game.time.events.add(Phaser.Timer.SECOND*2, function() {inmunity=false; slimeTrain.alpha=1;});
            alpha=0.7;
            game.time.events.add(Phaser.Timer.SECOND*0.05, alphaVarDown);
        }
    }
}

