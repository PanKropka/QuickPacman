

var buttonPressed = false;
var blockSize = 20;
var maxColumn = 16;
var maxRow = 18;
var maxIndex = maxColumn * maxRow;
var board = new Array(maxIndex);
var block;
var pacman;
var prize;

var pacmanChar;

var DirectionEnum = {
    STOP: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3,
    LEFT: 4
}



var direction = DirectionEnum.STOP;

var boardSrc = [         1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                         1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
                         1,2,1,1,2,1,1,2,1,1,1,1,1,2,1,1,
                         1,2,1,1,2,1,1,2,1,1,1,1,2,2,2,1,
                         1,2,1,2,2,2,2,2,1,1,1,1,2,1,1,1,
                         1,2,2,2,1,1,1,2,1,2,1,1,2,2,2,1,
                         1,2,1,1,2,3,2,2,2,2,2,2,2,1,2,1,
                         1,2,1,1,1,1,1,1,2,1,1,1,1,1,2,1,
                         1,2,1,1,1,2,2,2,2,2,2,1,1,1,2,1,
                         1,2,2,2,2,2,1,1,1,1,2,1,1,1,2,1,
                         1,2,1,1,1,2,1,1,1,1,2,2,2,2,2,1,
                         1,2,1,1,1,2,1,1,1,1,2,1,1,1,2,1,
                         1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,1,
                         1,2,1,1,2,1,1,2,1,1,2,1,1,1,2,1,
                         1,2,1,1,2,1,1,2,1,1,2,2,1,1,2,1,
                         1,2,1,1,2,2,2,2,1,1,1,2,1,1,2,1,
                         1,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,
                         1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];
function index(column, row) {
    return column + (row * maxColumn);
}

function start(){
    console.log("start");

        //Delete blocks from previous game
        for (var i = 0; i < maxIndex; i++) {
            if (board[i] != null)
                board[i].destroy();
        }


        board = new Array(maxIndex);
        for (var column = 0; column < maxColumn; column++) {
            for (var row = 0; row < maxRow; row++) {

                    board[index(column, row)] = null;
                    createBlock(column, row);

            }
        }
}

function createBlock(column, row) {
    if (block == null){
            block = Qt.createComponent("Block.qml");
        }
    if (pacman == null){
            pacman = Qt.createComponent("Pacman.qml");
        }
    if (prize == null){
            prize = Qt.createComponent("Prize.qml");
        }


    var local;
    if(boardSrc[index(column, row)] === 3)
        local = pacman;
    else if(boardSrc[index(column, row)] ===2)
        local = prize;
    else
        local = block;

    if (local.status == Component.Ready) {
        var dynamicObject = local.createObject(screen);
        if (dynamicObject == null) {
            console.log("error creating block");
            console.log(local.errorString());
            return false;
        }
        dynamicObject.x = column * blockSize;
        dynamicObject.y = row * blockSize;
        dynamicObject.width = blockSize;
        dynamicObject.height = blockSize;
        if (boardSrc[index(column, row)] === 2){
            dynamicObject.width = 10;
            dynamicObject.height = 10;
            dynamicObject.x += 5;
            dynamicObject.y += 5;
         }
         if(boardSrc[index(column, row)] === 3){
             pacmanChar = dynamicObject;
             pacmanChar.finished.connect(pacmanAnimFinished);
         }
         else
            board[index(column, row)] = dynamicObject;
    } else {
        console.log("error loading block component");
        console.log(local.errorString());
        return false;
    }
    return true;
}



function navButtonPressed(dir) {
    if(buttonPressed)
        return;
    else
        buttonPressed = true;

    var prevDir = direction;

    switch(dir){
        case rightButton:
            checkCollision()
            direction = DirectionEnum.RIGHT;
            break;
        case leftButton:
            direction = DirectionEnum.LEFT;
            break;
        case upButton:
            direction = DirectionEnum.UP;
            break;
        case downButton:
            direction = DirectionEnum.DOWN;
            break;
    }
    if(!checkCollision(direction)){
     console.log("O tu")
        direction = prevDir;
    }
    movePacman();
}

function navButtonReleased(){
    buttonPressed = false;
}

function pacmanAnimFinished(){
    movePacman();
}

function movePacman(){

    console.log(pacmanChar.x+ " " +pacmanChar.y)

if(checkCollision(direction))
    pacmanChar.f(direction)

}

function checkCollision(dir){
    var moveToNext = true;
    var col = null;

    switch(dir){

        case DirectionEnum.STOP:
            console.log("stop");
            break;
        case DirectionEnum.UP:
            col = screen.childAt(pacmanChar.x+ 10, pacmanChar.y -10);
            if( col !== null && col.itemType === 1){
                direction = DirectionEnum.STOP
                moveToNext = false;
            }else if( col !== null && col.itemType === 3){
                col.destroy();
            }

            break;
        case DirectionEnum.DOWN:
            col = screen.childAt(pacmanChar.x+ 10, pacmanChar.y +30);
            if( col !== null && col.itemType === 1){
                direction = DirectionEnum.STOP
                moveToNext = false;
            }else if( col !== null && col.itemType === 3){
                col.destroy();
            }

            break;
        case DirectionEnum.LEFT:
            col = screen.childAt(pacmanChar.x- 10, pacmanChar.y +10);
            if( col !== null && col.itemType === 1){
                direction = DirectionEnum.STOP
                moveToNext = false;
            }else if( col !== null && col.itemType === 3){
                col.destroy();
            }

            break;
        case DirectionEnum.RIGHT:
            col = screen.childAt(pacmanChar.x+ 30, pacmanChar.y +10);
            if( col !== null && col.itemType === 1){
                direction = DirectionEnum.STOP
                moveToNext = false;
            }else if( col !== null && col.itemType === 3){
                col.destroy();
            }

            break;


    }
    return moveToNext;
}
