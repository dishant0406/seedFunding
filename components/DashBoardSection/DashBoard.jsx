import React from 'react'
import Card from '../Card/Card'
import { useRouter } from 'next/router';
import Create from '../CreateCampaign/Create';

const DashBoard = ({contract}) => {
  const router = useRouter()

  return (
    <div>
      <div className='relative flex w-[100vw] md:w-[95vw] justify-center'>
        <Create/>
      </div>
      <div className='h-[85vh] flex-wrap gap-[2rem] w-[100vw] md:w-[95vw] flex items-center justify-center'>
          {contract.map(con=>{
            return <Card contract={con}/>
          })}
          
      </div>
    </div>
  )
}

export default DashBoard