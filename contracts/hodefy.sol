// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0;

contract Hodefy {
    address internal hodefy = 0xcD0308D313678777820010d0467430362936F57b; // Address of my (Phil's) ETH wallet is the Hodefy admin
    // Replace with official Hodefy company wallet later

    uint256 internal propertyID; // Largest property ID

    uint8 internal feePercent = 2; // Fee rate expressed as an integer, default is 2
    // uint8 avgBlockTime;

    // MAPPINGS
    mapping(address => mapping(address => uint256)) private allowed; // allowance by Hodefy

    // EVENTS
    event ChangedFee(uint8 NewFee);

    // MODIFIERS
    modifier onlyHodefy {
        require(msg.sender == hodefy);
        _;
    }

    function setFees(uint8 percent) public onlyHodefy {
        require(percent <= 5, "Fee rate (0% - 5%) required");
        feePercent = percent;
        emit ChangedFee(feePercent);
    }
    
}

contract Property is Hodefy{
    address public nftAddress; // Address of the NFT for this asset 
    address public owner; // Address of the property owner
    address public tenant; // Tenant wallet address

    string public name; // Descriptive name of the property -> determined in constructor
    string public streetAddress; //  Real life street address of the property -> determined in constructor

    uint id; // ID # of the Property
    uint rentPerMonth;

    // MAPPINGS
    mapping(address => uint) public bidders; // Maps bidder addresses to bid amounts (only bids on this property)

    // EVENTS
    event Leased(uint indexed id, uint rent, address indexed _tenant); // Add lease duration later
    event RentPerMonthSetTo(uint indexed id, uint WEIs);
    event NewBidder(uint indexed id, address indexed bidder, uint indexed amount);

    // MODIFIERS
    modifier onlyPropertyOwner(Property property) {
        require(msg.sender == property.owner());
        _;
    }

    modifier notOwner(Property property) {
        require(msg.sender != property.owner());
        _;
    }

    receive() external payable {
        revert("Please do not send funds directly to this property smart contract address.");
    }

    constructor(
        string memory _name, 
        string memory _streetAddress,
        uint _rentPerMonth
    ) {
        name = _name;
        streetAddress = _streetAddress;
        owner = msg.sender; // Later we want to get the owner address from the Hodefy contract or the minted NFT
        // nftAddress 
        id = propertyID;
        propertyID++;
        rentPerMonth = _rentPerMonth;
    }

    function lease(address _tenant) public onlyPropertyOwner(this) {
        tenant = _tenant;
        emit Leased(id, rentPerMonth, _tenant);
    }
 
    function setRentperMonth(uint _rent) public onlyPropertyOwner(this) {
        rentPerMonth = _rent; 
        emit RentPerMonthSetTo (id, rentPerMonth);
    }

    function isBidder(address _address) public view returns(bool) {
        return bidders[_address] > 0;
    }

    function bid() external payable notOwner(this) {
        address bidder = msg.sender;
        uint amount = msg.value;
        bidders[bidder] = msg.value;
        emit NewBidder(id, bidder, amount);
    }
}