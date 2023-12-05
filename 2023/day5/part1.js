const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n")
var locations = []
class MapValue {
    constructor(values) {
        this.destination_start = values[0]
        this.sources_start = values[1]
        this.range_length = values[2]
    }
    inSourceRange = (value) => {
        return value >= this.sources_start && value < (this.sources_start + this.range_length)
    }
    convert = (value) => {
        if (this.inSourceRange(value)) {
            return this.destination_start + (value - this.sources_start)
        }
        return false
    }
}
var seeds = input[0].substr(input[0].indexOf(": ") + 2).split(" ").map(seed => parseInt(seed))
var seedToSoilMap = input.filter((_, index) => index > input.indexOf("seed-to-soil map:") && index < input.indexOf("soil-to-fertilizer map:")).map(a => new MapValue(a.split(" ").map(val => parseInt(val))))
var soilToFertilizerMap = input.filter((_, index) => index > input.indexOf("soil-to-fertilizer map:") && index < input.indexOf("fertilizer-to-water map:")).map(a => new MapValue(a.split(" ").map(val => parseInt(val))))
var fertilizerToWaterMap = input.filter((_, index) => index > input.indexOf("fertilizer-to-water map:") && index < input.indexOf("water-to-light map:")).map(a => new MapValue(a.split(" ").map(val => parseInt(val))))
var waterToLightMap = input.filter((_, index) => index > input.indexOf("water-to-light map:") && index < input.indexOf("light-to-temperature map:")).map(a => new MapValue(a.split(" ").map(val => parseInt(val))))
var lightToTemperatureMap = input.filter((_, index) => index > input.indexOf("light-to-temperature map:") && index < input.indexOf("temperature-to-humidity map:")).map(a => new MapValue(a.split(" ").map(val => parseInt(val))))
var temperatureToHumidityMap = input.filter((_, index) => index > input.indexOf("temperature-to-humidity map:") && index < input.indexOf("humidity-to-location map:")).map(a => new MapValue(a.split(" ").map(val => parseInt(val))))
var humidityToLocationMap = input.filter((_, index) => index > input.indexOf("humidity-to-location map:")).map(a => new MapValue(a.split(" ").map(val => parseInt(val))))
function seedToSoil(orig) {
    for (var val of seedToSoilMap) {
        var result = val.convert(orig)
        if (result !== false) {
            return result
        }
    }
    return orig
}
function soilToFertilizer(orig) {
    for (var val of soilToFertilizerMap) {
        var result = val.convert(orig)
        if (result !== false) {
            return result
        }
    }
    return orig
}
function fertilizerToWater(orig) {
    for (var val of fertilizerToWaterMap) {
        var result = val.convert(orig)
        if (result !== false) {
            return result
        }
    }
    return orig
}
function waterToLight(orig) {
    for (var val of waterToLightMap) {
        var result = val.convert(orig)
        if (result !== false) {
            return result
        }
    }
    return orig
}
function lightToTemperature(orig) {
    for (var val of lightToTemperatureMap) {
        var result = val.convert(orig)
        if (result !== false) {
            return result
        }
    }
    return orig
}
function temperatureToHumidity(orig) {
    for (var val of temperatureToHumidityMap) {
        var result = val.convert(orig)
        if (result !== false) {
            return result
        }
    }
    return orig
}
function humidityToLocation(orig) {
    for (var val of humidityToLocationMap) {
        var result = val.convert(orig)
        if (result !== false) {
            return result
        }
    }
    return orig
}
function seedToLocation(seed) {
    return humidityToLocation(temperatureToHumidity(lightToTemperature(waterToLight(fertilizerToWater(soilToFertilizer(seedToSoil(seed)))))))
}
for (var seed of seeds) {
    console.log(`seed ${seed} corresponds to location ${seedToLocation(seed)}`)
    locations.push(seedToLocation(seed))
}
console.log(locations.sort((a, b) => a > b ? 1 : -1)[0])
