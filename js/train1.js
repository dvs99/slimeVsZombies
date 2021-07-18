let slimeTrain;
let animSlimeTrain;
let rotateLeftTraining;
let rotateRightTraining;
let dashSlimeTraining;
let control; //0 ratón, 1 teclado
let holdDuration;
let buttonBackTraining;
const ROTATE_VELOCITY=5;
const DASH_VELOCITY=150;
const MAX_HOLD_DURATION=2000;
let end;

let trainState1 = {
    preload: preloadTrain1,
    create: createTrain1,
    update: updateTrain1
};

function preloadTrain1() {
    game.load.spritesheet('slimeMove','assets/imgs/SlimeMov.png',25,29,7);
    game.load.image('soilNormal','assets/imgs/DirtBlock.png');
    game.load.image('soilFast','assets/imgs/IceBlock.png');
    game.load.image('soilSlow','assets/imgs/MudBlock.png');
    game.load.image('buttonBack', 'assets/imgs/btnBack.png');

}

function createTrain1() {
    musicMenu.pause();
    if (!musicLevel.isPlaying) musicLevel.play();
    game.world.resize(1600, 1200);
    createBackground();
    createSlimeTrain();
    createButton();
    createKeyControlsTraining();
    end=false;

}

function createButton(){
    btnTraining = game.add.button( 60, 550, 'buttonBack', backTraining);
    btnTraining.fixedToCamera=true;
    btnTraining.scale.setTo(0.2,0.2);
    btnTraining.anchor.setTo(0.5,0.5);
    btnTraining.onInputOver.add(growT);
    btnTraining.onInputOut.add(smallerT);
}
function backTraining(){
    if (musicLevel.isPlaying)
        musicLevel.pause();
    game.state.start('init');
}

function growT(boton){
    boton.scale.setTo(0.25,0.25);
}

function smallerT(boton){
    boton.scale.setTo(0.2,0.2);
}

function createBackground(){
    tileNormal1= game.add.tileSprite(0,0,800,600,'soilNormal');
    tileNormal2= game.add.tileSprite(800,600,800,600,'soilNormal');
    tileFast= game.add.tileSprite(0,600,800,600,'soilFast');
    tileSlow= game.add.tileSprite(800,0,800,600,'soilSlow');
    game.physics.arcade.enable(tileFast);
    tileFast.body.immovable=true;
    tileFast.body.moves = false;
    game.physics.arcade.enable(tileSlow);

}

function createSlimeTrain(){
    slimeTrain = game.add.sprite(29, 26, 'slimeMove')
    game.physics.arcade.enable(slimeTrain);
    slimeTrain.body.collideWorldBounds = true;
    slimeTrain.x=400;
    slimeTrain.y=300;
    slimeTrain.anchor.setTo(0.5, 0.5);
    slimeTrain.smoothed= false;
    slimeTrain.scale.setTo(2, 2);
    animSLimeTrain = slimeTrain.animations.add('move');
}

function updateTrain1() {
    moveSlimeTraining();
    decreaseVelocity();
    moveCamera();
}

function moveCamera(){
    if (!end){
        game.camera.x=slimeTrain.x-400;
        game.camera.y=slimeTrain.y-300;}
}

function createKeyControlsTraining() {
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

function activateKeyboard(){
    control=1;
}

function deactivateKeyboard(){
    control=0;
}

function moveSlimeTraining(){
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

function decreaseVelocity(){
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

    if (game.physics.arcade.overlap(slimeTrain, tileFast)){
        slimeTrain.body.velocity.y*=1.009;
        slimeTrain.body.velocity.x*=1.009;
    }
    else if(slimeTrain.animations.frame==6){
        slimeTrain.body.velocity.y/=1.5;
        slimeTrain.body.velocity.x/=1.5;
    }

    if (game.physics.arcade.overlap(slimeTrain, tileSlow)){
        slimeTrain.body.velocity.y/=1.01;
        slimeTrain.body.velocity.x/=1.01;
    }

}