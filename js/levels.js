let times;
let access1;
let access2;
let access3;
let victory1;
let victory2;
let victory3;

let levelsState = {
    preload: preloadLevels,
    create: createLevels
};

function preloadLevels(){
    game.load.image('buttonLV1', 'assets/imgs/ButtonLevel1.png');
    game.load.image('buttonLV2', 'assets/imgs/ButtonLevel2.png');
    game.load.image('buttonLV3', 'assets/imgs/ButtonLevel3.png');
    game.load.image('buttonBack', 'assets/imgs/btnBack.png');
}

function createLevels(){
    fondo1 = game.add.image(0, 0, 'fondo1');
    titulo = game.add.image(265, 20, 'titulo');
    titulo.scale.setTo(3,3);
    titulo.smoothed= false;
    times=[];
    access1=false;
    access2=false;
    access3=false;
    victory1=false;
    victory2=false;
    victory3=false;
    createbtnLevel1();
    createbtnLevel2();
    createbtnLevel3();
    createButtonAbout();
    createSlimeLevelInit();
    createZombieTrainInit1();
    createZombieTrainInit2();
    
}

function createbtnLevel1(){
    btnLevel1 = game.add.button( 150, 300, 'buttonLV1', startLevel1);
    btnLevel1.scale.setTo(0.6,0.6);
    btnLevel1.anchor.setTo(0.5,0.5);
    btnLevel1.onInputOver.add(grow);
    btnLevel1.onInputOut.add(smaller);

}

function createbtnLevel2(){
    btnLevel2 = game.add.button( 400, 300, 'buttonLV2', startLevel2);
    btnLevel2.scale.setTo(0.6,0.6);
    btnLevel2.anchor.setTo(0.5,0.5);
    btnLevel2.onInputOver.add(grow);
    btnLevel2.onInputOut.add(smaller);
}

function createbtnLevel3(){
    btnLevel1 = game.add.button( 650, 300, 'buttonLV3', startLevel3);
    btnLevel1.scale.setTo(0.6,0.6);
    btnLevel1.anchor.setTo(0.5,0.5);
    btnLevel1.onInputOver.add(grow);
    btnLevel1.onInputOut.add(smaller);
}

function createSlimeLevelInit() {
    slime = game.add.button(29, 26, 'slimeJump', createSlimeBlastLevelInit);
    slime.x=350;
    slime.y=400;
    slime.smoothed= false;
    slime.scale.setTo(4, 4);
    animSLime = slime.animations.add('jump');
    slime.animations.play('jump',6,true);
}

function createSlimeBlastLevelInit(){
    xi=slime.x;
    yi=slime.y;
    slime.kill();
    slime = game.add.sprite(29, 26, 'slimeBlast')
    slime.x=xi-35;
    slime.y=yi-40;
    slime.scale.setTo(1.5, 1.5);
    animSLime = slime.animations.add('slimeBlast');
    slime.animations.play('slimeBlast',17,false);
    game.time.events.add(1500,createSlimeLevelInit, this);
    soundExpl.play();
}

function startLevel1() {
    game.state.start('level1');
}

function startLevel2() {
    game.state.start('level2');
}

function startLevel3() {
    game.state.start('level3');
}