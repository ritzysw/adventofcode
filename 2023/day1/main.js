const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
const numbers = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
}
var sum = 0
input.forEach(value => {
    for (var key in numbers)
        value = value.replaceAll(key, key + numbers[key] + key)
    const digits = value.match(/[0-9]/g)
    sum += parseInt(digits[0] + digits[digits.length - 1])
})
console.log(sum)
