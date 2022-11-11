import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { useRouter } from 'next/router';
import Create from '../CreateCampaign/Create';

const DashBoard = ({contract}) => {
  const router = useRouter()
  const [camp, setCampaign]=useState(contract)
  const [newCreate, setnewCreate] = useState(false)

  useEffect(()=>{

  },[newCreate])

  return (
    <div>
      <div className='flex w-[100vw] md:w-[95vw] justify-center'>
        <Create setNewCreate={setnewCreate}/>
      </div>
      <div className='h-[85vh] flex-wrap gap-[2rem] w-[100vw] md:w-[95vw] flex items-start pt-[2rem] justify-center'>
          {camp.map((con, i)=>{
            return <Card key={i} contract={con}/>
          })}
          
      </div>
    </div>
  )
}

export default DashBoard