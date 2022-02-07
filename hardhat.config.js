/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.11",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/5jrADLRTHUWH6wAgj9GDJW_No8j_laem",
      accounts: ["125d7bcd1ccbacf95263f19d4267820e7058e32e70380055f77336b9c9a03248"],
    },
  },
};
