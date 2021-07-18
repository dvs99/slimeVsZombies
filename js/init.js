let btnLevels;
let btnAbout;
let btnTraining;
let slime;
let zombie;
let animSLime;
let animZombie;
let fondo1;
let soundExpl;

let initState = {
    preload: preloadInit,
    create: createInit
};

function preloadInit () {
    game.load.image('button1', 'assets/imgs/boton1.png');
    game.load.image('button2', 'assets/imgs/boton2.png');
    game.load.image('button3', 'assets/imgs/boton3.png');
    game.load.image('fondo1', 'assets/imgs/fondo2.png');
    game.load.image('titulo', 'assets/imgs/titulo.png');
    game.load.spritesheet( 'slimeJump','assets/imgs/Slime1.png',29,26,11);
    game.load.spritesheet( 'zombie1','assets/imgs/Zombie1.png',29,26, 6);
    game.load.spritesheet( 'slimeBlast','assets/imgs/slimeBlast.png',128,128);
    game.load.spritesheet( 'zombieBlast','assets/imgs/zombieBlast.png',128,128);
    game.load.audio('sndExplosion', 'assets/sounds/Explosion.wav');
    game.load.audio('musicMenu', 'assets/sounds/MenuMusic.wav');
    game.load.audio('musicPlay', 'assets/sounds/MusicLevel.wav');
}

function createInit() {
    fondo1 = game.add.image(0, 0, 'fondo1');
    titulo = game.add.image(265, 20, 'titulo');
    titulo.scale.setTo(3,3);
    titulo.smoothed= false;
    btnTraining = game.add.button( 650, 300, 'button3', startTraining);
    btnTraining.scale.setTo(0.6,0.6);
    btnTraining.anchor.setTo(0.5,0.5);
    btnTraining.onInputOver.add(grow);
    btnTraining.onInputOut.add(smaller);

    btnAbout = game.add.button( 150, 300, 'button2', startAbout);
    btnAbout.scale.setTo(0.6,0.6);
    btnAbout.anchor.setTo(0.5,0.5);
    btnAbout.onInputOver.add(grow);
    btnAbout.onInputOut.add(smaller);

    btnLevels = game.add.button( 400, 400, 'button1', startPlay);
    btnLevels.scale.setTo(0.6,0.6);
    btnLevels.anchor.setTo(0.5,0.5);
    btnLevels.onInputOver.add(grow);
    btnLevels.onInputOut.add(smaller);
    createSlime();
    createZombie();
    createSounds();
    if (!musicMenu.isPlaying)
        musicMenu.play();
}

function createSounds(){
    soundExpl = game.add.audio('sndExplosion');
    if (musicMenu == null)
        musicMenu = game.add.audio('musicMenu', 0.4, 1, true);
    if (musicLevel == null)
        musicLevel = game.add.audio('musicPlay', 0.35, 1, true);
}

function grow(boton){
    boton.scale.setTo(0.7,0.7);
}

function smaller(boton){
    boton.scale.setTo(0.6,0.6);
}

function createSlime() {
    slime = game.add.button(29, 26, 'slimeJump', createSlimeBlast);
    slime.x=125;
    slime.y=400;
    slime.smoothed= false;
    slime.scale.setTo(4, 4);
    animSLime = slime.animations.add('jump');
    slime.animations.play('jump',6,true);
}

function createSlimeBlast(){
    xi=slime.x;
    yi=slime.y;
    slime.kill();
    slime = game.add.sprite(29, 26, 'slimeBlast')
    slime.x=xi-35;
    slime.y=yi-40;
    slime.scale.setTo(1.5, 1.5);
    animSLime = slime.animations.add('slimeBlast');
    slime.animations.play('slimeBlast',17,false);
    game.time.events.add(1500,createSlime, this);
    soundExpl.play();
}

function createZombie() {
    zombie = game.add.button(29, 26, 'zombie1', createZombieBlast);
    zombie.x=560;
    zombie.y=400;
    zombie.smoothed= false;
    zombie.scale.setTo(4, 4);
    animZombie = zombie.animations.add('animZombie');
    zombie.animations.play('animZombie',6,true);
}

function createZombieBlast(){
    xi=zombie.x;
    yi=zombie.y;
    zombie.kill();
    zombie = game.add.sprite(29, 26, 'zombieBlast')
    zombie.x=xi-35;
    zombie.y=yi-40;
    zombie.scale.setTo(1.5, 1.5);
    soundExpl.play();
    animZombie = zombie.animations.add('zombieBlast');
    zombie.animations.play('zombieBlast',17,false);
    game.time.events.add(1500,createZombie, this);
}

function startPlay() {
    game.state.start('levels');
}

function startAbout() {
    game.state.start('about');
}

function startTraining() {
    game.state.start('training');
}