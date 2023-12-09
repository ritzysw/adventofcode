const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
var sequences = []
for (var i = 0; i < input.length; i++) {
    var data = input[i].split(" ").map(a => parseInt(a))
    sequences.push([data])
    while (data.filter(b => b != 0).length > 0) {
        data = Array.from(Array(data.length)).map((_, i) => i >= 1 ? data[i] - data[i - 1] : _).slice(1)
        sequences[sequences.length - 1].push(data)
    }
}
console.log(sequences.map(b => b.map(c => c[c.length-1])).map(a => a.reduce((d, e) => d+e)).reduce((a, b) => a+b))
