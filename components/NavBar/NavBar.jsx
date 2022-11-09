import React from 'react'

const NavBar = () => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">SeedFunding</a>
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