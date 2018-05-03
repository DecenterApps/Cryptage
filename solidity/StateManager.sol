pragma solidity ^0.4.22;

import './StateCodec.sol';
import './MoveDecoder.sol';
import './StateVerifierV2.sol';

contract StateManager is StateCodec, MoveDecoder, StateVerifier {

  address[] users;
  mapping(address => bytes) states;
  mapping(address => bytes32) names;

  constructor(address _seleneanCards) StateVerifier(_seleneanCards) public {}

  function update(uint[] input, bytes32 _name) public returns (bytes) {
    State memory state = decode(states[msg.sender]);

    if (state.exists == 0) {
      users.push(msg.sender);
    }

    Move[] memory move;
    uint sendBlockNumber;
    (move, sendBlockNumber) = decodeMoves(input);

verify(state, move, msg.sender, sendBlockNumber);

    state.exists = 1;
    bytes memory buffer = encode(state);
    states[msg.sender] = buffer;
    names[msg.sender] = _name;

    return buffer;
  }

  function get() public view returns (address[], bytes32[], uint[]) {
    bytes32[] memory namesArray = new bytes32[](users.length);
    uint[] memory experiencesArray = new uint[](users.length);

    for (uint i = 0; i < users.length; i++) {
      State memory state = decode(states[users[i]]);
      experiencesArray[i] = state.experience;
      namesArray[i] = names[users[i]];
    }

    return (users, namesArray, experiencesArray);
  }
}
