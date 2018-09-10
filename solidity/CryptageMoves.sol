pragma solidity ^0.4.22;

contract CryptageMoves {
  mapping(address => bool) public exists;
  mapping(address => bytes32) public names;
  address[] public leaderboard;

  event NewMoves(address indexed _address, bytes _moves, bool _reset);

  function saveMoves(bytes _moves, bytes32 _name, bool _reset) public {
    if (!exists[msg.sender]) {
      exists[msg.sender] = true;
      leaderboard.push(msg.sender);
    }

    names[msg.sender] = _name;

    emit NewMoves(msg.sender, _moves, _reset);
  }
}
