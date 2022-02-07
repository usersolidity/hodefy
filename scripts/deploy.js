const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());
  
    const hodefyContractFactory = await hre.ethers.getContractFactory('Hodefy');
    const hodefyContract = await hodefyContractFactory.deploy({
        //value: hre.ethers.utils.parseEther("0.002"),
        gasLimit: hre.ethers.utils.parseUnits("0.02", 18),
      });
    await hodefyContract.deployed();
  
    console.log('Hodefy address: ', hodefyContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();