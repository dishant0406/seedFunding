const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs-extra')
const Web3 = require('web3');
const CampaignFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'easy bunker pass enroll sausage tribe green suit slow party damage cake',
  // remember to change this to your own phrase!
  'https://frosty-capable-card.ethereum-goerli.discover.quiknode.pro/57a47e849babccd5f99103c5cbb07ce77eb22178/'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(CampaignFactory.interface))
    .deploy({ data: CampaignFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);

  const storeTheAddress = async () => {
    try {
      await fs.outputFile(`${__dirname}/deployedAddress.js`, `{deployedAddress: ${result.options.address}}`)
    } catch (err) {
      console.error(err)
    }
  }

  storeTheAddress()

  provider.engine.stop();
};
deploy();