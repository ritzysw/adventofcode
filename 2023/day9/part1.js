const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
var sequences = []
var currentSequence = []

function isAllZeroes(sequence) {
    var set = [...new Set(sequence)]
    return set.length == 1 && set[0] == 0
}
var sum = 0
for (var sequence of input) {
    currentSequence = sequence.split(" ").map(a => parseInt(a))
    sequences.push([currentSequence])
    while (!isAllZeroes(currentSequence)) {
        currentSequence = currentSequence.map(a => parseInt(a))
        var newSequence = []
        for (var i = 1; i < currentSequence.length; i++) {
            var history = currentSequence[i]
            var previousHistory = currentSequence[i - 1]
            var change = history - previousHistory
            newSequence.push(change)
        }
        sequences[sequences.length - 1].push(newSequence)
        currentSequence = newSequence
    }
    for (var j = sequences[0].length - 1; j >= 0; j--) {
        if (j == sequences[0].length - 1) {
            sequences[0][j].push(0)
        }
        var nextSequence = sequences[0][j - 1] || null
        if (nextSequence != null) {
            var index = nextSequence.length - 1
            var valueToAddTo = nextSequence[index]
            sequences[0][j - 1].push(sequences[0][j][index] + valueToAddTo)
        }
    }
    var lastSequence = sequences[0][0]
    var lastHistory = lastSequence[lastSequence.length - 1]
    sequences.splice(0, 1)
    sum += lastHistory
}
console.log(sum)
