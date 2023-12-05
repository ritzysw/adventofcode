const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
const symbols = "@#$%&*-+=/"
const mapDimensions = 140
var sum = 0
for(var j = 0; j < input.length; j++) {
    var line = input[j]
    for (var i = 0; i < line.length; i++) {
        var char = line[i]
        if (!isNaN(char)) {
            var hasSymbols = false
            for (var x = -1; x < 2; x++) {
                for (var y = -1; y < 2; y++) {
                    if (j + x < 0 || j + x >= mapDimensions || i + y < 0 || i + y >= mapDimensions)
                        continue
                    var neighbor = input[j + x][i + y].toString()
                    for (var symbol of symbols)
                        if (neighbor.includes(symbol))
                            hasSymbols = true
                }
            }
            if (hasSymbols) {
                while (!isNaN(char)) {
                    i--
                    char = line[i]
                }
                i++
                char = line[i]
                var number = ""
                while (!isNaN(char)) {
                    number += char
                    i++
                    char = line[i]
                }
                if (number.length)
                    sum += parseInt(number)
            }
        }
    }
}
console.log(sum)
