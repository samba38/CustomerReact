import { useState, useEffect } from "react";
import Header from '../Header'
import './index.css'
const CustomerEditForm=(props)=>{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState(false);
  const [errorApi, setErrorApi]=useState('')
  

    const {match}=props 
    const {params}=match 
    const {id}=params
  const onChangeFisrt=(event)=>{
    setFirstName(event.target.value)
  }
  const onChnageLast=(event)=>{
    setLastName(event.target.value)
  }
  const onChangePhone=(event)=>{
    setPhoneNumber(event.target.value)
  }
  

  const onSubmitForm=async (event)=>{
    event.preventDefault()
    const updateCustomer = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    }
    
    if (firstName==='' || lastName==="" || phoneNumber===''){
        setErrors(true)
    }else{
        let options={
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateCustomer),
        };
        const apiUrl=`https://customerserver-6.onrender.com/api/customers/${id}`
        const response= await fetch(apiUrl, options)
        if (response.ok===true){
          const fetchData= await response.json()
          setErrorApi('Customer edited')
          

        } else{
            setErrorApi('Failed to edit customer')
        }
    }
    
  }
  return (
    <>
     <Header/>
      <div>
      <h1 className="editing-customer">Add New Customer</h1>
     <form className='form-conatiner-edit' onSubmit={onSubmitForm}>
      <h1 className="given-details-edit">Give Customer Details</h1>
    <div className='form-row-edit'>
       <label htmlFor='firstName' className='label-input-edit'>First Name</label>
       <input
        type='text'
        value={firstName}
        className="input-add-edit"
        id='firstName'
        onChange={onChangeFisrt}
        placeholder="First Name"
       />
    </div>
    <div className='form-row-edit'>
       <label htmlFor='lastName' className='label-input-edit'>Last Name</label>
       <input
        type='text'
        value={lastName}
        className="input-add-edit"
         onChange={onChnageLast}
        id='lastName'
        placeholder="Last Name"
       />
    </div>
    <div className='form-row-edit'>
       <label htmlFor='phone' className='label-input-edit'>Phone Number</label>
       <input
        type='text'
        value={phoneNumber}
        className="input-add-edit"
        onChange={onChangePhone}
        id='phone'
        placeholder="Phone Number"
       />
    </div>
      <button type='submit' className='edit-customer-form-btn'>Edit Customer</button>
      {errors && <p className="error-form-edit">please enter name and number correctly</p>}
      <p className="api-details-form-edit">{errorApi}</p>
      
     </form>
     </div>
    </>
  )
}

export default CustomerEditForm