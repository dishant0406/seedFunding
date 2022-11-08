import web3 from './web3.js'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0xdFB07Fef1859d1FCCBa0422518c9e4cF091b3De9')

export default instance;