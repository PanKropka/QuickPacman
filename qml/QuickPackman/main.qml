import QtQuick 2.0

import "game.js" as Pacman
Rectangle {

    id: screen

    width: 320
    height: 558
    color: "black"

    Rectangle{
        anchors {
            left: parent.left;
            right: parent.right;
            bottom: screen.bottom;
        }
        height: 180;

        color: "red"

        NavButton{
            id: upButton
            anchors{
                   horizontalCenter: parent.horizontalCenter;
            }
            onClicked: Pacman.navButtonPressed(upButton);
            onReleased: Pacman.navButtonReleased();
        }

        NavButton{
            id: downButton
            anchors{
                horizontalCenter: parent.horizontalCenter;
                bottom: parent.bottom;

            }
            onClicked: Pacman.navButtonPressed(downButton);
               onReleased: Pacman.navButtonReleased();
        }
        NavButton{
            id: leftButton
            anchors{
                verticalCenter: parent.verticalCenter;
                left: parent.left;
                margins: {
                    left: 10;
                }
            }
            onClicked: Pacman.navButtonPressed(leftButton);
               onReleased: Pacman.navButtonReleased();
        }

        NavButton{
            id: rightButton
            anchors{
                  verticalCenter: parent.verticalCenter;
                  right: parent.right;
                  margins: {
                      right: 10;
                  }
            }
            onClicked: Pacman.navButtonPressed(rightButton);
               onReleased: Pacman.navButtonReleased();
        }

        Rectangle{
            anchors{
                bottom: parent.bottom
                left: parent.left
            }
            width:30
            height: 30
            color: "#028000"

            MouseArea{
                anchors.fill: parent;
                onClicked: Pacman.start();
            }
        }
        Text {
            id: score
            anchors {
                left: parent.left;
                top: parent.top;

            }
            text: "Score: "
        }



}

}
