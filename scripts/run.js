const main = async () => {
    const hodefyContractFactory = await hre.ethers.getContractFactory("hodefy");
    const hodefyContract = await hodefyContractFactory.deploy();
    await hodefyContract.deployed();
    console.log("Contract deployed to:", hodefyContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();