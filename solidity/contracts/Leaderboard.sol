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

    function toEthereumSignedMessage(bytes32 _msg) public pure returns (bytes32) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        return keccak256(abi.encodePacked(prefix, _msg));
    }

    function prefixedRecover(bytes32 _msg, bytes sig) public pure returns (address) {
        bytes32 ethSignedMsg = toEthereumSignedMessage(_msg);
        return recover(ethSignedMsg, sig);
    }
}

contract Leaderboard is ECTools {

    mapping(address => uint) public scores;
    address[] public leaderboard;

    /// @notice address of our verifier (server)
    /// @dev needs to be changed when we generate address on server side
    address VERIFIER = 0x97B97e838c22d7E2e0fc932b6026b15258c10a4a;

    event NewScore(address user, uint score);

    function saveScore(bytes32 _hash, bytes _sig, uint _score) public {
        require(_recoverSig(_hash, _sig, _score) == VERIFIER);
        
        if (scores[msg.sender] == 0) {
            leaderboard.push(msg.sender);
        }

        scores[msg.sender] = _score;

        emit NewScore(msg.sender, _score);
    }   

    /// @return returns leaderboard as array of addresses
    function getLeaderboard() public view returns(address[] _addresses, uint[] _scores) {
        _addresses = new address[](leaderboard.length);
        _scores = new uint[](leaderboard.length);
    }
    
    function _recoverSig(bytes32 _hash, bytes _sig, uint _state) private pure returns (address) {
        assert(keccak256(abi.encodePacked(_state)) == _hash);

        return prefixedRecover(_hash, _sig);
    }
}
