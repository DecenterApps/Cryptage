pragma solidity ^0.4.22;

import "./CryptageCards.sol";
import "./CardMetadata.sol";
import "./CardPackToken.sol";


contract BitGuildToken {

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
}


contract PLATPriceOracle {

    // How much PLAT you get for 1 ETH, multiplied by 10^18
    uint256 public ETHPrice;
}


contract Booster is Ownable {

    modifier onlyCardPackToken {
        require(msg.sender == address(cardPackToken));
        _;
    }

    CryptageCards public cryptageCards;
    CardMetadata public metadataContract;
    BitGuildToken public tokenContract = BitGuildToken(0x0F2698b7605fE937933538387b3d6Fec9211477d);
    PLATPriceOracle public platPriceOracle = PLATPriceOracle(0x20159d575724b68d8a1a80E16FCB874883329114);

    uint public constant BOOSTER_PRICE = 10 ** 15; // 0.001 ether
    uint public constant OWNER_PERCENTAGE = 60;
    uint public constant CARD_ARTIST_PERCENTAGE = 3;
    uint public constant REVEALER_PERCENTAGE = 25;
    
    uint public numberOfCardsInBooster = 5;

    bool public buyWithReveal = false;

    mapping(address => uint) public withdrawBalance;
    mapping(uint => address) public boosterOwners;
    mapping(uint => uint) public blockNumbers;
    mapping(address => uint[]) public unrevealedBoosters;
    mapping(uint => uint[]) public boosters;

    mapping(uint => bool) public boughtWithToken;

    uint public numOfBoosters;

    event BoosterBought(address indexed user, uint indexed boosterId);
    event BoosterRevealed(uint indexed boosterId);
    event BoosterInstantBought(address indexed user, uint indexed boosterId);

    CardPackToken public cardPackToken;

    constructor(address _cardAddress) public {
        cryptageCards = CryptageCards(_cardAddress);
    }

    /// @notice buy booster for BOOSTER_PRICE with automatic reveal
    function buyInstantBooster() public payable {
        require(msg.value >= BOOSTER_PRICE);
        require(!buyWithReveal);
        // we don't want any contract to call this method
        require(tx.origin == msg.sender);

        uint boosterId;
        uint[] memory cardIds;

        (boosterId, cardIds) = mintCardsForUser(msg.sender, uint(blockhash(block.number-1)));

        for (uint i = 0; i < cardIds.length; i++) {
            address artist = metadataContract.getArtist(cryptageCards._metadata(cardIds[i]));
            withdrawBalance[artist] += BOOSTER_PRICE * CARD_ARTIST_PERCENTAGE / 100;
        }

        // all money from buy and reveal goes to owner (leaving reveal percentage if we decide to change process)
        withdrawBalance[owner] += BOOSTER_PRICE * OWNER_PERCENTAGE / 100 + BOOSTER_PRICE * REVEALER_PERCENTAGE / 100;

        emit BoosterInstantBought(msg.sender, boosterId);
    }

      // Function that is called when trying to use PLAT for payments from approveAndCall
    function receiveApproval(address _sender, uint256 _value, BitGuildToken _tokenContract, bytes _extraData) public {
        require(_tokenContract == tokenContract);
        require(_tokenContract.transferFrom(_sender, address(this), _value));
        require(platPriceOracle.ETHPrice() * BOOSTER_PRICE / (1 ether) <= _value);
                
        uint boosterId;
        uint[] memory cardIds;

        (boosterId, cardIds) = mintCardsForUser(_sender, uint(blockhash(block.number-1)));

        // should decide how we are going to distribute PLAT

        emit BoosterInstantBought(_sender, boosterId);
    }

    /// @notice buy booster for BOOSTER_PRICE
    function buyBooster() public payable {
        require(msg.value >= BOOSTER_PRICE);
        require(buyWithReveal);

        uint boosterId = numOfBoosters;

        boosterOwners[boosterId] = msg.sender;
        blockNumbers[boosterId] = block.number;

        unrevealedBoosters[msg.sender].push(boosterId);

        numOfBoosters++;

        emit BoosterBought(msg.sender, boosterId);
    }

    /// @notice reveal booster you just bought, 
    /// @notice if you don't reveal it in first 100 blocks since buying, 
    /// @notice anyone can reveal it before 255 blocks pass
    /// @param _boosterId id of booster that is bought
    function revealBooster(uint _boosterId) public {
        require(blockNumbers[_boosterId] > block.number - 255);
        require(boosterOwners[_boosterId] == msg.sender || blockNumbers[_boosterId] < block.number - 100);

        _removeBooster(msg.sender, _boosterId);

        uint boosterId;
        uint[] memory cardIds;

        (boosterId, cardIds) = mintCardsForUser(msg.sender, uint(blockhash(blockNumbers[_boosterId])));

        for (uint i = 0; i < cardIds.length; i++) {
            address artist = metadataContract.getArtist(cryptageCards._metadata(cardIds[i]));
            withdrawBalance[artist] += BOOSTER_PRICE * CARD_ARTIST_PERCENTAGE / 100;
        }

        withdrawBalance[msg.sender] += BOOSTER_PRICE * REVEALER_PERCENTAGE / 100;
        withdrawBalance[owner] += BOOSTER_PRICE * OWNER_PERCENTAGE / 100;

        emit BoosterRevealed(_boosterId);
    }

    /// @notice return unrevealed boosters for user
    /// @return array of boosterIds
    function getMyBoosters() public view returns(uint[]) {
        return unrevealedBoosters[msg.sender];
    }

    /// @notice return cardIds from boosters
    /// @param _boosterId id of booster
    /// @return array of cardIds
    function getCardFromBooster(uint _boosterId) public view returns(uint[]) {
        return boosters[_boosterId];
    }

    /// @notice adds metadata address to contract only if it doesn't exist
    /// @param _metadataContract address of metadata contract
    function addMetadataContract(address _metadataContract) public onlyOwner {
        // not required while on testnet
        // require(address(metadataContract) == 0x0);

        metadataContract = CardMetadata(_metadataContract);
    }

    /// @notice adds CardPackToken address only if it doesn't exist
    /// @param _cardPackTokenAddress address of CardPackToken contract
    function addCardPackToken(address _cardPackTokenAddress) public onlyOwner {
        // not required while on testnet
        // require(address(cardPackToken) == 0x0);

        cardPackToken = CardPackToken(_cardPackTokenAddress);
    }

    /// @notice withdraw method for anyone who owns money on contract
    function withdraw() public {
        uint balance = withdrawBalance[msg.sender];
        withdrawBalance[msg.sender] = 0;
        msg.sender.transfer(balance);
    }

    /// @notice owner is able to change if we are buying booster with reveal or without it
    /// @param _buyWithReveal bool that says should we buy with reveal or not
    function setBytWithReveal(bool _buyWithReveal) public onlyOwner {
        buyWithReveal = _buyWithReveal;
    }

    function mintCardsForUser(address _to, uint _blockhash) private returns (uint boosterId, uint[] cardIds) {
        uint numOfCardTypes = metadataContract.getNumberOfCards();
        
        boosterId = numOfBoosters;
        numOfBoosters++;

        assert(numOfCardTypes >= numberOfCardsInBooster);

        // hash(random hash), n(size of array we need)
        uint[] memory metadataIds = _random(_blockhash, numberOfCardsInBooster);
        cardIds = new uint[](metadataIds.length);

        for (uint i = 0; i < metadataIds.length; i++) {
            cardIds[i] = cryptageCards.createCard(_to, metadataIds[i]);
        }

        boosters[boosterId] = cardIds;

        return (boosterId, cardIds);
    }

    function _removeBooster(address _user, uint _boosterId) private {
        uint boostersLength = unrevealedBoosters[_user].length;

        delete boosterOwners[_boosterId];

        for (uint i = 0; i < boostersLength; i++) {
            if (unrevealedBoosters[_user][i] == _boosterId) {
                unrevealedBoosters[_user][i] = unrevealedBoosters[_user][boostersLength-1];

                delete unrevealedBoosters[_user][boostersLength-1];
                unrevealedBoosters[_user].length--;

                break;
            }
        }
    }

    /// @notice method that gets N random metadataIds
    /// @param _hash random hash used for random method
    /// @param _n size of array that we need
    function _random(uint _hash, uint _n) private view returns (uint[]) {
        uint[] memory metadataIds = new uint[](_n);
        uint _maxNum = metadataContract.getMaxRandom() + 1;
        uint _hashCopy = _hash;


        for (uint i = 0; i < _n; i++) {
            // balanceOf is used because you would get same cards if buyBooster called at same block
            _hashCopy = uint(
                keccak256(
                    abi.encodePacked(
                        _hashCopy,
                        i,
                        numOfBoosters,
                        cryptageCards.balanceOf(msg.sender),
                        msg.sender
                    )
                )
            );
            uint rand = _hashCopy % _maxNum;
            metadataIds[i] = metadataContract.getCardByRarity(rand);
        }

        return metadataIds;
    }

    function isContract(address addr) private view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }
}