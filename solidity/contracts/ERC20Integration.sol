pragma solidity ^0.4.24;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ERC20Integration is Ownable{

  address [] ownedTokens;

  mapping(address => bool) supportedTokens;
  mapping(address => uint) tokenPriceInEth;

  /// @notice Function where contract owner can add erc20 tokens we'd like to support
  /// @param _token is address of erc20
  /// @param _tokenPriceInEth is price in ETH for that token (ratio)
  function addToken(address _token, uint _tokenPriceInEth) public onlyOwner{
      require(_token != address(0));
      require(_tokenPriceInEth > 0);

      supportedTokens[_token] = true;
      tokenPriceInEth[_token] = _tokenPriceInEth;
  }

  /// @notice Function where contract owner can remove supported erc20 tokens
  /// @param _token is address of token
  function removeToken(address _token) public onlyOwner {
      require(supportedTokens[_token] == true);
      supportedTokens[_token] = false;

  }
}
