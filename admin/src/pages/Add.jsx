import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios"
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image, setImage] = useState(false)
  const [empId, setEmpId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [designation, setDesignation] = useState("HR")
  const [course, setCourse] = useState("MCA")
  const [gender, setGender] = useState("Male")

  const onSubmitHandler = async (e) =>{
       e.preventDefault();
       try {
        const formData = new FormData();

        formData.append("empId",empId);
        formData.append("name",name);
        formData.append("email",email);
        formData.append("phone",phone);
        formData.append("designation",designation);
        formData.append("course",course);
        formData.append("gender",gender);

        formData.append("image",image);

        const response = await axios.post(backendUrl+"/api/employee/add",formData,{headers:{token}});
        if(response.data.success){
          console.log(response.data);
          
            toast.success(response.data.message)
            setEmpId("")
            setName("")
            setEmail("")
            setPhone("")
            setDesignation("")
            setCourse("")
            setImage("")
        }else{
          toast.error(response.data.message)
        }
        

       } catch (error) {
        toast.error(error.message)
       }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div>
          <label htmlFor="image">
            <img className='w-20' src={image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" accept='image/jpg,png' hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Employee Id</p>
        <input onChange={(e) =>setEmpId(e.target.value)} value={empId} className='px-3 py-2 w-full max-w-[500px]' type="Number" placeholder='type here..' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Employee Name</p>
        <input onChange={(e) =>setName(e.target.value)} value={name} className='px-3 py-2 w-full max-w-[500px]' type="text" placeholder='type here..' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Employee Email</p>
        <input onChange={(e) =>setEmail(e.target.value)} value={email} className='px-3 py-2 w-full max-w-[500px]' type="email" placeholder='type here..' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Employee Phone Number</p>
        <input onChange={(e) =>setPhone(e.target.value)} value={phone} className='px-3 py-2 w-full max-w-[500px]' type="phone" placeholder='type here..' required />
      </div>
      

      <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>

      <div>
           <p className='mb-2'> Employee Designation</p>
           <select onChange={(e) =>setDesignation(e.target.value)} value={designation} className='w-full px-3 py-2'>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
           </select>
        </div>
      <div>
           <p className='mb-2'> Course</p>
           <select onChange={(e) =>setCourse(e.target.value)} value={course} className='w-full px-3 py-2 md:w-[170px]'>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
           </select>
        </div>


        <div>
           <p className='mb-2'>Gender</p>
           <select onChange={(e) =>setGender(e.target.value)} value={gender} className='w-full  px-3 py-2'>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
           </select>
           
        </div>

      </div>

      <button type='submit' className='py-3 mt-4 w-48 bg-emerald-500 text-white'>ADD EMPLOYEE</button>

    </form>
  )
}

export default Add
