import React from 'react'
import Card from '../Card/Card'
import { useRouter } from 'next/router';
import Create from '../CreateCampaign/Create';

const DashBoard = ({contract}) => {
  const router = useRouter()

  return (
    <div>
      <div className='flex w-[95vw] justify-center'>
        {/* <button onClick={()=>router.push('/campaigns/new')} className="btn btn-wide gap-2 btn-primary">
          <i className="fa-solid  text-[18px] text-white fa-circle-plus"></i>
          Create Campaign
        </button> */}
        <Create/>
      </div>
      <div className='h-[85vh] flex-wrap gap-[2rem] w-[95vw] flex items-center justify-center'>
          {contract.map(con=>{
            return <Card contract={con}/>
          })}
          
      </div>
    </div>
  )
}

export default DashBoard