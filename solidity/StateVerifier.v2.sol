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
    	State memory _state = decode(states[_user]);
    	uint lastBlock = _moves[_moves.length - 1].blockNumber;

    	for(uint i=0; i<_moves.length; i++) {
    		_state = _moves[i].shift ? playCard(_state, _moves[i], lastBlock) : removeCard(_state, _moves[i]);
    	}
    }

    function playCard(State memory _state, Move memory _move, uint _lastBlock) internal returns(State) {
    		
    	// first update everything based on funds per block
    	_state.funds += (_move.blockNumber - _state.blockNumber) * _state.fundsPerBlock;
    	// update all projects
    	_state = updateProjects(_state, _move);


		//                  all of this is needed for each card
		// ------------------------------------------------------------------------------
		// ------------------------------------------------------------------------------
	    CryptageCards.CardCost memory cardCost = cryptageCards.getCardCost(_move.card);
        
		require(_state.developmentLeft > cardCost.dev); 
		require(_state.funds > cardCost.funds);
		require(_state.experience >= levels[cardCost.level]);
		require(_state.locations[_move.location].powerLeft >= cardCost.power); 
		require(_state.locations[_move.location].spaceLeft >= cardCost.space);

		// pay costs
		_state.developmentLeft -= cardCost.dev; 
		_state.funds -= cardCost.funds;
		_state.locations[_move.location].powerLeft -= cardCost.power; 
		_state.locations[_move.location].spaceLeft -= cardCost.space;
	
		// get gains
		CryptageCards.CardGains memory cardGains = cryptageCards.getCardGains(_move.card);
		// time will be cost if you receive gains after some time
		if (cardCost.time == 0) {
			_state.fundsPerBlock += cardGains.funds;
			_state.developmentLeft += cardGains.dev;
			_state.locations[_move.location].powerLeft += cardGains.power;
			_state.locations[_move.location].spaceLeft += cardGains.space;
		}
		// ------------------------------------------------------------------------------
		// ------------------------------------------------------------------------------


		// now we do all special things for each card
    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.LOCATION)) {
    		require(_state.locations[_move.location].numberOfCards == 0);
    		_state.locations[_move.location] = Location({
				card: _move.card,
				numberOfCards: 0,
				spaceLeft: cardGains.space,
				powerLeft: cardGains.power,
				powers: new StateCodec.Power[](0),
				computerCases: new StateCodec.ComputerCase[](0),
				rigCases: new StateCodec.RigCase[](0),
				mountCases: new StateCodec.MountCase[](0),
				developers: new StateCodec.Developer[](0),
				specialCards: new StateCodec.SpecialCard[](0)
			});
    	}

    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.PROJECT)) {
			require(_state.projects[_move.location].timeLeft == 0);

    		_state.projects[_move.location] = Project({
				card: _move.card,
				timeLeft: cardCost.time
			});
    	}

    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.POWER)) {
    		bool exists = false;
    		for(uint i=0; i<_state.locations[_move.location].powers.length; i++) {
    			if (_state.locations[_move.location].powers[i].card == _move.card) {
    				_state.locations[_move.location].powers[i].count += 1;
    				exists = true;
    				break;
    			}
    		}
    		
    		if (!exists) {
				StateCodec.Power[] memory powers = _state.locations[_move.location].powers;
				_state.locations[_move.location].powers = new StateCodec.Power[](powers.length + 1);
				for(i=0; i<powers.length; i++) {
					_state.locations[_move.location].powers[i] = powers[i];
				}

				_state.locations[_move.location].powers[powers.length] = Power({
					card: _move.card,
					count: 1
				});
			}
		}

    	// set new block number at the end
		_state.blockNumber = _move.blockNumber;
    	
    	return _state;
    }

    function removeCard(State memory _state, Move memory _move) internal returns(State) {
    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.SpecialAbility.DEFAULT)) {

			CryptageCards.CardGains memory cardGains = cryptageCards.getCardGains(_move.card);

			require(_state.developmentLeft - cardGains.dev >= 0);
			require(_state.locations[_move.location].powerLeft - cardGains.power >= 0);
			require(_state.locations[_move.location].spaceLeft - cardGains.space >= 0);

			_state.fundsPerBlock -= cardGains.funds;
			_state.developmentLeft -= cardGains.dev;
			_state.locations[_move.location].powerLeft -= cardGains.power;
			_state.locations[_move.location].spaceLeft -= cardGains.space;
    	}
    	
    	return _state;
    }


    function updateProjects(State memory _state, Move memory _move) internal returns(State) {
    	// update all played projects
    	for(uint i=0; i<_state.projects.length; i++) {
    		if (_state.projects[i].timeLeft == 0) {
    			continue;
    		}
    		// check only if higher (not equal), because we want to go to else if time is up
    		if (_state.projects[i].timeLeft > (_move.blockNumber - _state.blockNumber)) {
    			_state.projects[i].timeLeft -= (_move.blockNumber - _state.blockNumber);
    		}else {
    			_state.projects[i].timeLeft = 0;
    			// add funds for finished project
    			CryptageCards.CardGains memory projectGains = cryptageCards.getCardGains(_state.projects[i].card);
    			_state.funds += projectGains.funds;
    			_state.experience += projectGains.xp;
    		}
    	}
    	
    	return _state;
    }


}