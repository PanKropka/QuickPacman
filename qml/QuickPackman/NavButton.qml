import QtQuick 2.0


Rectangle{
       id: button
       property string text: "NavButton"

       signal clicked
       signal released

        width: 75
        height: 75

                color: {
                    if(mArea.pressed)
                        return "yellow"
                    else
                        return "blue"
                }

        MouseArea {
            id: mArea
            anchors.fill: parent
            onClicked: {
                button.clicked();
            }
            onReleased: {
                button.released();
            }
        }


}
