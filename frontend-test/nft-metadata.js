const uploadElem = document.getElementById("upload");
uploadElem.addEventListener("click", upload)

function sendNFTpayload(metadataURI, ownerAddress, ) {

}

/**
 * Upload data from property POST form to IPFS dex storage.
 * @returns {Object} - fields of object: medatadataURI, ownerAddress
 */
async function upload(){
    const ownerWalletAddress = Moralis.User.current().get('ethAddress');
    const fileInput = document.getElementById("file");
    const data = fileInput.files[0];
    console.log(`Data file properties: ${data}`)
    console.log(ownerWalletAddress)
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();
    const imageURI = imageFile.ipfs();
    const metadata = {
      "name":document.getElementById("name").value,
      "city":document.getElementById("city").value,
      "country":document.getElementById("country").value,
      "streetAddress":document.getElementById("street-address").value,
      "description":document.getElementById("description").value,
      "image":imageURI
    }
    const metadataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await metadataFile.saveIPFS();
    const metadataURI = metadataFile.ipfs();
    console.log(metadataURI);
    return metadataURI, ownerWalletAddress;
    // const txt = await mintToken(metadataURI).then(notify)
  }
