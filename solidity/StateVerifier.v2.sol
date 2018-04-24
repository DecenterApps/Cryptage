pragma solidity ^0.4.22;

import "./SeleneanCards.sol";
import "./StateCodec.sol";
import "./CryptageCards.sol";

contract StateVerifier is StateCodec {

	struct Move {
		bool shift;
		bool gpuOption;
		uint location;
		uint containerIndex;
		uint card;
		uint blockDifference;
		uint blockNumber;
	}

    SeleneanCards seleneanCards;
    CryptageCards cryptageCards;
    uint[] levels;

    function constructor(address _seleneanCardsAddress, address _cryptageCards) public {
        seleneanCards = SeleneanCards(_seleneanCardsAddress);
    	cryptageCards = CryptageCards(_cryptageCards);
    }

    function addLevels(uint[] _levels) public {
    	levels = _levels;
    }

    function verify(address _user, Move[] memory _moves) internal returns(bool) {
    	State memory _state = states[_user];
    	uint lastBlock = _moves[_moves.length - 1].blockNumber;

    	for(uint i=0; i<_moves.length; i++) {
    		_state = _moves[i].shift ? playCard(_state, _moves[i], lastBlock) : removeCard(_state, _moves[i]);
    	}
    }

    function playCard(State memory _state, Move memory _move, uint _lastBlock) internal returns(State) {
    	
    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.SpecialAbility.DEFAULT)) {

            CryptageCards.CardCost memory cardCost = cryptageCards.getCardCost(_move.card);
            
			require(_state.developmentLeft > cardCost.dev); 
			require(_state.funds > cardCost.funds);
			require(_state.experience >= levels[cardCost.level]);
			require(_state.locations[_move.location].powerLeft >= cardCost.power); 
			require(_state.locations[_move.location].spaceLeft >= cardCost.space);

			// pay costs
			_state.developmentLeft -= cardCost.dev; 
			_state.funds -= cardCost.funds;
			_state.experience -= levels[cardCost.level];
			_state.locations[_move.location].powerLeft -= cardCost.power; 
			_state.locations[_move.location].spaceLeft -= cardCost.space;
    	
			// get gains
			CryptageCards.CardGains memory cardGains = cryptageCards.getCardGains(_move.card);
			_state.funds += (_lastBlock - _move.blockNumber) * cardGains.funds;
			_state.fundsPerBlock += cardGains.funds;
			_state.developmentLeft += cardGains.dev;
			_state.locations[_move.location].powerLeft += cardGains.power;
			_state.locations[_move.location].spaceLeft += cardGains.space;
    	}

    	return _state;
    }

    function removeCard(State memory _state, Move memory _move) internal returns(State) {
    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.SpecialAbility.DEFAULT)) {

			CryptageCards.CardGains memory cardGains = cryptageCards.getCardGains(_move.card);
			_state.fundsPerBlock -= cardGains.funds;
			_state.developmentLeft -= cardGains.dev;
			_state.locations[_move.location].powerLeft -= cardGains.power;
			_state.locations[_move.location].spaceLeft -= cardGains.space;
    	}
    	
    	return _state;
    }

}