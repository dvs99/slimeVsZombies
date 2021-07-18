const GAME_STAGE_WIDTH = 800;
const GAME_STAGE_HEIGHT = 600;
let musicMenu = null;
let musicLevel = null;


let game = new Phaser.Game(GAME_STAGE_WIDTH, GAME_STAGE_HEIGHT, Phaser.CANVAS, 'gamestage');

// Entry point
window.onload = startGame;

let wfConfig = {
    google: { families: [ 'Pacifico', 'Lobster','Abril Fatface','Baloo Da' ]
    }
};

WebFont.load(wfConfig);

function startGame() {
    game.canvas.oncontextmenu=function(e){e.preventDefault();};
    game.state.add('init', initState);
    game.state.add('about', aboutState);
    game.state.add('training', trainingState);
    game.state.add('train1', trainState1);
    game.state.add('train2',trainState2);
    game.state.add('levels', levelsState);
    game.state.add('level1', level1State);
    game.state.add('level2',level2State);
    game.state.add('level3',level3State);
    game.state.add('endGame', endGameState);
    game.state.start('init');
}
