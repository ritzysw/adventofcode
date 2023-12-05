const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
var sum = 0
input.forEach(game => {
    var possible = true
    var gameID = parseInt(game.match(/Game \d+/)[0].replace("Game ", ""))
    game.match(/\d+ red/g).forEach(val => {
        if (parseInt(val.replace(" red", "")) > 12)
            possible = false
    })
    game.match(/\d+ green/g).forEach(val => {
        if (parseInt(val.replace(" green", "")) > 13)
            possible = false
    })
    game.match(/\d+ blue/g).forEach(val => {
        if (parseInt(val.replace(" blue", "")) > 14)
            possible = false
    })
    if (possible) {
        sum += gameID
    }
})
console.log(sum)
