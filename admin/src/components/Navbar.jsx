import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-3 justify-between px-[4%]'>
      {/* <img src={assets.logo} className='w-[max(10%,80px)]' alt="" /> */}
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      <button onClick={()=>setToken("")} className='px-5 py-2 bg-black text-white sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
