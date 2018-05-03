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
// 1/0 add/remove
// 1 specific card (for GPU)
// 3 location
// 3 level
// 7 containerPosition
// 11 cardType
// 16 blockNumber

import BigInt from 'big-integer';

const dec2bin = (d, l) => (d >>> 0).toString(2).padStart(l, '0'); //eslint-disable-line
const bin2dec = bin => parseInt(bin, 2);

const getBinary = (value, l) => dec2bin(value, l);
const toHex = str => `0x + ${((new BigInt(str.padStart(256, '0'), 2)).toString(16)).padStart(64, 0)}`;
const toHexPadEnd = str => `0x + ${((new BigInt(str.padEnd(256, '0'), 2)).toString(16)).padEnd(64, 0)}`;
const bin2Hex = (bin, l) => (new BigInt(bin, 2)).toString(16).padStart(l, 0);

function readDynamic(bin) {
  const arr = [];

  for (let i = 0; i < bin.length / 16; i += 1) {
    const cardType = bin2dec(bin.substr(0 + (i * 16), 10));
    const numberOfCards = bin2dec(bin.substr(10 + (i * 16), 6));

    if (!Number.isNaN(cardType) && !Number.isNaN(numberOfCards)) {
      arr.push({ cardType, numberOfCards });
    }
  }

  return arr;
}

function readLocation(bin) {
  const locations = [];

  for (let i = 0; i < 3; i += 1) {
    locations.push({
      card: bin2dec(bin.substr(0 + (i * 85), 6)),
      numberOfCards: bin2dec(bin.substr(6 + (i * 85), 10)),
      space: bin2dec(bin.substr(16 + (i * 85), 13)),
      computeCaseSpaceLeft: bin2dec(bin.substr(29 + (i * 85), 10)),
      rigSpaceLeft: bin2dec(bin.substr(39 + (i * 85), 10)),
      mountSpaceLeft: bin2dec(bin.substr(49 + (i * 85), 10)),
      powerLeft: bin2dec(bin.substr(59 + (i * 85), 13)),
      devPointsCount: bin2dec(bin.substr(72 + (i * 85), 11)),
      gridConnector: bin2dec(bin.substr(83 + (i * 85), 1)),
      coffeMiner: bin2dec(bin.substr(84 + (i * 85), 1)),
    });
  }

  return locations;
}

// reads state as an array of uints in decimal format
// uints must be passed as string in an array
export function readState(arr) {
  let bin = (new BigInt(arr[0], 10).toString(2));
  bin = bin.padStart(256, 0);

  let bin2 = (new BigInt(arr[1], 10).toString(2));
  bin2 = bin2.padStart(240, 0);

  let bin3 = (new BigInt(arr[2], 10).toString(2));
  bin3 = bin3.padStart(255, 0);

  let bin4 = (new BigInt(arr[3], 10).toString(2));
  bin4 = bin4.padStart(255, 0);

  const dynamicBins = [];

  const dynamic = arr.slice(4);

  for (let i = 0; i < dynamic.length; i += 1) {
    if (dynamic[i] !== '0') {
      let bin5 = (new BigInt(dynamic[i], 10).toString(2));
      bin5 = bin5.padStart(256, 0);

      dynamicBins.push(bin5);
    }
  }

  console.log(dynamic, dynamicBins);

  const state = {};

  state.funds = bin2dec(bin.substr(0, 48));
  state.fundsPerBlock = bin2dec(bin.substr(48, 16));
  state.experience = bin2dec(bin.substr(64, 32));
  state.devLeft = bin2dec(bin.substr(96, 20));
  state.blockNum = bin2dec(bin.substr(116, 32));
  state.registryPosition = bin2dec(bin.substr(148, 8));

  state.projects = [];

  for (let i = 0; i < 10; i += 1) {
    state.projects.push({
      card: bin2dec(bin2.substr(0 + (i * 24), 6)),
      blockNumberUntilFinished: bin2dec(bin2.substr(6 + (i * 24), 18)),
    });
  }

  state.locations = [];

  state.locations.push(...readLocation(bin3));
  state.locations.push(...readLocation(bin4));

  state.dynamic = [];

  dynamicBins.forEach((d) => {
    state.dynamic.push(...readDynamic(d));
  });

  return state;
}

export function createGameplayState(_state) {

  const locations = [];

  _state.locations.forEach((loc) => {
    if (loc.card !== 0) {
      locations.push({

      });
    }
  });

  return {
    activeContainerIndex: 0,
    activeLocationIndex: 0,
    fundsPerBlock: _state.fundsPerBlock,
    gameplayView: 'location',
    inGameplayView: 'location_main',
    lastSavedStateBlock: 0, // TODO: update this
    nickname: '', // Load from contract
    allCards: [],
    cards: [],
    globalStats: {
      development: _state.devLeft,
      funds: _state.funds,
      level: 1, // TODO: calculate based on exp
      earnedXp: _state.experience, // TODO: what is earned exp.?
      experience: _state.experience,
      requiredXp: 16, // TODO: based on a current lvl.
    },
    locations,
    playedTurns: [],
    projects: [],
  };
}

function printState(_state) {
  const keys = Object.keys(_state);

  keys.forEach((key) => {
    if (key === 'projects') {
      console.log('Projects: ');
      _state[key].forEach(p => console.log(p));
    } else if (key === 'locations') {
      console.log('Locations: ');
      _state[key].forEach(p => console.log(p));
    } else if (key === 'dynamic') {
      console.log('Dynamic: ');
      _state[key].forEach(p => console.log(p));
    } else {
      console.log(`${key} ->  ${_state[key]}`);
    }
  });
}

// helper functions
function _pack(arr, blockNumber, currentBlockNumber) {
  const hexValues = [];
  let str = blockNumber + currentBlockNumber;

  arr.forEach((b) => {
    if ((str.length + b.length) < 256) {
      str += b;
    } else {
      str += '0000';
      hexValues.push(bin2Hex(str));
      str = b;
    }
  });

  if (str.length !== 0) {
    if (str.length + 42 < 256) {
      str += '111111111111111111111111111111111111111111';
      const len = 256 - str.length;
      for (let i = 0; i < len; i += 1) {
        str += '0';
      }
    } else {
      str += '0000';
    }

    hexValues.push(bin2Hex(str));
  }

  return hexValues.map(h => `0x${h.padStart(64, 0)}`);
}

export function packMoves(_moves, currBlockNumber, klipaN) {
  const blockNumber = _moves[0].blockNumber; //eslint-disable-line

  let counting = 0;
  const moves = [];
  const binKlipaN = dec2bin(klipaN, 32);
  moves.push({
    add: bin2dec(binKlipaN.substring(0, 1)),
    specificCard: bin2dec(binKlipaN.substring(1, 2)),
    location: bin2dec(binKlipaN.substring(2, 5)),
    level: bin2dec(binKlipaN.substring(2, 5)),
    containerIndex: bin2dec(binKlipaN.substring(2, 10)),
    cardType: bin2dec(binKlipaN.substring(5, 16)),
  });

  _moves.forEach((m, i) => {
    moves.push(m);

    if (m.cardType === '24') {
      counting += 1;
    } else if (counting > 1) {
      moves[i - (counting - 1)].numProjects = counting;
      moves.splice((i - (counting - 1)) + 1, counting - 1);
    }

    if ((i === _moves.length - 1)) {
      moves[i - (counting - 1)].numProjects = counting;
      moves.splice((i - (counting - 1)) + 1, counting - 1);
    }
  });

  console.log(moves);

  const blockNum = dec2bin(blockNumber, 42);
  const currentBlockNum = dec2bin(currBlockNumber, 42);

  const blockNumsDiff = [];

  for (let i = 1; i < moves.length; i += 1) {
    blockNumsDiff[i] = moves[i].blockNumber - moves[i - 1].blockNumber;
  }

  blockNumsDiff[0] = bin2dec(binKlipaN.substring(16, 32));

  const binMoves = moves.map((move, i) =>
    dec2bin(move.add, 1) + dec2bin(move.specificCard, 1) + dec2bin(move.location, 3)
    + dec2bin(move.level, 3) + dec2bin(move.containerPosition, 7) + dec2bin(move.cardType, 11)
    + dec2bin(blockNumsDiff[i], 16));

  return _pack(binMoves, blockNum, currentBlockNum);
}
