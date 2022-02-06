// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import {ISuperfluid, ISuperToken, ISuperTokenFactory} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ERC20WithTokenInfo} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/tokens/ERC20WithTokenInfo.sol";

contract initHodefyToken {
    event NewSuperToken(address _contractAddress);
    mapping(address => address) superTokenRegistry;

    ISuperfluid private _host; // Goerli host:

    //  Mumbai host:

    constructor(address _sfHost) {
        _host = ISuperfluid(_sfHost); // Superfluid host address
    }

    function createHodefyToken(ERC20WithTokenInfo HodefyToken)
        public
        returns (ISuperToken HodefySupToken)
    {
        // Goerli Hodefy Token address:
        // Mumbai Hodefy Token address:
        // name: Hodefy
        // symbol: HDF

        string memory name = string(
            abi.encodePacked("Super ", HodefyToken.name())
        );
        string memory symbol = string(
            abi.encodePacked(HodefyToken.symbol(), "x")
        );

        ISuperTokenFactory factory = _host.getSuperTokenFactory();
        HodefySupToken = factory.createERC20Wrapper(
            HodefyToken,
            ISuperTokenFactory.Upgradability.FULL_UPGRADABE,
            name,
            symbol
        );

        superTokenRegistry[address(HodefyToken)] = address(HodefySupToken);
        emit NewSuperToken(address(HodefySupToken));
    }

    function getSuperToken(ERC20WithTokenInfo unwrappedToken)
        public
        view
        returns (address superTokenAddress)
    {
        superTokenAddress = superTokenRegistry[address(unwrappedToken)];
    }
}
