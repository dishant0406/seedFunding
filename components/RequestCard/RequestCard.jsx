import React, { useState } from 'react'
import web3 from '../../eth/web3'
import { useRouter } from 'next/router';

const RequestCard = ({request,totalApprovers,campaign, index, id}) => {
  const [loading, setLoading]=useState(false)
  const [error, setErr] =useState('')
  const router = useRouter()
  const [finalLoading, setFinalLoading] = useState(false)

  const handleApprove = async ()=>{
    try{
      setLoading(true)
      setErr('')
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.approveRequest(index).send({
        from: accounts[0]
      })
      router.replace(`/campaigns/${id}/requests`)
    }catch(err){
      if(err.message.includes(':')){
        setErr(err.message.split(':')[1])
      }
      else{
        setErr(err.message)
      }
    }
    setLoading(false)
  }

  const handleFinal = async ()=>{
    try{
      setFinalLoading(true)
      setErr('')
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.finalizeRequest(index).send({
        from: accounts[0]
      })
      router.replace(`/campaigns/${id}/requests`)
    }catch(err){
      if(err.message.includes(':')){
        setErr(err.message.split(':')[1])
      }
      else{
        setErr(err.message)
      }
    }
    setFinalLoading(false)
  }

  return (
    <div>
      <div className={`card ${request.complete? 'bg-error-content':'bg-neutral'}  w-96 shadow-2xl`}>
      {error!='' && <div className='w-[100%] flex justify-center'>
        <div className="alert w-[80%] alert-error shadow-lg mt-[1rem]">
              <div>
                <svg onClick={()=>setErr('')} xmlns="http://www.w3.org/2000/svg" className="stroke-current hover:scale-[1.1] transition cursor-pointer flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            </div>
        </div>}
        <div className="card-body items-center text-center">
          <p className="card-title mb-[0]">Request For</p>
          <p className="stat-value mt-[0]">{web3.utils.fromWei(request.value, 'ether')+' Ether'}</p>
          <p>{request.description}</p>
          <div className="stat pt-[0]">
            <div className="stat-value">{request.approvalCount}/{totalApprovers}</div>
            <div className="stat-desc">Total Number of Approvals</div>
        </div>
          <div className="card-actions justify-end">
            {!loading && <button onClick={handleApprove} className={`btn  ${request.complete ?'btn-disabled':''} btn-success`}>{request.complete?'Request Approved':'Approve'}</button>}
            {loading && <button className={`btn btn-success loading`}>Loading</button>}
            {!finalLoading && <button onClick={handleFinal} className={`btn  ${request.complete ?'btn-disabled hidden':''} btn-primary`}>{request.complete?'Finilize':'Finalize'}</button>}
            {finalLoading && <button className={`btn loading btn-primary`}>Loading</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestCard