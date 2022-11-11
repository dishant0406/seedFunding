import React, { useState } from 'react'
import factory from '../../eth/factory'
import web3 from '../../eth/web3';
import {useRouter} from 'next/router'


const Create = () => {
  const [open, setOpen]=useState(false)
  const [name, setName] = useState('')
  const [eth, setEth]=useState(0)
  const [loading, setLoading]=useState(false)
  const [error, setErr] = useState('')
  const router = useRouter()

  const handleClick = (e)=>{
    e.stopPropagation()
    if(!loading){
      setErr('')
      setOpen(false)
      setName('')
      setEth(0)
    }
  }

  const handleCreate = async (e)=>{
    e.stopPropagation()
    try{
      setLoading(true)
      setErr('')
      const accounts = await web3.eth.getAccounts()
      await factory.methods.createCampaign(web3.utils.toWei(eth,'ether'),name).send({
        from:accounts[0]
      })
      setOpen(false)
      setName('')
      setEth(0)  
    }catch(err){
      if(err.message.includes(':')){
        setErr(err.message.split(':')[1])
      }
      else{
        setErr(err.message)
      }
    }
    setLoading(false)
    router.replace(`/`)
  }

  return (
    <div>
      <label onClick={()=>setOpen(true)} htmlFor="my-modal-4" className="btn btn-wide mb-4 gap-2 btn-primary">
      <i  className="fa-solid  text-[18px] text-white fa-circle-plus"></i>
        Create Campaign
      </label>

      
     {open && <div style={{backgroundColor: 'rgba(30,34,42, 0.7)'}} onClick={handleClick} className='w-[100vw] md:w-[98.8vw] z-[100] flex items-center justify-center h-[100vh] top-[0px] left-[0] absolute'>
          <div onClick={(e)=>{e.stopPropagation()}} style={{boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}} className="bg-[#1E222A] z-[105] opacity-[1] p-10 w-[90vw] md:w-[35vw] rounded-[30px] min-h-[55vh]" htmlFor="">
           {error!='' && <div className="alert alert-error shadow-lg mb-[1rem]">
            <div>
              <svg onClick={()=>setErr('')} xmlns="http://www.w3.org/2000/svg" className="stroke-current hover:scale-[1.1] transition cursor-pointer flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          </div>}
          <h3 className="text-lg font-bold">Create a Campaign</h3>
          <div className="form-control mt-4 mb-3">
            <label className="label">
              <span className="label-text">Campaign Name</span>
            </label>
            <label className="input-group">
              <span>Name</span>
              <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="My Campaign" className="input w-[100%] input-bordered" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Minimum Contribution</span>
            </label>
            <label className="input-group">
              <input  value={eth} onChange={(e)=>setEth(e.target.value)} step=".001" type="number" placeholder="0.01" className="input w-[100%] input-bordered" />
              <span>ETH</span>
            </label>
          </div>
          <div className='w-full flex justify-center'>
          {!loading && <button onClick={handleCreate} className="btn btn-primary btn-wide mt-6">Create</button>}
          {loading && <button className="btn loading btn-primary btn-wide mt-6">loading</button>}
          </div>
          </div>
      </div>}
    </div>
  )
}

export default Create