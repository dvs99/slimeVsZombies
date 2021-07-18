//Note that most of the functions are shared with trainState1 and therefore not defined again in this file
let shots;
let shotBtn;
let animShot;
let shotSound;
let mutants;
let zombies;
let blasts;
let zombieDeath;
let mutantShots;
let countAngleSwitch=0;
const SHOTS_GROUP_SIZE=40;
const BLAST_GROUP_SIZE=20;
const MUTANTS_GROUP_SIZE=7;
const ZOMBIES_GROUP_SIZE=15;
const SWITCH_ANGLE_TIME =7;

let trainState2 = {
    preload: preloadTrain2,
    create: createTrain2,
    update: updateTrain2
};

function preloadTrain2() {
    game.load.spritesheet('slimeMove','assets/imgs/SlimeMov.png',25,29,7);
    game.load.image('soilNormal','assets/imgs/DirtBlock.png');
    game.load.image('soilFast','assets/imgs/IceBlock.png');
    game.load.image('soilSlow','assets/imgs/MudBlock.png');
    game.load.image('buttonBack', 'assets/imgs/btnBack.png');
    game.load.spritesheet('slimeMutant','assets/imgs/ZombieMutante.png',25,26,2);
    game.load.spritesheet('slimeZombie','assets/imgs/zombieNormal.png',25,26,2);
    game.load.spritesheet('slimeShot','assets/imgs/SlimeShot.png',10,11,8);
    game.load.spritesheet('mutantShot','assets/imgs/mutantShot.png',8,8,8);
    game.load.audio('shotSound', 'assets/sounds/shotSound.wav');
    game.load.audio('zombieDeath', 'assets/sounds/Explosion.wav');
    game.load.spritesheet( 'zombieBlast','assets/imgs/zombieBlast.png',128,128);

}

function createTrain2() {
    musicMenu.pause();
    if (!musicLevel.isPlaying) musicLevel.play();
    game.world.resize(1600, 1200);
    createBackground();
    createSlimeTrain();
    createKeyControlsTraining();
    shotBtn = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    createShots(SHOTS_GROUP_SIZE);
    createMutantShots(SHOTS_GROUP_SIZE);
    createSoundsTraining();
    createMutants(MUTANTS_GROUP_SIZE);
    createZombies(ZOMBIES_GROUP_SIZE)
    createButton();
    createBlasts(BLAST_GROUP_SIZE);
    end=false;
}

function createMutants(number){
    mutants = game.add.group();
    mutants.createMultiple(number, 'slimeMutant');
    mutants.callAll(
        'anchor.setTo', 'anchor', 0.5, 0.5);
    mutants.callAll(
        'scale.setTo', 'scale', 2, 2);
    mutants.forEach(placeMutant, this);
    mutants.forEach(function(mutant) {game.time.events.add(2500,mutantShot, mutant, this);}, this);

}

function createZombies(number){
    zombies = game.add.group();
    zombies.createMultiple(number, 'slimeZombie');
    zombies.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
    zombies.callAll('scale.setTo', 'scale', 2, 2);
    zombies.forEach(placeZombie, this);
}

function placeMutant(mutant){
    let done=false;
    while(!done){
        let x=Math.random()*1600;
        let y=Math.random()*1200;
        if (Phaser.Math.distance(slimeTrain.x, slimeTrain.y, x, y)>150){
            game.physics.arcade.enable(mutant)
            mutant.reset(x, y);
            mutant.body.immovable=true;
            mutant.animations.add('mutantIdle');
            mutant.animations.play('mutantIdle',4, true);
            done=true;
        }
    }
}

function placeZombie(zombie){
    let done=false;
    while(!done){
        let x=Math.random()*1600;
        let y=Math.random()*1200;
        if (Phaser.Math.distance(slimeTrain.x, slimeTrain.y, x, y)>150){
            game.physics.arcade.enable(zombie)
            zombie.reset(x, y);
            zombie.body.immovable=true;
            zombie.animations.add('slimeZombie');
            zombie.animations.play('slimeZombie',4, true);
            done=true;
        }
    }
}


function createShots(number){
    shots=game.add.group();
    shots.enableBody=true;
    shots.createMultiple(number,'slimeShot');
    shots.callAll('scale.setTo','scale',2,2);
    shots.callAll('events.onOutOfBounds.add','events.onOutOfBounds', resetMember);
    shots.callAll('anchor.setTo','anchor',0.5,0.5);
    shots.setAll('checkWorldBounds', true);
}

function createMutantShots(number){
    mutantShots=game.add.group();
    mutantShots.enableBody=true;
    mutantShots.createMultiple(number,'mutantShot');
    mutantShots.callAll('scale.setTo','scale',2,2);
    mutantShots.callAll('events.onOutOfBounds.add','events.onOutOfBounds', resetMember);
    mutantShots.callAll('anchor.setTo','anchor',0.5,0.5);
    mutantShots.setAll('checkWorldBounds', true);
}

function createBlasts(number) {
    blasts = game.add.group();
    blasts.createMultiple(number, 'zombieBlast');
    blasts.forEach(setupBlast, this);
}

function setupBlast(blast) {
    blast.anchor.x = 0.5;
    blast.anchor.y = 0.5;
    blast.animations.add('zombieBlast');
}

function createSoundsTraining(){
    shotSound = game.add.audio('shotSound');
    zombieDeath = game.add.audio('zombieDeath');

}

function updateTrain2() {
    moveSlimeTraining();
    decreaseVelocity();
    moveCamera();
    manageShots();
    game.physics.arcade.collide(mutants, slimeTrain);
    game.physics.arcade.collide(slimeTrain, zombie);
    game.physics.arcade.overlap(mutants,shots,shotHitsEnemy,null,this);
    game.physics.arcade.overlap(slimeTrain,mutantShots,shotHitsPlayer,null,this);
    game.physics.arcade.overlap(zombies,shots,shotHitsEnemy,null,this);
    mutants.forEach(manageMutant, this);
    manageZombies();

}

function manageZombies(){
    countAngleSwitch++;
    zombies.forEach(manageZombie, this);
    if (countAngleSwitch==SWITCH_ANGLE_TIME)
        countAngleSwitch=0;
}

function shotHitsPlayer(player, shot) {
    shot.kill();

}

function shotHitsEnemy(enemy, shot) {
    shot.kill();
    enemy.kill();
    displayBlast(enemy);
    zombieDeath.play();
}

function displayBlast(enemy) {
    let blast = blasts.getFirstExists(false);
    let x = enemy.x;
    let y = enemy.y;
    blast.reset(x, y);
    blast.play('zombieBlast', 30, false, true);
}

function manageMutant(mutant){
    if (Phaser.Math.distance(slimeTrain.x, slimeTrain.y, mutant.x, mutant.y)<400 && mutant.alive){
        mutant.angle=Phaser.Math.angleBetween(mutant.x,mutant.y,slimeTrain.x, slimeTrain.y)*180/Math.PI+90;
    }
}

function manageZombie(zombie){
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

function mutantShot(mutant){
    if (Phaser.Math.distance(slimeTrain.x, slimeTrain.y, mutant.x, mutant.y)<400 && mutant.alive){
        let dx = Math.cos((mutant.angle-90)*Math.PI/180);
        let dy = Math.sin((mutant.angle-90)*Math.PI/180);
        shoot(mutant.x+dx+25*dx,mutant.y+dy+25*dy, dx*200, dy*200, 'mutantShot', mutantShots, mutant.angle);
    }
    game.time.events.add(2500,mutantShot, mutant, this);
}


function manageShots(){
    if ((shotBtn.justDown && control==1)|| game.input.mousePointer.leftButton.justPressed(30)){
        let dx = Math.cos((slimeTrain.angle-90)*Math.PI/180);
        let dy = Math.sin((slimeTrain.angle-90)*Math.PI/180);
        let s= shoot(slimeTrain.x+dx+25*dx,slimeTrain.y+dy+25*dy, dx*400, dy*400, 'slimeShot',shots, slimeTrain.angle);
        if(s)
            shotSound.play();
    }
}

function shoot(x, y, vx, vy, anim, group, angle){
    let shot = group.getFirstExists(false);
    if(shot){
        shot.reset(x, y);
        shot.body.velocity.y=vy;
        shot.body.velocity.x=vx;
        shot.angle=angle;
        animShot = shot.animations.add(anim);
        shot.animations.play(anim, 10, true);
    }
    return shot;
}

function resetMember(item){
    item.kill();
}
