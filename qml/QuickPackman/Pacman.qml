import QtQuick 2.0
import "helpers.js" as Helpers

Item {
    id: pacmanCharacter
    signal finished
    z :10

    Image {

        id: pacImg
        property int movementVal
        anchors.fill: parent
        source: "pacman.png"

                          NumberAnimation {
                              id: xAnim
                              target: pacmanCharacter;
                              property: "x";
                              from: pacmanCharacter.x;
                              to: pacmanCharacter.x + pacImg.movementVal;
                              duration: 750;
                              onStopped: {
                                    pacmanCharacter.finished();
                              }
                          }

                          NumberAnimation {
                              id: yAnim
                              target: pacmanCharacter;
                              property: "y";
                              from: pacmanCharacter.y;
                              to: pacmanCharacter.y + pacImg.movementVal;
                              duration: 750;
                              onStopped: {
                                    pacmanCharacter.finished();
                              }
                          }
    }


    function f(dir){

        if(xAnim.running || yAnim.running){

            console.log("spadam")
            return false;
        }
        else{
            if(dir === Helpers.DirectionEnum.RIGHT){
                pacImg.movementVal = 20;
                xAnim.start();
            }else if (dir === Helpers.DirectionEnum.LEFT){
                pacImg.movementVal = -20;
                console.log("ide we lewo")
                xAnim.start();
            }
            else if(dir === Helpers.DirectionEnum.DOWN){
                pacImg.movementVal = 20;
                yAnim.start();
            }else if (dir === Helpers.DirectionEnum.UP){
                pacImg.movementVal = -20;

                yAnim.start();
            }

            return true;
        }
    }
}
