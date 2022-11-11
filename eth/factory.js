import web3 from './web3.js'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0x9719D006A2a538748EE4c3E590d17414E930022b')

export default instance;