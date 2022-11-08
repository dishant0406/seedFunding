import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import factory from '../eth/factory'

const Home = ({data}) => {
  const [deployedContract, setDeployedContracts] = useState(data)

  console.log(deployedContract)
  return (
    <div className=''>
      <NavBar/>
    </div>
    )

}

Home.getInitialProps = async ()=>{
  const data = await factory.methods.getDeployedCampaigns().call() 
  return {
    data
  }
}
  
export default Home