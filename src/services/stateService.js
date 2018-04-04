// # STATE
// STATE
// /funds/fundsPerBlock/experience/devLeft/blockNumber/registryPosition/
// 48 16 32 20 32 8        total 156/256
// /card/blockNumberUntilFinished/
// 10 * (6 + 18) project               total 240/256
// /card/numberOfCards/space/computeCaseSpaceLeft/rigSpaceLeft/mountSpaceLeft/powerLeft/devPointsCount/CoffeMiner
// 3 * 6 10 13 10 10 10 13 11 1 1    total 255/256 locations
// 3 * 6 10 13 10 10 10 13 11 1 1   total 255/256
// /cardType/numberOfCards/
// 10 6 karta

// MOVES
// /blockNumber/
// 32                total 32    
// /add/dynamic-static/cardSpecificBits/card/blockNumberOffset            
// n * 1 1 4 10 16        n * 32

const bigInt = require("big-integer");

// Example of the state used for testing packing moves
const state = {
        blockNumber: 2000000,
        moves: [{
            add: 1,
            dynamicStatic: 1,
            cardSpecificBits: 0,
            card: 0,
            blockNumberOffset: 0
        },
        {
            add: 1,
            dynamicStatic: 1,
            cardSpecificBits: 0,
            card: 36,
            blockNumberOffset: 1
        },
        {
            add: 1,
            dynamicStatic: 1,
            cardSpecificBits: 0,
            card: 54,
            blockNumberOffset: 2
        },
        {
            add: 1,
            dynamicStatic: 1,
            cardSpecificBits: 0,
            card: 150,
            blockNumberOffset: 500
        }]
};

// reads state as an array of uints in decimal format
// uints must be passed as string in an array
function readState(arr) {
    let bin = (new bigInt(arr[0], 10).toString(2));
    bin = bin.padStart(256, 0);

    let bin2 = (new bigInt(arr[1], 10).toString(2));
    bin2 = bin2.padStart(256, 0);

    let bin3 = (new bigInt(arr[2], 10).toString(2));
    bin3 = bin3.padStart(255, 0);

    let bin4 = (new bigInt(arr[3], 10).toString(2));
    bin4 = bin4.padStart(255, 0);

    const dynamicBins = [];

    const dynamic = arr.slice(4);

    for(let i = 0; i < dynamic.length; ++i) {
        let bin5 = (new bigInt(dynamic[i], 10).toString(2));
        
        bin5 = bin5.padStart(256, 0);
        
        dynamicBins.push(bin5);
    }

    const state = {};

    state.funds = bin2dec(bin.substr(0, 48));
    state.fundsPerBlock = bin2dec(bin.substr(48, 16));
    state.experience = bin2dec(bin.substr(64, 32));
    state.devLeft = bin2dec(bin.substr(96, 20));
    state.blockNum = bin2dec(bin.substr(116, 32));
    state.registryPosition = bin2dec(bin.substr(148, 8));

    state.projects = [];

    for(let i = 0; i < 10; ++i) {
        state.projects.push({
            card: bin2dec(bin2.substr(0 + (i*24), 6)),
            blockNumberUntilFinished: bin2dec(bin2.substr(6 + (i*24), 18))
        });
    }


    state.locations = [];

    state.locations.push(...readLocation(bin3));
    state.locations.push(...readLocation(bin4));

    state.dynamic = [];

    dynamicBins.forEach(d => {
        state.dynamic = readDynamic(d);
    });

    return state;
}

function readLocation(bin) {
    const locations = [];

    for(let i = 0; i < 3; ++i) {
        locations.push({
            card: bin2dec(bin.substr(0 + (i*85), 6)),
            numberOfCards:  bin2dec(bin.substr(6 + (i*85), 10)),
            space: bin2dec(bin.substr(16 + (i*85), 13)),
            computeCaseSpaceLeft: bin2dec(bin.substr(29 + (i*85), 10)),
            rigSpaceLeft: bin2dec(bin.substr(39 + (i*85), 10)),
            mountSpaceLeft: bin2dec(bin.substr(49 + (i*85), 10)),
            powerLeft: bin2dec(bin.substr(59 + (i*85), 13)),
            devPointsCount: bin2dec(bin.substr(72 + (i*85), 11)),
            gridConnector: bin2dec(bin.substr(83 + (i*85), 1)),
            coffeMiner: bin2dec(bin.substr(84 + (i*85), 1))
        });
    }

    return locations;
}

function readDynamic(bin) {
    const arr = [];

    for(let i = 0; i < bin.length/16; ++i) {
        const cardType = bin2dec(bin.substr(0 + (i*16), 10));
        const numberOfCards = bin2dec(bin.substr(10 + (i*16), 6));

        if (cardType != NaN && numberOfCards != NaN) {
            arr.push({cardType, numberOfCards});
        }
    }

    return arr;
}

function printState(_state) {
    for (var key in _state) {
        if (_state.hasOwnProperty(key)) {
            if (key === "projects") {
                console.log("Projects: ");
                _state[key].forEach(p => console.log(p));
            } else if(key === "locations") {
                console.log("Locations: ");
                _state[key].forEach(p => console.log(p));
            } else if(key === "dynamic") {
                console.log("Dynamic: ");
                _state[key].forEach(p => console.log(p));
            } else {
                console.log(key + " -> " + _state[key]);
            }
        }
    }
}

function packMoves(_state) {
    let blockNum = bin2Hex(dec2bin(_state.blockNumber, 32), 8);

    let binMoves = _state.moves.map(move => bin2Hex(dec2bin(move.add, 1) + dec2bin(move.dynamicStatic, 1) + dec2bin(move.cardSpecificBits, 4) + dec2bin(move.card, 10) + dec2bin(move.blockNumberOffset, 16)));  

    return _pack(binMoves, blockNum);
}

// helper functions
function _pack(arr, start) {
    const hexValues = [];
    let str = start;

    arr.forEach(b => {
        if ((str.length + b.length) < 64) {
            str += b;
        } else {
            hexValues.push(str);
            str = "";
        }
    });

    if (str.length !== 0) {
        hexValues.push(str);
    }

    if (hexValues[hexValues.length - 1].length < 64) {
        hexValues[hexValues.length - 1] += 'FFFFFFFF';
    }

    return hexValues.map(h => h.padEnd(64, 0));
}

const dec2bin = (d, l) => (d >>> 0).toString(2).padStart(l, '0');
const bin2dec = (bin) => parseInt(bin, 2);

const getBinary = (value, l) => dec2bin(value, l);
const toHex = (str) => '0x' + ((new bigInt(str.padStart(256, '0'), 2)).toString(16)).padStart(64, 0);
const toHexPadEnd = (str) => '0x' + ((new bigInt(str.padEnd(256, '0'), 2)).toString(16)).padEnd(64, 0);
const bin2Hex = (bin, l) => (new bigInt(bin, 2)).toString(16).padStart(l, 0);

// call the methods
console.log(packMoves(state));

//printState(readState(['6277101735386680764208986147815940821741181726117909757952', '0', '1770621562624077136751594888481572415259330284799763914617723870913757184', '0', '10180572787253050507058960199280696488197962213797316436696694931848075149312']));
