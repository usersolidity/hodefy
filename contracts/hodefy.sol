// SPDX-License-Identifier: GPL-3.0

import "erc721a/contracts/ERC721A.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Hodefy is
    ChainlinkClient // Chainlink will handle getting price feeds and GET requests to our Backend API
{
    using Chainlink for Chainlink.Request;

    address internal hodefy = 0xcD0308D313678777820010d0467430362936F57b; // Address of my (Phil's) ETH wallet is the Hodefy admin
    // Replace with official Hodefy company wallet later
    // Socheat's wallet address is 0x27F8f4f060b46Ae4074089b46c0991e7BaA42306

    address private oracle; // For use with Chainlink Oracle on Polygon Mumbai Testnet
    bytes32 private jobId; // ID of the job we'll give to the Oracle
    uint256 private fee; // Fee paid for Oracle services

    uint256 internal propertyID;
    // Largest property ID

    uint8 internal feePercent = 2; // Fee rate expressed as an integer, default is 2
    // uint8 avgBlockTime;

    // MAPPINGS
    mapping(address => mapping(address => uint256)) private allowed; // allowance by Hodefy
    mapping(address => Property[]) internal ownerToProperties;

    // EVENTS
    event ChangedFee(uint8 NewFee);

    // MODIFIERS
    modifier onlyHodefy() {
        require(msg.sender == hodefy);
        _;
    }

    constructor() {
        setPublicChainlinkToken();
        // Values accessed from https://docs.polygon.technology/docs/develop/oracles/chainlink/#code-example
        oracle = 0x58BBDbfb6fca3129b91f0DBE372098123B38B5e9; // Polygon Mumbai network Chainlink Oracle
        jobId = "a82495a8fd5b4cb492b17dc0cc31a4fe"; // HTTP GET request receiving a JSON bytes32 (string) result of Property information
        fee = 0.1 * 10**18; // 0.1 LINK fee
    }

    function setFees(uint8 percent) private onlyHodefy {
        require(percent <= 5, "Fee rate (0% - 5%) required");
        feePercent = percent;
        emit ChangedFee(feePercent);
    }

    function changeHodefy(address newAddress) private onlyHodefy {
        hodefy = newAddress;
    }

    // We want a function that can take an address owner and verified property information and create a new Property NFT by minting
    // using the verified info. We also need a secure process to transmit data from verified legal documents proving ownership starting
    // from somewhere off-chain since having both an NFT and a bunch of legal information stored on-chain will be very expensive.
<<<<<<< Updated upstream
    function requestPropertyData()
        public
        onlyHodefy
        returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
=======
    function requestPropertyData(string memory _propertyID) external onlyHodefy returns(bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
>>>>>>> Stashed changes

        request.add("get", string(abi.encodePacked("http://localhost:4000/properties/", _propertyID)));

        request.add("path", "1.project.ownerAddress");
        request.add("path", "1.project.streetAddress");
        request.add("path", "1.project.city");
        request.add("path", "1.project.country");
        request.add("path", "1.project.link");

        return sendChainlinkRequestTo(oracle, request, fee);
    }

    // Like the name says, convert a bytes32 variable to a string one
    function bytes32ToString(bytes32 _bytes32)
        public
        pure
        returns (string memory)
    {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    // Request all necessary Property data in order to mint a corresponding NFT
    function fulfill(
<<<<<<< Updated upstream
        bytes32 _requestId,
        bytes32 ownerAddress,
        bytes32 city,
        bytes32 country,
        bytes32 streetAddress,
        bytes32 file
    ) public recordChainlinkFulfillment(_requestId) {}
=======
        bytes32 _requestId, 
        bytes32 _ownerAddress, 
        bytes32 _city, 
        bytes32 _country, 
        bytes32 _streetAddress, 
        bytes32 _imgLink
        ) public recordChainlinkFulfillment(_requestId)
    {
        address owner = address(bytes20(_ownerAddress));
        string memory city = bytes32ToString(_city);
        string memory country = bytes32ToString(_country);
        string memory streetAddress = bytes32ToString(_streetAddress);
        string memory imgLink = bytes32ToString(_imgLink);

        // Property newProperty = new Property(streetAddress, city, country, imgLink, owner);

        //ownerToProperties[owner].push(newProperty);
    }

>>>>>>> Stashed changes
}

contract Property is Hodefy, ERC721A {
    address public nftAddress; // Address of the NFT for this asset
    address public owner; // Address of the property owner
    address public tenant; // Tenant wallet address

    //string public name; // Descriptive name of the property -> determined in constructor
    string public streetAddress; //  Real life street address of the property -> determined in constructor
    string public city;
    string public country;
    string public imgLink; // Link to a descriptive image of the property

    uint256 immutable id; // ID # of the Property
    uint256 rentPerMonth;

    // MAPPINGS
    mapping(address => uint256) public bidders; // Maps bidder addresses to bid amounts (only bids on this property)

    // EVENTS
    event Leased(uint256 indexed id, uint256 rent, address indexed tenant); // Add lease duration later
    event RentPerMonthSetTo(uint256 indexed id, uint256 WEIs);
    event NewBidder(
        uint256 indexed id,
        address indexed bidder,
        uint256 indexed amount
    );

    // MODIFIERS
    modifier onlyPropertyOwner(Property property) {
        require(msg.sender == property.owner());
        _;
    }

    modifier notOwner(Property property) {
        require(msg.sender != property.owner());
        _;
    }

<<<<<<< Updated upstream
    constructor(string memory _streetAddress, uint256 _rentPerMonth)
        ERC721A("Property", "PROPERTY")
    {
=======
    constructor(
        string memory _streetAddress, 
        string memory _city,
        string memory _country,
        string memory _imgLink,
        address _owner
        /*, uint _rentPerMonth*/) ERC721A("Property", "PROPERTY") {
        require(msg.sender == hodefy, "Only Hodefy can mint Property NFTs.");
>>>>>>> Stashed changes
        streetAddress = _streetAddress;
        city = _city;
        country = _country;
        imgLink = _imgLink;
        //owner = msg.sender; // Later we want to get the owner address from the Hodefy contract or the minted NFT
        // nftAddress
        id = propertyID;
        propertyID++;
        owner = _owner;
        // rentPerMonth = _rentPerMonth;

        _safeMint(owner, 1);
    }

    receive() external payable {
        revert(
            "Please do not send funds directly to this property smart contract address."
        );
    }

    function lease(address _tenant) public onlyPropertyOwner(this) {
        tenant = _tenant;
        emit Leased(id, rentPerMonth, _tenant);
    }

    function setRentperMonth(uint256 _rent) public onlyPropertyOwner(this) {
        rentPerMonth = _rent;
        emit RentPerMonthSetTo(id, rentPerMonth);
    }

    function isBidder(address _address) public view returns (bool) {
        return bidders[_address] > 0;
    }

    // Property can't bid on their own properties (at least not from the wallet they registered the property from)
    // to aritificially prop up the price on their property
    function bid() external payable notOwner(this) {
        address bidder = msg.sender;
        uint256 amount = msg.value;
        bidders[bidder] = msg.value;
        emit NewBidder(id, bidder, amount);
    }
}
