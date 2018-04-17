pragma solidity ^0.4.20;

import "./StateCalculator.sol";
import "./Leaderboard.sol";

contract State is Leaderboard{
    StateCalculator stateCalculator;

    mapping(address => uint[20]) states;

    function State(address stateCalculatorAddress) public {
        stateCalculator = StateCalculator(stateCalculatorAddress);
    }

    function reset() public {
        resetState(msg.sender);
    }

    function get(address _user) public view returns (uint[20]) {
        return states[_user];
    }

    function update(uint[] moves, bool updateLeaderBoard) public {
        states[msg.sender] = stateCalculator.calculate(states[msg.sender], moves);
        if (updateLeaderBoard) {
            addToLeaderboard(
                msg.sender,
                (states[msg.sender][0] & ((2 << 160) * ((2 << 32) - 1))) / (2 << 160)
            );
        }
    }

    function challange(address _user, uint _metadataIds) public {
        uint[20] memory state = states[_user];
        state[19] = _metadataIds;

        if (stateCalculator.stateVerifier().verify(state, _user)) {
            resetState(_user);
        }
    }

    function resetState(address _user) private {
        states[_user][0] = 150 * (2 << 207) + (block.number - 50000) * (2 << 107);

        for (uint i = 1; i < 20; i++) {
            states[_user][i] = 0;
        }
    }
}

