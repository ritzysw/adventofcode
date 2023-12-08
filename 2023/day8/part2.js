const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
class Node {
    constructor(values) {
        this.left = values[2]
        this.right = values[3]
    }
}
function gcd2(a, b) {
    if (!b) return b === 0 ? a : NaN
    return gcd2(b, a % b)
}
function lcm2(a, b) {
    return a * b / gcd2(a, b)
}
function lcm(array) {
    var n = 1
    for(var i = 0; i < array.length; i++)
        n = lcm2(array[i], n)
    return n
}
var instructions = input[0]
var nodes = {}
for (var i = 0; i < input.length - 2; i++) {
    var nodeValues = input[i + 2].split(" ").map(a => a.replace("(", "").replace(")", "").replace(",", ""))
    nodes[nodeValues[0]] = new Node(nodeValues)
}
var currentNodes = []
for (var key of Object.keys(nodes))
    if (key.endsWith("A"))
        currentNodes.push(key)
function countSteps(current) {
    var steps = 0
    while (!current.endsWith("Z")) {
        for (var i = 0; i < instructions.length; i++) {
            var node = nodes[current]
            current = instructions[i] == "L" ? node.left : node.right
            steps++
        }
    }
    return steps
}
var steps = []
for (var node of currentNodes)
    steps.push(countSteps(node))
console.log(lcm(steps))
