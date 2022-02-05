// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.10;

contract MyHomeContract {
    struct Home{
        address Hodefy;
        string description;
        uint price;
        uint PropertyID; 
    }

    address public Hodefy; // Hodefy who creates the contract

    uint public PropertiesTotal; // total of Properties at any moment

    // Hodefy contract creation 
    function myHomeContract() public 
    {
        Hodefy = msg.sender;
        PropertiesTotal = 0; 
    }

    //4. Number of properties 
    function getNoOfHomes(address _homeHolder) public view returns (uint){
        return _ownedHomes[_homeHolder].length;
    }

    //Properties (Add)
    event Add(address _Hodefy, uint _PropertyID);
    //Property (transfer)
    event Transfer(address indexed _from, address indexed _to, uint _PropertyID);

    modifier isHodefy{
        require(msg.sender == Hodefy);
        _; 
    }

    //MAPPINGS 
    //Hodefy of Homes : How many Home an account have
    mapping(address => Home[]) public _ownedHomes; 

    //1. FIRST OPERATION 
    //Hodefy add Homes via this function 

    function addHome(string memory _description, uint _price) public isHodefy{
        PropertiesTotal += 1 ; 
        Home memory myHome = Home(
            {
                Hodefy: msg.sender, 
                description: _description,
                price: _price,
                PropertyID: PropertiesTotal
            });
        _ownedHomes[msg.sender].push(myHome);
        emit Add(msg.sender, PropertiesTotal);


    }

    function getHome(address _homeHolder, uint _index) public returns (string memory, uint, address,uint){
        
        return (_ownedHomes[_homeHolder][_index].description,
                _ownedHomes[_homeHolder][_index].price,
                _ownedHomes[_homeHolder][_index].Hodefy,
                _ownedHomes[_homeHolder][_index].PropertyID);
    }


    //2.SecondOperation 
    //caller (Hodefy/anyone) to transfer land to buyer provided caller is Hodefy of the land 
    function transferHome(address _HomeBuyer, uint _PropertyID) public returns(bool){
        // find out particular land ID in Hodefy's collection 
        for(uint i=0; i < (_ownedHomes[msg.sender].length); i++){
            // if given Home ID is indeed in Hodefy's collection 
            if (_ownedHomes[msg.sender][i].PropertyID == _PropertyID){
                Home memory myHome = Home(
                    {
                        Hodefy: _HomeBuyer,
                        description : _ownedHomes[msg.sender][i].description,
                        price: _ownedHomes[msg.sender][i].price,
                        PropertyID: _PropertyID
                }); 
                }
            }
        }
    }
