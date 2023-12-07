const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
class Race {
    constructor(time, distance) {
        this.time = time
        this.distance = distance
    }
}
var times = input[0].split(" ").filter(a => a != "").slice(1).map(a => parseInt(a))
var distances = input[1].split(" ").filter(a => a != "").slice(1).map(a => parseInt(a))
var races = Array.from(Array(times.length)).map((_, i) => new Race(times[i], distances[i]))
var waysToBeatRace = []
for (var race of races) {
    for (var speed = 0; speed <= race.time; speed++) {
        if ((race.time - speed) * speed > race.distance) {
            waysToBeatRace.push(race.time - (speed * 2) + 1)
            break
        }
    }
}
console.log(waysToBeatRace.reduce((a, b) => a * b))
