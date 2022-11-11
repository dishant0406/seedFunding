import React from 'react'
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter()

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <button onClick={()=>router.push('/')} className="btn btn-ghost normal-case text-xl">SeedFunding</button>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li><a>Campaign</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar