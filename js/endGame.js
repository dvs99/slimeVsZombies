const ENDGAME_STYLE_DEFEAT={font: 'bold 30pt Pacifico', fontWeight: 'bold',
fill: 'red'};
const ENDGAME_STYLE_WIN={font: 'bold 30pt Pacifico', fontWeight: 'bold',
fill: '#e312e5'};
const ENDGAME_STYLE_REPLAY={font: 'bold 15pt Pacifico', fontWeight: 'bold',
fill: 'orange'};
let timeOver;
let btnBack;
let playAgain;
let GameOver;
let win;
let endSound;
let enemies;
let replay;

let endGameState = {
    preload: preloadEnd,
    create: createEnd,
    update: updateEnd
};


function preloadEnd() {
    game.world.resize(800, 600);
    game.load.image('end', 'assets/imgs/GameOver.png');
    game.load.image('win', 'assets/imgs/Victory.png');
    game.load.image('btnBack','assets/imgs/btnBack.png');
}

function createEnd() {
    musicLevel.pause();
    musicMenu.play();
    game.input.enabled = true;
    game.time.events.add(Phaser.Timer.SECOND*30,backToStart, this);
    if (access3 & victory3){
        win = game.add.image(0, 0, 'win');
        displayTimeLevel3(times, ENDGAME_STYLE_WIN);
        enemies = game.add.text(game.world.width/3, game.world.height / 1.2, 'Killed enemies: '+ enemiesKilled,
        ENDGAME_STYLE_WIN);
    }
    else if (access3){
        GameOver = game.add.image(0, 0, 'end');
        displayTimeLevel3(times, ENDGAME_STYLE_DEFEAT);
        enemies = game.add.text(game.world.width/3, game.world.height / 1.2, 'Killed enemies: '+ enemiesKilled,
        ENDGAME_STYLE_DEFEAT);
    }
    else if (access1 && !victory1){
        GameOver = game.add.image(0, 0, 'end');
        displayTime(times, ENDGAME_STYLE_DEFEAT);
    }
    else if (access1 && access2 && !victory2){
        GameOver = game.add.image(0, 0, 'end');
        displayTime(times, ENDGAME_STYLE_DEFEAT);
        enemies = game.add.text(game.world.width/3, game.world.height / 1.2, 'Killed enemies: '+ enemiesKilled,
        ENDGAME_STYLE_DEFEAT);
    }
    else if (access1 && access2 && victory2){
        win = game.add.image(0, 0, 'win');
        displayTime(time, ENDGAME_STYLE_WIN);
        enemies = game.add.text(game.world.width/3, game.world.height / 1.2, 'Killed enemies: '+ enemiesKilled,
        ENDGAME_STYLE_WIN);
    }
    else if (!access1 && access2 && victory2){
        GameOver = game.add.image(0, 0, 'win');
        displayTimeLevel2(times, ENDGAME_STYLE_WIN);
        enemies = game.add.text(game.world.width/3, game.world.height / 1.2, 'Killed enemies: '+ enemiesKilled,
        ENDGAME_STYLE_WIN);
    }
    else{
        GameOver = game.add.image(0, 0, 'end');
        displayTimeLevel2(times, ENDGAME_STYLE_DEFEAT);
        enemies = game.add.text(game.world.width/3, game.world.height / 1.2, 'Killed enemies: '+ enemiesKilled,
        ENDGAME_STYLE_DEFEAT); 
    }
    createButtonGameOver();
    replay=game.add.text(10, 520, 'Press "R"\n to play again', ENDGAME_STYLE_REPLAY);
    playAgain=game.input.keyboard.addKey(Phaser.Keyboard.R);
}

function createButtonGameOver(){
    btnBack= game.add.button(750, 550,'btnBack', backToStart); 
    btnBack.scale.setTo(0.4,0.4);
    btnBack.scale.setTo(0.2,0.2);
    btnBack.anchor.setTo(0.5,0.5);
    btnBack.onInputOver.add(growT);
    btnBack.onInputOut.add(smallerT);
}

function backToStart(){
    game.state.start('init');
}

function checkPlayAgain(){
    if (playAgain.justDown)
        if (!access3)
            game.state.start('level1');
    else
        game.state.start('level3');
}

function displayTime(array, style){
    let space=10;
    for (let i=0; i<times.length;i++){
        timeOver = game.add.text(game.world.width/4, 
            game.world.height / 1.6 + space, 'Time left level '+
            (i+1)+': '+ setRemainingTime(array[i]),
        style);
        space+=50;
    }
}

function displayTimeLevel2(array, style){
    let space=10;
    for (let i=0; i<times.length;i++){
        timeOver = game.add.text(game.world.width/4, 
            game.world.height / 1.6 + space, 'Time left level 2: '+ setRemainingTime(array[i]),
        style);
        space+=50;
    }
}

function displayTimeLevel3(array, style){
    let space=10;
    for (let i=0; i<times.length;i++){
        timeOver = game.add.text(game.world.width/4, 
            game.world.height / 1.6 + space, 'Time left level 3: '+ setRemainingTime(array[i]),
        style);
        space+=50;
    }
}

function updateEnd(){
    checkPlayAgain();
}