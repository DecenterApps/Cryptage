pragma solidity ^0.4.24;

contract ECTools {

  /**
   * @dev Recover signer address from a message by using his signature
   * @param hash bytes32 message, the hash is the signed message. What is recovered is the signer address.
   * @param sig bytes signature
   */
  function recover(bytes32 hash, bytes sig) public pure returns (address) {
    bytes32 r;
    bytes32 s;
    uint8 v;

    //Check the signature length
    if (sig.length != 65) {
      return (address(0));
    }

    // Divide the signature in r, s and v variables
    assembly {
      r := mload(add(sig, 32))
      s := mload(add(sig, 64))
      v := byte(0, mload(add(sig, 96)))
    }

    // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
    if (v < 27) {
      v += 27;
    }

    // If the version is correct return the signer address
    if (v != 27 && v != 28) {
      return (address(0));
    } else {
      return ecrecover(hash, v, r, s);
    }
  }
}

contract Leaderboard is ECTools {
  mapping(address => uint) public scores;
  mapping(address => bytes32) public names;
  address[] public leaderboard;

  /// @notice address of our verifier (server)
  /// @dev needs to be changed when we generate address on server side
  address VERIFIER = 0x7b2aD6028C0bD9A787b173C80860b5116258a585;

  event NewScore(address user, uint score);

  function saveScore(bytes _moves, uint _score, bytes _sig, bytes32 _name) public {
    require(_recoverSig(_moves, _score, _sig) == VERIFIER);

    if (scores[msg.sender] == 0) {
      leaderboard.push(msg.sender);
    }

    scores[msg.sender] = _score;
    names[msg.sender] = _name;

    emit NewScore(msg.sender, _score);
  }

  /// @return returns leaderboard as array of addresses
  function getLeaderboard() public view returns(address[] _addresses, uint[] _scores, bytes32[] _names) {
    _addresses = new address[](leaderboard.length);
    _scores = new uint[](leaderboard.length);
    _names = new bytes32[](leaderboard.length);

    for (uint i = 0; i < leaderboard.length; i++) {
      _addresses[i] = leaderboard[i];
      _scores[i] = scores[leaderboard[i]];
      _names[i] = names[leaderboard[i]];
    }
  }

  function _recoverSig(bytes _moves, uint _score, bytes _sig) private view returns (address) {
    bytes32 score = bytes32(_score);
    bytes32 sender = bytes32(msg.sender);

    bytes32 hash = keccak256(abi.encodePacked(_moves, score, sender));

    return recover(hash, _sig);
  }
}
