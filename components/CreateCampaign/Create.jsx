import React from 'react'

const Create = () => {
  return (
    <div>
      <label htmlFor="my-modal-4" className="btn btn-wide gap-2 btn-primary">
      <i className="fa-solid  text-[18px] text-white fa-circle-plus"></i>
        Create Campaign
      </label>
      
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Create a Campaign</h3>
          <div className="form-control mt-4 mb-3">
            <label className="label">
              <span className="label-text">Campaign Name</span>
            </label>
            <label className="input-group">
              <span>Name</span>
              <input type="text" placeholder="My Campaign" className="input w-[100%] input-bordered" />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Minimum Contribution</span>
            </label>
            <label className="input-group">
              <input step=".01" type="number" placeholder="0.01" className="input w-[100%] input-bordered" />
              <span>ETH</span>
            </label>
          </div>
          <div className='w-full flex justify-center'>
          <button className="btn btn-primary btn-wide mt-6">Create</button>
          </div>
        </label>
      </label>
    </div>
  )
}

export default Create