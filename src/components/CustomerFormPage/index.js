import { useState } from "react";
import Header from '../Header'
import './index.css'
const CustomerFormPage=()=>{
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState(false);
  const [errorApi, setErrorApi]=useState('')
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
     const newCustomer = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    }
    if (firstName==='' || lastName==="" || phoneNumber===''){
       setErrors(true)
    }else{
        let options={
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCustomer),
        };
        const API_BASE = process.env.REACT_APP_API_BASE_URL;


        let apiUrl=`${API_BASE}/api/customers`
        const response= await fetch(apiUrl, options)
        if (response.ok===true){
          const fetchData= await response.json()
          setErrorApi('Customer created')
          console.log(fetchData)
          setFirstName("");
          setLastName("");
          setPhoneNumber("");

        } else{
            setErrorApi('Failed to create customer')
        }
        
    }
  }
  return (
    <>
     <Header/>
      <div className="form-card">
      <h1 className="adding-customer">Add New Customer</h1>
     <form className='form-conatiner' onSubmit={onSubmitForm}>
    <h1 className="given-details-new">Give Customer Details</h1>
    <div className='form-row'>
       <label htmlFor='firstName' className='label-input'>First Name</label>
       <input
        type='text'
        value={firstName}
        className="input-add"
        id='firstName'
        onChange={onChangeFisrt}
        placeholder="First Name"
       />
    </div>
    <div className='form-row'>
       <label htmlFor='lastName' className='label-input'>Last Name</label>
       <input
        type='text'
        value={lastName}
        className="input-add"
        onChange={onChnageLast}
        id='lastName'
        placeholder="Last Name"
       />
    </div>
    <div className='form-row'>
       <label htmlFor='phone' className='label-input'>Phone Number</label>
       <input
        type='text'
        value={phoneNumber}
        className="input-add"
        onChange={onChangePhone}
        id='phone'
        placeholder="Phone Number"
       />
    </div>
      <button type='submit' className='create-customer-form-btn'>Crate Customer</button>
      {errors && <p className="error-form">please enter name and number correctly</p>}
      <p className="api-details-form">{errorApi}</p>
     </form>
     </div>
    </>
  )
}

export default CustomerFormPage