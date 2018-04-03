pragma solidity ^0.4.19;

contract Leaderboard {

	uint constant N = 10;

	mapping(address => uint) public scores;
	address[] public leaderboard; 

	function Leaderboard () public {
		for (uint i=0; i<N; i++) {
			leaderboard.push(address(0x0));
		}
	}	

	/// @dev no need for require as we don't want to kill transaction
	/// @param _user address to add to leaderboard
	/// @param _score new score for that user
	/// @return res true if added and false if not added
	function addToLeaderboard(address _user, uint _score) internal returns(bool res) {
		uint pos;
		uint min;
		(min, pos) = findMin();

		if (min < _score) {
			scores[_user] = _score;
			res = true;
			
			for (uint i=0; i<N; i++) {
			    if (leaderboard[i] == _user) {
			        return;
			    }
			}
			
			leaderboard[pos] = _user;
		}

		res = false;
	}

	/// @notice returns current min on leaderboard and position
	function findMin() public view returns(uint min, uint pos) {
		min = 2**256 - 1;

		for(uint i=0; i<N; i++) {
			if (scores[leaderboard[i]] < min) {
				min = scores[leaderboard[i]];
				pos = i;
			}
		}
	}

	/// @noteice returns leaderboard as array of addresses
	function getLeaderboard() public view returns(uint[]) {
		return leaderboard;
	}
	
}