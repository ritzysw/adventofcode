const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
class Node {
    constructor(values) {
        this.left = values[2]
        this.right = values[3]
    }
}
var instructions = input[0]
var steps = 0
var nodes = {}
for (var i = 0; i < input.length - 2; i++) {
    var nodeValues = input[i + 2].split(" ").map(a => a.replace("(", "").replace(")", "").replace(",", ""))
    nodes[nodeValues[0]] = new Node(nodeValues)
}
var currentNode = "AAA"
while (currentNode != "ZZZ") {
    for (var i = 0; i < instructions.length; i++) {
        var node = nodes[currentNode]
        if (currentNode == "ZZZ")
            break
        currentNode = instructions[i] == "L" ? node.left : node.right
        steps++
    } 
}

console.log(steps)
