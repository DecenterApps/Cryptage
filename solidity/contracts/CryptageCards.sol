pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./CardMetadata.sol";

/// @title Contract derived from ERC721Token contract with custom implementation on Booster and Metadata
contract CryptageCards is ERC721Token, Ownable {

    CardMetadata metadataContract;
    address boosterContractAddress;

    mapping(uint => uint) _metadata;

    modifier onlyBoosterContract() {
        require(msg.sender == boosterContractAddress);
        _;
    }
    
    constructor() ERC721Token("CryptageCards", "CPT") public {}
    
    /// @notice create card with specific type and index
    /// @param _owner address of new owner
    /// @param _metadataId id of metadata we are using
    function createCard(address _owner, uint _metadataId) public onlyBoosterContract returns(uint) {
        require(_metadataId < metadataContract.getNumberOfCards());

        uint cardId = totalSupply();
        _mint(_owner, cardId);

        uint id;
//        uint rarity;
        string memory ipfsHash;
//        address artist;
        (id, ,ipfsHash, ) = metadataContract.properties(_metadataId);

        _metadata[cardId] = id;
        _setTokenURI(cardId, ipfsHash);

        return cardId;
    }

    /// @notice get how many cards of specific type user has
    /// @param _user address of user
    /// @param _metadataId metadataId of card
    function numberOfCardsWithType(address _user, uint _metadataId) public view returns(uint _num) {
        uint len = ownedTokens[_user].length;
        for(uint i = 0; i<len; i++) {
            _num += (_metadata[ownedTokens[_user][i]] == _metadataId) ? 1 : 0;
        }
    }

    function metadata(uint _cardId) public view returns (uint, uint, string, address){
        return metadataContract.properties(_metadata[_cardId]);
    }

    /// @notice adds booster address to contract only if it doesn't exist
    /// @param _boosterContract address of booster contract
    function addBoosterContract(address _boosterContract) public onlyOwner {
        // not required while on testnet
        // require(address(boosterContract) == 0x0);

        boosterContractAddress = _boosterContract;
    }

    /// @notice adds metadata address to contract only if it doesn't exist
    /// @param _metadataContract address of metadata contract
    function addMetadataContract(address _metadataContract) public onlyOwner {
        // not required while on testnet
        // require(address(metadataContract) == 0x0);

        metadataContract = CardMetadata(_metadataContract);
    }
}