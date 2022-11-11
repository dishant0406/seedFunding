import React, { useEffect } from 'react'
import Contribute from '../../components/Contribute/Contribute'
import NavBar from '../../components/NavBar/NavBar'
import Stat from '../../components/Stat/Stat'
import CampaignContract from '../../eth/campaign'

const Campaign = ({summary, id}) => {
  return (
    <div>
      <NavBar/>
      <Stat stats={summary}/>
      <Contribute id={id} summary={summary}/>
    </div>
  )
}

export async function getServerSideProps({params}){
  const {id} = params
  const campInstance = CampaignContract(id)

  const summary = await campInstance.methods.getSummary().call()
  return {
    props:{summary:Object.values(summary), id}
  }
}

export default Campaign