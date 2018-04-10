pragma solidity ^0.4.20;

import "./StateCalculator.sol";

contract State {
    StateCalculator stateCalculator;

    mapping(address => uint[20]) states;

    function State(address stateCalculatorAddress) public {
        stateCalculator = StateCalculator(stateCalculatorAddress);
    }

    function reset() public {
        resetState(msg.sender);
    }

    //add argument
    function get() public view returns (uint[20]) {
        return states[msg.sender];
    }

    function update(uint[] moves) public {
        states[msg.sender] = stateCalculator.calculate(states[msg.sender], moves);
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
            states[_user][1] = 0;
        }
    }
}
