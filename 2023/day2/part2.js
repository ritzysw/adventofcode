const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
var sum = 0
input.forEach(game => {
    var red = game.match(/\d+ red/g).map(a => parseInt(a.replace(" red", ""))).sort((a, b) => a < b ? 1 : -1)[0]
    var blue = game.match(/\d+ blue/g).map(a => parseInt(a.replace(" blue", ""))).sort((a, b) => a < b ? 1 : -1)[0]
    var green = game.match(/\d+ green/g).map(a => parseInt(a.replace(" green", ""))).sort((a, b) => a < b ? 1 : -1)[0]
    sum += red * blue * green
})
console.log(sum)
