pragma solidity ^0.4.22;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Booster.sol";

contract CardPackToken is StandardToken, Ownable {

    event Mint(address indexed to, uint256 amount);
    event MintFinished();

    bool public mintingFinished = false;
    uint contractCreationDate;

    modifier canMint() {
        /// its impossible to have more than 1000 CardPackTokens
        require(totalSupply_ <= 1000);
        /// minting can be finished at any time
        require(!mintingFinished);
        /// minting is possible only in first 3 months
        require(block.timestamp - contractCreationDate < (12 weeks));
        _;
    }

    string public name = "CardPackToken";
    string public symbol = "CPT";
    uint public decimals = 8;

    Booster public booster;

    uint ONE_CARD_PACK_TOKEN = 10 ** 8;

    constructor(address _booster) public {
        booster = Booster(_booster);
        contractCreationDate = block.timestamp;
    }

    /// @notice A owner function for minting new tokens
    /// @param _to Address which will get the tokens
    /// @param _amount Amount of tokens the address will get
    function mint(address _to, uint256 _amount) onlyOwner canMint public returns (bool) {
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

    /// @notice Calls the Booster contract to buy 1 booster for 1 CardPackToken
    /// @dev Check if the user has a balance of at least 1 token
    function buyBoosterWithToken() public {
        require(this.balanceOf(msg.sender) >= ONE_CARD_PACK_TOKEN);

        approve(address(booster), ONE_CARD_PACK_TOKEN);

        // booster.buyInstantBoosterWithToken(msg.sender);
    }

    /// @notice A function a owner can call to stop minting of tokens
    function finishMinting() onlyOwner canMint public returns (bool) {
        mintingFinished = true;
        emit MintFinished();
        return true;
    }
}