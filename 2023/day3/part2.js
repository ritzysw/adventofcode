const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
const symbols = "@#$%&*-+=/"
const mapDimensions = 140
var sum = 0

function getFullNumber(x, y) {
    var char = input[x][y]
    while (!isNaN(char)) {
        y--
        char = input[x][y]
    }
    y++
    char = input[x][y]
    var number = ""
    while (!isNaN(char)) {
        number += char
        y++
        char = input[x][y]
    }
    if (number.length)
        return parseInt(number)
}
for (var i = 0; i < input.length; i++) {
    var line = input[i]
    for (var j = 0; j < line.length; j++) {
        var char = line[j]
        if (char == "*") {
            var surroundingNumbers = []
            for (var x = -1; x < 2; x++) {
                for (var y = -1; y < 2; y++) {
                    if (i + x < 0 || i + x >= mapDimensions || j + y < 0 || j + y >= mapDimensions)
                        continue
                    var neighbor = input[i + x][j + y].toString()
                    if (!isNaN(neighbor)) {
                        surroundingNumbers.push(getFullNumber(i + x, j + y))
                        continue
                    }
                }
            }
            surroundingNumbers = [...new Set(surroundingNumbers)]
            if (surroundingNumbers.length == 2) {
                sum += surroundingNumbers[0] * surroundingNumbers[1]
            }
        }
    }
}
console.log(sum)
