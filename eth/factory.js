import web3 from './web3.js'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0xd15887dfd35483F0bebD9af64c371376442B463F')

export default instance;