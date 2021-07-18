let trainingState = {
    preload: preloadTraining,
    create: createTraining
};


function preloadTraining(){
    game.load.image('buttonTR1', 'assets/imgs/ButtonTrain1.png');
    game.load.image('buttonTR2', 'assets/imgs/ButtonTrain2.png');
    game.load.image('buttonBack', 'assets/imgs/btnBack.png');
}

function createTraining(){
    fondo1 = game.add.image(0, 0, 'fondo1');
    titulo = game.add.image(265, 20, 'titulo');
    titulo.scale.setTo(3,3);
    titulo.smoothed= false;

    btnTrain1 = game.add.button( 150, 300, 'buttonTR1', startTrain1);
    btnTrain1.scale.setTo(0.6,0.6);
    btnTrain1.anchor.setTo(0.5,0.5);
    btnTrain1.onInputOver.add(grow);
    btnTrain1.onInputOut.add(smaller);

    btnTrain2 = game.add.button( 650, 300, 'buttonTR2', startTrain2);
    btnTrain2.scale.setTo(0.6,0.6);
    btnTrain2.anchor.setTo(0.5,0.5);
    btnTrain2.onInputOver.add(grow);
    btnTrain2.onInputOut.add(smaller);
    createButtonAbout();
    createSlimeTrainInit();
    createZombieTrainInit1();
    createZombieTrainInit2();
}

function createSlimeTrainInit() {
    slime = game.add.button(29, 26, 'slimeJump', createSlimeBlastTrainInit);
    slime.x=350;
    slime.y=300;
    slime.smoothed= false;
    slime.scale.setTo(4, 4);
    animSLime = slime.animations.add('jump');
    slime.animations.play('jump',6,true);
}

function createSlimeBlastTrainInit(){
    xi=slime.x;
    yi=slime.y;
    slime.kill();
    slime = game.add.sprite(29, 26, 'slimeBlast')
    slime.x=xi-35;
    slime.y=yi-40;
    slime.scale.setTo(1.5, 1.5);
    animSLime = slime.animations.add('slimeBlast');
    slime.animations.play('slimeBlast',17,false);
    game.time.events.add(1500,createSlimeTrainInit, this);
    soundExpl.play();
}

function createZombieTrainInit1() {
    zombie1 = game.add.button(29, 26, 'zombie1', createZombieBlastTrainInit1);
    zombie1.x=275;
    zombie1.y=400;
    zombie1.smoothed= false;
    zombie1.scale.setTo(-4, 4);
    animZombie1 = zombie1.animations.add('animZombie1');
    zombie1.animations.play('animZombie1',6,true);
}

function createZombieBlastTrainInit1(){
    xi=zombie1.x;
    yi=zombie1.y;
    zombie1.kill();
    zombie1 = game.add.sprite(29, 26, 'zombieBlast')
    zombie1.x=120;
    zombie1.y=yi-40;
    zombie1.scale.setTo(1.5, 1.5);
    soundExpl.play();
    animZombie1 = zombie1.animations.add('zombieBlast');
    zombie1.animations.play('zombieBlast',17,false);
    game.time.events.add(1500,createZombieTrainInit1, this);
}

function createZombieTrainInit2() {
    zombie2 = game.add.button(29, 26, 'zombie1', createZombieBlastTrainInit2);
    zombie2.x=550;
    zombie2.y=400;
    zombie2.smoothed= false;
    zombie2.scale.setTo(4, 4);
    animZombie2 = zombie2.animations.add('animZombie2');
    zombie2.animations.play('animZombie2',6,true);
}

function createZombieBlastTrainInit2(){
    xi=zombie2.x;
    yi=zombie2.y;
    zombie2.kill();
    zombie2 = game.add.sprite(29, 26, 'zombieBlast')
    zombie2.x=xi-35;
    zombie2.y=yi-40;
    zombie2.scale.setTo(1.5, 1.5);
    soundExpl.play();
    animZombie2 = zombie2.animations.add('zombieBlast');
    zombie2.animations.play('zombieBlast',17,false);
    game.time.events.add(1500,createZombieTrainInit2, this);
}

function startTrain1() {
    game.state.start('train1');
}

function startTrain2() {
    game.state.start('train2');
}