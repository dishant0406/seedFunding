import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://frosty-capable-card.ethereum-goerli.discover.quiknode.pro/57a47e849babccd5f99103c5cbb07ce77eb22178/"
  );
  web3 = new Web3(provider);
}

export default web3;