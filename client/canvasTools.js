
class ToolSet {

     createSquare = (x, y, size, color) => {
        let square = {
            type: "square",
            xLoc: x,
            yLoc: y,
            size,
            color
        }

        return square;
    }

    createCircle = (x, y, radius, color) => {
        let circle = {
            type: "circle",
            xLoc: x,
            yLoc: y,
            size: radius,
            color
        }

        return circle;
    }

}

