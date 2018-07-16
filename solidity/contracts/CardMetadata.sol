pragma solidity ^0.4.22;

/// @title Contract holding all metadata about token(card)
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CardMetadata is Ownable{

    struct CardProperties {
        uint id;
        uint rarity;
        bytes32 ipfsHash;
        uint8 ipfsHashFunction;
        uint8 ipfsSize;
        address artist;
    }

    CardProperties[] public properties;  
    uint[] public rarities;

    /// @notice method to add metadata types
    /// @dev needs to use three params for ipfs hash due to Solidity limitations for sending string from contract to contract
    /// @param _rarity of card
    /// @param _ipfsHash ipfs hash to card attributes
    /// @param _ipfsHashFunction hash function that is used
    /// @param _ipfsSize length of hash
    /// @param _artist is address of card artist
    function addCardMetadata(uint _rarity, bytes32 _ipfsHash, uint8 _ipfsHashFunction, uint8 _ipfsSize, address _artist) public onlyOwner{
        uint metadataId = properties.length;
        
        // we can't do aks for rarities[-1] so if metadataId is zero we just add it
        if (metadataId == 0) {
            rarities.push(_rarity);
        } else {
            rarities.push(_rarity + rarities[metadataId-1]);
        } 

        properties.push(CardProperties({
            ipfsHash: _ipfsHash,
            ipfsHashFunction: _ipfsHashFunction,
            ipfsSize: _ipfsSize,
            rarity: _rarity,
            artist: _artist,
            id: metadataId
        }));
    }

    /// @dev only for testing purposes
    function setNewRarities(uint[] _rarities) public onlyOwner {
        require (_rarities.length == rarities.length);
        

        rarities[0] = _rarities[0];
        for(uint i = 1; i<_rarities.length; i++) {
            rarities[i] = _rarities[i] + rarities[i-1];
            properties[i].rarity = _rarities[i];
        }
    }


    /// @notice returns artist of card
    /// @param _metadataId is matadataId of card
    function getArtist(uint _metadataId) view public returns(address){
        return properties[_metadataId].artist;
    }
    /// @notice returns how many cards there are 
    function getNumberOfCards() view public returns (uint) {
        return properties.length;
    }
    /// @notice returns maximal number value
    function getMaxRandom() view public returns (uint) {
        return rarities[rarities.length - 1];
    }


    function getCardByRarity(uint _rarity) view public returns (uint) {
        require(_rarity <= rarities[rarities.length-1]);
        
        uint right = rarities.length - 1;
        uint left = 0;
        uint index = (right + left) / 2;
        
        while (left <= right) {
            index = (right + left) / 2;
            
            /// if it is between right (including) and left we found it
            if (_rarity <= rarities[index] && (index == 0 || _rarity > rarities[index-1])) {
                return index;
            }
            
            if (_rarity > rarities[index] && _rarity <= rarities[index+1]) {
                return index+1;
            }
            
            if (_rarity < rarities[index]) {
                right = index - 1;
            } else {
                left = index;
            }
        }
    }
}