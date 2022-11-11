import React from 'react'
import CreateRequest from '../../../components/CreateRequest/CreateRequest'
import NavBar from '../../../components/NavBar/NavBar'
import CampaignContract from '../../../eth/campaign'
import { useRouter } from 'next/router';
import RequestCard from '../../../components/RequestCard/RequestCard';

const Requests = ({requestArr, approversCount}) => {
  const router = useRouter()
  const {id} = router.query
  const campInstance = CampaignContract(id)



  return (
    <div>
      <NavBar/>
      <div className='w-[98.8vw] mt-[2rem]  flex justify-center'>
        <CreateRequest id={id} campaign={campInstance}/>
      </div>
      <div className='h-[85vh] flex-wrap gap-[2rem] w-[100vw] md:w-[95vw] flex items-start pt-[2rem] justify-center'>
        {requestArr.map((e,i)=>{
          return (
            <RequestCard id={id} index={i} campaign={campInstance} totalApprovers={approversCount} request={e} key={i}/>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps({params}){
  const {id} = params
  const campInstance = CampaignContract(id)
  const requestsCount = await campInstance.methods.getRequestCount().call()
  const requestArr = []
  for(let i=0; i<requestsCount;i++){
    const request = await campInstance.methods.requests(i).call()
    requestArr.push(
      {
        description:request.description,
        value:request.value,
        recipient:request.recipient,
        complete:request.complete,
        approvalCount:request.approvalCount
      }
      
      )
  }

  const approversCount = await campInstance.methods.approversCount().call()

  return {
    props:{
      requestArr,
      approversCount
    }
  }
}

export default Requests