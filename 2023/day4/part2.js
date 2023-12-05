const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
var allCards = []
function process(index) {
    if (index >= input.length) {
        return
    }
    var card = input[index]
    var matchingNumbers = 0
    var allNumbers = card.substr(card.indexOf(": ") + 2).split(" ").filter(num => num != "")
    var winningNumbers = []
    var myNumbers = []
    for (var i of allNumbers) {
        if (i == "|") break
        winningNumbers.push(parseInt(i))
    }
    for (var i = allNumbers.indexOf("|") + 1; i < allNumbers.length; i++) {
        myNumbers.push(parseInt(allNumbers[i]))
    }
    for (var number of winningNumbers)
        if (myNumbers.includes(number))
            matchingNumbers++
    for (var i = 1; i <= matchingNumbers; i++) {
        if (index + i >= input.length) {
            continue
        }
        allCards.push(index+i+1)
        process(index+i)
    }
}
for (var i = 0; i < input.length; i++) {
    allCards.push(i+1)
    process(i)
}
console.log(allCards.length)
