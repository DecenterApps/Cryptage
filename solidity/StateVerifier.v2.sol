pragma solidity ^0.4.22;

import "./SeleneanCards.sol";
import "./StateCodec.sol";
import "./CryptageCards.sol";

contract StateVerifier is StateCodec {

	struct Move {
		bool shift;
		bool gpuOption;
		uint level;
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
	    	// first update everything based on funds per block
	    	_state.funds += (_moves[i].blockNumber - _state.blockNumber) * _state.fundsPerBlock;
	    	// update all projects
    		_state = updateProjects(_state, _moves[i]);

    		_state = _moves[i].shift ? playCard(_state, _moves[i], lastBlock) : removeCard(_state, _moves[i]);

    		// set new block number at the end
			_state.blockNumber = _moves[i].blockNumber;
    	}
    }

    function playCard(State memory _state, Move memory _move, uint _lastBlock) internal returns(State) {
    		
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
				timeLeft: cardCost.time,
				level: _move.level
			});
    	}

    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.POWER)) {
    		bool exists = false;
    		for(uint i=0; i<_state.locations[_move.location].powers.length; i++) {
    			if (_state.locations[_move.location].powers[i].card[_move.level] == _move.card) {
    				_state.locations[_move.location].powers[i].count[_move.level] += 1;
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

                uint[5] memory emptyLevels;
				_state.locations[_move.location].powers[powers.length] = Power({
					card: emptyLevels,
					count: emptyLevels
				});
				_state.locations[_move.location].powers[powers.length].card[_move.level] = _move.card;
				_state.locations[_move.location].powers[powers.length].count[_move.level] = 1;
			}
		}

		if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.DEV)) {
    		exists = false;
    		for(i=0; i<_state.locations[_move.location].developers.length; i++) {
    			if (_state.locations[_move.location].developers[i].card[_move.level] == _move.card) {
    				_state.locations[_move.location].developers[i].count[_move.level] += 1;
    				exists = true;
    				break;
    			}
    		}

    		if (!exists) {
				StateCodec.Developer[] memory developers = _state.locations[_move.location].developers;
				_state.locations[_move.location].developers = new StateCodec.Developer[](developers.length + 1);
				for(i=0; i<developers.length; i++) {
					_state.locations[_move.location].developers[i] = developers[i];
				}

				_state.locations[_move.location].developers[developers.length] = Developer({
					card: emptyLevels,
					count: emptyLevels
				});
				_state.locations[_move.location].developers[developers.length].card[_move.level] = _move.card;
				_state.locations[_move.location].developers[developers.length].count[_move.level] = 1;
			}
    	}

		if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.COMPUTER_CASE)) {
			StateCodec.ComputerCase[] memory computerCases = _state.locations[_move.location].computerCases;
			_state.locations[_move.location].computerCases = new StateCodec.ComputerCase[](computerCases.length + 1);
			for(i=0; i<computerCases.length; i++) {
				_state.locations[_move.location].computerCases[i] = computerCases[i];
			}
		
		    uint[computerCaseMinersCount * cpuLevelCount] memory counts;
			_state.locations[_move.location].computerCases[computerCases.length] = ComputerCase({
                counts: counts
			});
		}

		if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.MOUNT_CASE)) {
			StateCodec.MountCase[] memory mountCases = _state.locations[_move.location].mountCases;
			_state.locations[_move.location].mountCases = new StateCodec.MountCase[](mountCases.length + 1);
			for(i=0; i<mountCases.length; i++) {
				_state.locations[_move.location].mountCases[i] = mountCases[i];
			}
		
			_state.locations[_move.location].mountCases[mountCases.length] = MountCase({
				asicCount: emptyLevels
			});
		}

		if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.ASIC)) {
			require(_state.locations[_move.location].mountCases.length > _move.containerIndex);
			totalCount = 0;
			for(i=0; i<asicLevelCount; i++) {
			    totalCount += _state.locations[_move.location].mountCases[_move.containerIndex].asicCount[i];
			}
			require(totalCount < 6);

			_state.locations[_move.location].mountCases[_move.containerIndex].asicCount[_move.level]++;
		}

		if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.RIG_CASE)) {
			StateCodec.RigCase[] memory rigCases = _state.locations[_move.location].rigCases;
			_state.locations[_move.location].rigCases = new StateCodec.RigCase[](rigCases.length + 1);
			for(i=0; i<rigCases.length; i++) {
				_state.locations[_move.location].rigCases[i] = rigCases[i];
			}
		
		   uint[rigCaseMinersCount * gpuLevelCount] memory counts2;
			_state.locations[_move.location].rigCases[rigCases.length] = RigCase({
				counts: counts2
			});
		}

		if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.MINING)) {

			if (_move.gpuOption == false) {
				uint pos = computerCaseMiners.length;
				uint totalCount = 0;
				for (i=0; i<computerCaseMiners.length; i++) {
					totalCount += _state.locations[_move.location].computerCases[_move.containerIndex].counts[i];
					if (computerCaseMiners[i] == _move.card) {
						pos = i;
					}
				}

				require(pos < computerCaseMiners.length);
				require(totalCount < 2);
				
				_state.locations[_move.location].computerCases[_move.containerIndex].counts[pos]++;
			} else {

				pos = rigCaseMiners.length;
				totalCount = 0;
				for (i=0; i<rigCaseMiners.length; i++) {
					totalCount += _state.locations[_move.location].rigCases[_move.containerIndex].counts[i];
					if (rigCaseMiners[i] == _move.card) {
						exists = true;
					}
				}

				require(pos < rigCaseMiners.length);
				require(totalCount < 6);
				
				_state.locations[_move.location].rigCases[_move.containerIndex].counts[pos]++;
			}
		}
    	
    	return _state;
    }

    function removeCard(State memory _state, Move memory _move) internal returns(State) {
    	
    	//                  all of this is needed for each card
		// ------------------------------------------------------------------------------
		// ------------------------------------------------------------------------------
		CryptageCards.CardGains memory cardGains = cryptageCards.getCardGains(_move.card);

		require(_state.developmentLeft - cardGains.dev >= 0);
		require(_state.locations[_move.location].powerLeft - cardGains.power >= 0);
		require(_state.locations[_move.location].spaceLeft - cardGains.space >= 0);

		_state.fundsPerBlock -= cardGains.funds;
		_state.developmentLeft -= cardGains.dev;
		_state.locations[_move.location].powerLeft -= cardGains.power;
		_state.locations[_move.location].spaceLeft -= cardGains.space;
		// ------------------------------------------------------------------------------
		// ------------------------------------------------------------------------------
    	
    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.LOCATION)) {
    		require(_state.locations[_move.location].numberOfCards == 0);
    	}

    	if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.POWER)) {
    		bool exists = false;
    		for(uint i=0; i<_state.locations[_move.location].powers.length; i++) {
    			if (_state.locations[_move.location].powers[i].card[_move.level] == _move.card) {
    				exists = true;
    				break;
    			}
    		}
    		
    		require(exists);
    		require(_state.locations[_move.location].powers[i].count[_move.level] > 0);

    		_state.locations[_move.location].powers[i].count[_move.level]--;
		}

		if (uint(cryptageCards.getCardType(_move.card)) == uint(CryptageCards.CardType.DEV)) {
    		exists = false;
    		for(i=0; i<_state.locations[_move.location].developers.length; i++) {
    			if (_state.locations[_move.location].developers[i].card[_move.level] == _move.card) {
    				exists = true;
    				break;
    			}
    		}

    		require(exists);
    		require (_state.locations[_move.location].developers[i].count[_move.level] > 0);
    		
    		_state.locations[_move.location].developers[i].count[_move.level]--;
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