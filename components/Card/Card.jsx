import { useRouter } from 'next/router'
import React from 'react'

const Card = ({contract}) => {

  const router = useRouter()

  const handleClick = ()=>{
    router.push(`/campaigns/${contract}`)
  }

  return (
    <div className="card max-w-[80vw] md:max-w-96 bg-base-100 shadow-xl image-full">
      {/* <div cl>
      <figure style={{height:'200px !important'}}><img className='w-[550px]' style={{height:'200px !important'}} src="https://source.unsplash.com/random/200x200/?black" alt="Campaign" /></figure>
      </div> */}
      <div className="card-body">
        <h2 className="card-title md:block hidden break-normal">{contract}</h2>
        <h2 className="card-title md:hidden block break-normal">{contract.substring(1,23)+'...'}</h2>
        <p></p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleClick}>View Campaign</button>
        </div>
      </div>
    </div>
  )
}

export default Card