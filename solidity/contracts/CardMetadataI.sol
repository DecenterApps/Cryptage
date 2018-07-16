contract CardMetadataI {
    struct CardProperties {
        uint id;
        uint rarity;
        bytes32 ipfsHash;
        uint8 ipfsHashFunction;
        uint8 ipfsSize;
        address artist;
    }
    
    CardProperties[] public properties;
    function getNumberOfCards() view public returns (uint);
}