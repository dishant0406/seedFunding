import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import DashBoard from '../components/DashBoardSection/DashBoard'

import NavBar from '../components/NavBar/NavBar'
import factory from '../eth/factory'

const Home = ({data}) => {
  const [deployedContract, setDeployedContracts] = useState(data)

  return (
    <>
    <Head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </Head>
    <div className='relative'>
      <NavBar/>
      <DashBoard contract={deployedContract}/>
    </div>
    </>
    )

}

export async function getServerSideProps(){
  const data = await factory.methods.getDeployedCampaigns().call() 
  return {
    props:{data},
  }
}
  
export default Home