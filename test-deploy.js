const { ethers } = require("ethers");
const fs = require("fs-extra");

async function main() {
  // compile them in the Code so that it can automaticaly run
  //  or compile them separately by run deploy
  // http://127.0.0.1:7545 //ganache rpc url
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  // JsonRpcProvider
  // add wallet
  const privateKey =
    "0x5b03832574505bf153109104a2889efe99eab3e467dc4dbf782fa06b730897f8";
  const wallet = new ethers.Wallet(privateKey, provider);

  // add abi and bin file
  const abi = fs.readFileSync("./simplestorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./simplestorage_sol_SimpleStorage.bin",
    "utf8"
  );

  // add contract factory and Transaction receipt
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying please wait ....");

  // to add override eg gasprice, gasLimit
  // const contract = await contractFactory.deploy({gasPrice : 10000000, gasLimit: 1000000000}); // stop here! wait for contrac to deploy

  // Transaction receipt
  const contract = await contractFactory.deploy();
  await contract.deploymentTransaction();
  //   const deploymentReceipt = await contract.deploymentTransaction();
  //   console.log(deploymentReceipt);

  // //----------------------------------------------
  // // to represent the sign & send transaction data with js
  // console.log("deploy transaction data ");
  //   const nonce = await wallet.getNonce();
  // const tx = {
  //   nonce: nonce,
  //   gasPrice: 20000000000,
  //   gasLimit: 1000000,
  //   to: null,
  //   value: 0,
  //  // data: add bin address
  //   chainId: 1337,

  // // to sign
  // const signedTxResponse = await wallet.signTransaction(tx);
  // console.log(signedTxResponse);

  // // //to send
  // const sentTxResponse = await wallet.sendTransaction(tx);
  // // await sentTxResponse.wait(1);
  // console.log(sentTxResponse);
  //   const nonce = await wallet.getNonce();

  // interact wtih Code
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current favorite Number: ${currentFavoriteNumber.toString()}`);

  const transactionReponse = await contract.store("7");
  const transactionReceipt = await transactionReponse.wait(1);
  const currentNonce = await provider.getTransactionCount(wallet.address);

  const updatedFavvoriteNumber = await contract.retrieve();
  console.log(`updated favorite number is: ${updatedFavoriteNumber}`);
  //   console.log(currentFavoriteNumber);
}
// // call main
main()
  .then(() => process.exit(0))

  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
