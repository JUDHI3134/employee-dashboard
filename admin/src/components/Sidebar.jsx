import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l" to="/add">
            <img className='h-5 w-5' src={assets.add_icon} alt="" />
            <p className='hidden sm:block'>Add Employee</p>
        </NavLink>
        <NavLink className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-3 rounded-l" to="/list">
            <img className='h-5 w-5' src={assets.parcel_icon} alt="" />
            <p className='hidden sm:block'>Employee List</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
