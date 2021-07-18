const TEXT_HOR = 30;
const TEXT_VER = 30;
let aboutState = {
    preload: preloadAbout,
    create: createAbout
};

function preloadAbout(){
    game.load.image('buttonBack', 'assets/imgs/btnBack.png');
}

function createAbout(){
    fondo1 = game.add.image(0, 0, 'fondo1');
    createText();
    createButtonAbout();
    createSlimeAbout();
}

function createButtonAbout(){
    btnBackAbout = game.add.button( 750, 550, 'buttonBack', backTraining);
    btnBackAbout.scale.setTo(0.2,0.2);
    btnBackAbout.anchor.setTo(0.5,0.5);
    btnBackAbout.onInputOver.add(growT);
    btnBackAbout.onInputOut.add(smallerT);
}

function createSlimeAbout() {
    slime = game.add.button(29, 26, 'slimeJump', createSlimeBlastAbout);
    slime.x=500;
    slime.y=450;
    slime.smoothed= false;
    slime.scale.setTo(-4, 4);
    animSLime = slime.animations.add('jump');
    slime.animations.play('jump',6,true);
}

function createSlimeBlastAbout(){
    xi=slime.x;
    yi=slime.y;
    slime.kill();
    slime = game.add.sprite(29, 26, 'slimeBlast')
    slime.x=xi-155;
    slime.y=yi-40;
    slime.scale.setTo(1.5, 1.5);
    animSLime = slime.animations.add('slimeBlast');
    slime.animations.play('slimeBlast',17,false);
    game.time.events.add(1500,createSlimeAbout, this);
    soundExpl.play();
}

function createText(){
    let creators1 = 'SIN NOMBRE';
    let style1 = {font:'30px Abril Fatface',fontWeight: 'bold', fill: '#FF3395'};
    game.add.text(TEXT_HOR, TEXT_VER+420, creators1, style1);

    let creators2 = 'Alexandra Moreno Díez \n';
    creators2 += 'Diego Villabrille Seca \n';
    creators2 += 'Cristian Cantos Roselló';
    let style2 = {font:'15px Baloo Da', fill:'#000000'};
    let creators_text2 = game.add.text(TEXT_HOR, TEXT_VER+460, creators2, style2);

    let instructions1 = 'INSTRUCTIONS';
    game.add.text(TEXT_HOR, TEXT_VER, instructions1, style1);

    let instructions2 = 'LEVEL 1 AND 2\nYou´ll have to get all the candies before the time runs out or you will get killed.\n';
    instructions2 += 'When you get the candies, you will have to go through the rainbow door that \n';
    instructions2 += 'takes you to the next level or to the final screen.\n';
    instructions2 += 'Objects that can hurt you are green and the ones which can´t hurt are pink. You \n';
    instructions2 += 'can shoot enemies with the left mouse button or with the space.\n';
    instructions2 += 'There are three ground types, the green ground makes you go slower, the ice \n';
    instructions2 += 'ground makes you go faster. The normal ground has no effect.\n'
    instructions2 += 'There are two power-ups, the shield (press X button to use it), which will protect \n';
    instructions2 += 'you from everything, and the hammer (press Z button to use it) that will hit the \n';
    instructions2 += 'ground and kill enemies that are nearby.\n\n';
    instructions2 += 'LEVEL 3\n';
    instructions2 += 'With the left and right arrow keys you move the character and with the up arrow\n';
    instructions2 += 'key make the character jump. Press space to shoot the enemies.\n';

    let instructions_text2 = game.add.text(TEXT_HOR, TEXT_VER+40, instructions2, style2);
}