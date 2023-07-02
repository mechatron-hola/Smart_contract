const { ethers } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  // compile them in the Code so that it can automaticaly run
  //  or compile them separately by run deploy
  // http://127.0.0.1:7545 //ganache rpc url
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545"); // JsonRpcProvider
  const privateKey =
    "0x5b03832574505bf153109104a2889efe99eab3e467dc4dbf782fa06b730897f8"; // add wallet
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

  // Transaction receipt
  const contract = await contractFactory.deploy();
  await contract.deploymentTransaction();

  // interact wtih Code
  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current favorite Number: ${currentFavoriteNumber.toString()}`);

  // to get nonce
  const currentNonce = await provider.getTransactionCount(wallet);
  const transactionReponse = await contract.store(7, { nonce: currentNonce });

  const transactionReceipt = await transactionReponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`updated favorite number is: ${updatedFavoriteNumber}`);
}
// // call main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
