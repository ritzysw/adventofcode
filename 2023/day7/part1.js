const fs = require('fs')
const input = fs.readFileSync("input.txt").toString().split("\n").map(play => play.split(" "))
const CardStrength = {
    "A": 13,
    "K": 12,
    "Q": 11,
    "J": 10,
    "T": 9,
    "9": 8,
    "8": 7,
    "7": 6,
    "6": 5,
    "5": 4,
    "4": 3,
    "3": 2,
    "2": 1
}
const HandTypes = {
    FIVE: 0,
    FOUR: 1,
    FULL_HOUSE: 2,
    THREE: 3,
    TWO: 4,
    ONE: 5,
    HIGH: 6
}

function compareHands(hand1, hand2) {
    for (var i = 0; i < 5; i++) {
        var strength1 = CardStrength[hand1.hand[i]]
        var strength2 = CardStrength[hand2.hand[i]]
        if (strength1 == strength2) {
            continue
        }
        return strength1 > strength2
    }
}

class Hand {
    constructor(hand, bet) {
        this.hand = hand
        this.bet = bet
        var instances = {}
        hand.split("").forEach(a => instances[a] = (instances[a] || 0) + 1)
        var sortedInstances = []
        for (var a in instances)
            sortedInstances.push([a, instances[a]])
        sortedInstances.sort((a, b) => b[1] - a[1])
        if (sortedInstances[0][1] == 5) {
            this.type = HandTypes.FIVE
        } else if (sortedInstances[0][1] == 4) {
            this.type = HandTypes.FOUR
        } else if (sortedInstances[0][1] == 3 && sortedInstances.length == 2) {
            this.type = HandTypes.FULL_HOUSE
        } else if (sortedInstances[0][1] == 3 && sortedInstances.length == 3) {
            this.type = HandTypes.THREE
        } else if (sortedInstances.length == 3 && sortedInstances[0][1] == 2 && sortedInstances[1][1] == 2) {
            this.type = HandTypes.TWO
        } else if (sortedInstances.length == 4 && sortedInstances[0][1] == 2 && sortedInstances[1][1] == 1) {
            this.type = HandTypes.ONE
        } else if (sortedInstances.length == 5 && sortedInstances[0][1] == 1) {
            this.type = HandTypes.HIGH
        }
        this.rank = -1
    }
}

var hands = []

input.forEach(play => {
    var hand = new Hand(play[0], parseInt(play[1]))
    hands.push(hand)
})
hands = hands.sort((a, b) => a.type > b.type ? -1 : 1)
var rank = 1
function getHandIndex(hand) {
    for (var i = 0; i < hands.length; i++) {
        if (hands[i].hand == hand.hand) {
            return i
        }
    }
    return -1
}
var winnings = 0
for (var i = 0; i < hands.length; i++) {
    var hand = hands[i]
    var sameTypeHands = []
    sameTypeHands.push(hand)
    for (var a of hands) {
        if (a.type == hand.type && a != hand) {
            sameTypeHands.push(a)
        }
    }
    if (sameTypeHands.length == 1) {
        hands[i].rank = rank++
    } else {
        if (sameTypeHands.length > 1) {
            sameTypeHands = sameTypeHands.sort((a, b) => {
                if (compareHands(a, b))
                    return 1
                return -1
            })
            for (var j = 0; j < sameTypeHands.length - 1; j++) {
                var hand1 = hands[getHandIndex(sameTypeHands[j])]
                var hand2 = hands[getHandIndex(sameTypeHands[j+1])]
                if (hand1.rank == -1)
                    hand1.rank = rank++
                if (hand2.rank == -1)
                    hand2.rank = rank++
            }
        }
    }
}
for (var hand of hands) {
    winnings += hand.bet * hand.rank
}
console.log(winnings)
