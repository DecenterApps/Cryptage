pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

contract CryptageCards {

    enum SpecialAbility { DEFAULT }
	enum CardType { DEV, PROJECT, POWER, LOCATION, SPECIAL, COMPUTER_CASE, RIG_CASE, MOUNT_CASE }

	struct CardCost {
		uint dev;
		uint funds;
		uint level;
		uint power;
		uint space;
		uint time;
	}

	struct CardGains {
		uint dev;
		uint funds;
		uint power;
		uint space;
		uint xp;
		SpecialAbility specialAbility;
		uint[] specialAbilityValues;
	}
	

	struct CardAttributes {
		CardCost cost;
		CardGains gains;
		CardType cardType;
	}
	
	mapping(uint => CardAttributes) public cards;
	
	function getCardCost(uint _cardId) public view returns(CardCost) {
	    return cards[_cardId].cost;
	}
	
    function getCardGains(uint _cardId) public view returns(CardGains) {
	    return cards[_cardId].gains;
	}
	
	function getCardType(uint _cardId) public view returns(CardType) {
	    return cards[_cardId].cardType;
	}

	function addCard(
	    uint _cardId,
	    uint _type,
	    uint[] _costs,
	    uint[] _gains,
		uint[] _specialAbilityValues
		) public {
		
		cards[_cardId] = CardAttributes({
			cost: CardCost({
				dev: _costs[0],
				funds: _costs[1],
				level: _costs[2],
				power: _costs[3],
				space: _costs[4],
				time: _costs[5]
				}),
			gains: CardGains({
				dev: _gains[0],
				funds: _gains[1],
				power: _gains[2],
				space: _gains[3],
				xp: _gains[4],
				specialAbility: SpecialAbility.DEFAULT,
				specialAbilityValues: _specialAbilityValues
				}),
			cardType: CardType(_type)
			});
	}
	
}