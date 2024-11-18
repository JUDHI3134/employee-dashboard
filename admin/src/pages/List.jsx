import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])
  const [query, setQuery] = useState("")

  const fetchList = async () =>{
      try {
        const response = await axios.get(backendUrl+"/api/employee/list")
        if (response.data.success) {
          setList(response.data.employees);
          
        }else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
        console.log(error);       
        toast.error(error.message)
      }
  }

  const filterName = list.filter((itemm) => itemm.name.toLowerCase().includes(query))
  
  

  const removeProduct = async (id) =>{
    try {
      const response = await axios.post(backendUrl+"/api/employee/remove",{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        fetchList();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <>
    <div className='flex justify-between items-center'>
      <p className='mb-2 font-bold'>All Employee List</p>
      <p>Total Count : {filterName.length}</p>
    <input className='px-3 py-2 w-full max-w-[500px] mb-2' type="text" name="" id="" onChange={(e)=>setQuery(e.target.value.toLowerCase())} placeholder='Search employee using name'/>
    </div>
      <div className='flex flex-col gap-2'>

      {/* table Title  */}
      <div className='hidden md:grid grid-cols-[0.5fr_0.5fr_0.5fr_1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Emp Id</b>
        <b>Name</b>
        <b>Email</b>
        <b>Phone No.</b>
        <b>Designation</b>
        <b>Course</b>
        <b>Gender</b>
        <b>Create Date</b>
        <b className='text-center'>Action</b>
      </div>

      {/* -----------employee List-------- */}
      { filterName
        .map((item,index)=>(
          <div className='grid grid-cols-[0.5fr_0.5fr_0.5fr_1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image} alt="" />
            <p>{item.empId}</p>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.phone}</p>
            <p className='text-center'>{item.designation}</p>
            <p className=' text-sm'>{item.course}</p>
            <p>{item.gender}</p>
            <p>{item.createdAt}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
      }

      </div>
    </>
  )
}

export default List
