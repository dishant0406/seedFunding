import React, { useState } from 'react'
import web3 from '../../eth/web3'
import Campaign from '../../eth/campaign'
import { useRouter } from 'next/router';

const Contribute = ({summary, id}) => {
  const [contri, setContri] = useState('')
  const [error, setErr] = useState('')
  const [loading, setLoading] = useState('')
  const router = useRouter()
  const CampaignInstance = Campaign(id)
  

  const handleSubmit = async () =>{
      try{
        setLoading(true)
        setErr('')
        const accounts = await web3.eth.getAccounts()
        console.log(web3.utils.toWei(contri, 'ether'))
        await CampaignInstance.methods.contribute().send({
          from:accounts[0],
          value:web3.utils.toWei(contri, 'ether')
        })
        setLoading(false)
        router.replace(`/campaigns/${id}`)
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

  return (
    <div className='w-[100vw] flex items-center flex-col mt-[3rem]'>
        <div style={{boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}} className='bg-neutral w-[90vw] md:w-[25rem] flex items-center flex-col p-6 rounded-[30px]'>
        {error!='' && <div className="alert alert-error shadow-lg mb-[1rem]">
            <div>
              <svg onClick={()=>setErr('')} xmlns="http://www.w3.org/2000/svg" className="stroke-current hover:scale-[1.1] transition cursor-pointer flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          </div>}
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Enter amount</span>
            </label>
            <label className="input-group">
              <span>Contri</span>
              <input value={contri} onChange={(e)=>setContri(e.target.value)} type="number" placeholder={web3.utils.fromWei(summary[0], 'ether')+' Min'} className="input input-bordered" />
              <span>ETH</span>
            </label>
          </div>
          {!loading && <button onClick={handleSubmit} className="btn btn-primary btn-wide mt-6">Contribute</button>}
          {loading && <button className="btn loading btn-primary btn-wide mt-6">loading</button>}
        </div>
      </div>
  )
}

export default Contribute