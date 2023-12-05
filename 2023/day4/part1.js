const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
var sum = 0
for (var line of input) {
    var points = 0
    var allNumbers = line.substr(line.indexOf(": ") + 2).split(" ").filter(num => num != "")
    var winningNumbers = []
    var myNumbers = []
    for (var i of allNumbers) {
        if (i == "|") break
        winningNumbers.push(parseInt(i))
    }
    for (var i = allNumbers.indexOf("|") + 1; i < allNumbers.length; i++)
        myNumbers.push(parseInt(allNumbers[i]))
    for (var number of winningNumbers)
        if (myNumbers.includes(number))
        	points = (points == 0 ? 1 : points * 2)
    sum += points
}
console.log(sum)
