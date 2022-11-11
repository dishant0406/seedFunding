import React from 'react'
import Contribute from '../../../components/Contribute/Contribute'
import NavBar from '../../../components/NavBar/NavBar'
import Stat from '../../../components/Stat/Stat'
import CampaignContract from '../../../eth/campaign'
import { useRouter } from 'next/router';

const Campaign = ({summary, id, name}) => {
  const router = useRouter()

  return (
    <div>
      <NavBar/>
      <h3 className='stat-value text-center'>{name}</h3>
      <Stat stats={summary}/>
      <Contribute id={id} summary={summary}/>
      <div className='w-[100vw] mt-[2rem]  flex justify-center'>
        <button onClick={()=>router.push(`/campaigns/${id}/requests`)} class="btn btn-accent">View All requests</button>
      </div>
    </div>
  )
}

export async function getServerSideProps({params}){
  const {id} = params
  const campInstance = CampaignContract(id)

  const summary = await campInstance.methods.getSummary().call()
  const name = await campInstance.methods.CampaignName().call()
  return {
    props:{summary:Object.values(summary), id, name}
  }
}

export default Campaign