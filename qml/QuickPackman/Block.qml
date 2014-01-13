import QtQuick 2.0

Item {
    id: block

    property int itemType: 1
    Image {
        id: img
        anchors.fill: parent
        source: "block.png"
    }
}
