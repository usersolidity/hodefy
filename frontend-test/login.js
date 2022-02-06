const login = document.getElementById("login");
login.addEventListener("click", async function() {
    console.log('inside login')
    Moralis.start({serverUrl: "https://6ffhz4creez7.usemoralis.com:2053/server", appId:"SdgLZF7xFQqBhq60SebMci2A1a8DlBKHJDqrTFKb"});
    // Moralis.serverUrl = "https://6ffhz4creez7.usemoralis.com:2053/server";
    
    let currentUser = Moralis.User.current();
    console.log("currentUser ", currentUser);
    if (!currentUser) {
        currentUser = await Moralis.authenticate();
    }
    const ownerWalletAddress =  currentUser.get('ethAddress');
    console.log(`User address: ${ownerWalletAddress}`)
});