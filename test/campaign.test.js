const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')

//Web3 instance with the provider from ganache
const web3 = new Web3(ganache.provider())

//requiring the two contracts
const compiledFactoryCode = require('../eth/build/CampaignFactory.json')
const compiledCampaignCode = require('../eth/build/Campaign.json')

//variables for later use
let accounts
let factory
let campaignAddress
let campaign

beforeEach(async () => {
  //getting the list of accounts
  accounts = await web3.eth.getAccounts()

  //deploying the contract
  //1. pass the compiledfactorycode interface as a object to web3.eth.Contract
  //2. then pass the bytecode as data in deploy
  //then use the account at 0 index with gas to send and deploy

  factory = await new web3.eth.Contract(JSON.parse(compiledFactoryCode.interface))
    .deploy({ data: compiledFactoryCode.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

  //creating the campaign using the method in the factory contract
  await factory.methods.createCampaign('100', 'Campaign 1').send({ from: accounts[0], gas: '1000000' })

  //getting the address of the deployed contract that is stored inside the contract in a array
  const addressesArray = await factory.methods.getDeployedCampaigns().call()
  campaignAddress = addressesArray[0]

  //getting the campaign that is deployed using the web3.contract method
  //and passing the interface of the code with the deployed address
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaignCode.interface), campaignAddress)
})

describe('Campaign', () => {
  it('Deploys a Factory', () => {
    assert.ok(factory.options.address)
  })

  it('Factory Deploys a Contract', () => {
    assert.ok(campaign.options.address)
  })

  it('Manager is the person who deployed the contract', async () => {

    const manager = await campaign.methods.getManager().call()
    assert.equal(manager, accounts[0])
  })

  it('People can Contribute money and they will be added to the approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    })

    const isAvailable = await campaign.methods.approvers(accounts[1]).call();
    assert.equal(isAvailable, true);
  })

  it('Requires a minimum contribution to contribute', async () => {
    try {

      await campaign.methods.contribute().send({
        value: '5',
        from: accounts[1]
      })

      assert(false)

    } catch (err) {

      assert(err)

    }
  })

  it('allows a manager to make a payment request', async () => {
    await campaign.methods.createRequest('Make Website', '150', accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal(request.value, '150')
  })
})