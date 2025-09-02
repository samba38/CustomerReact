import { useState} from "react";
import Header from '../Header'
import './index.css'
const CustomerAddressNewForm=(props)=>{
  const [addressDetails, setAddressDetails]=useState('')
  const [city, setCity]=useState('')
  const [state, setState]=useState('')
  const [pinCode, setPinCode]=useState('')
  const [errors, setErrors] = useState(false);
  const [errorApi, setErrorApi]=useState('')
  const {match}=props 
    const {params}=match 
    const {id}=params
  const onChnageAdress=(event)=>{
    setAddressDetails(event.target.value)
  }
  const onChangeCity=(event)=>{
    setCity(event.target.value)
  }
  const onChangeState=(event)=>{
    setState(event.target.value)
  }
  const onChangePin=(event)=>{
   setPinCode(event.target.value)
  }
  const onSubmitForm=async (event)=>{
    event.preventDefault()
    const updateAdress={
      customer_id:id,
      address_details:addressDetails,
      city:city,
      state:state,
      pin_code:pinCode
    }
    if (addressDetails==='' || city==='' || state==='' || pinCode===''){
      setErrors(true)
    }else{
       let options={
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateAdress),
        };
        const API_URL =
    process.env.REACT_APP_API_URL || "https://customerserver-10.onrender.com";
        const apiUrl=`${API_URL}/api/customers/${id}/addresses`
       const response= await fetch(apiUrl, options)
    if (response.ok===true){
     const fetchData= await response.text()
     setErrorApi('Address Added')
    } else{
      setErrorApi('Failed to Add Address')
    }
    }
    
  }
  return (
    <>
     <Header/>
      <div>
      <h1 className="adding-address-new">Add Your Address</h1>
     <form className='form-conatiner-adress-add-new' onSubmit={onSubmitForm}>
      <h1 className="given-details-adress-new">Give Address Details</h1>
    <div className='form-row-adress'>
       <label htmlFor='adressDetails' className='label-input-adress'>ADDRESS DETAILS</label>
       <input
        type='text'
        className="input-add-adress"
        value={addressDetails}
        onChange={onChnageAdress}
        id='adressDetails'
        placeholder="Address"
       />
    </div>
    <div className='form-row-edit'>
       <label htmlFor='city' className='label-input-edit'>CITY</label>
       <input
        type='text'
        className="input-add-edit"
        value={city}
        onChange={onChangeCity}
        id='city'
        placeholder="City"
       />
    </div>
    <div className='form-row-edit'>
       <label htmlFor='state' className='label-input-edit'>STATE</label>
       <input
        type='text'
        className="input-add-edit"
        value={state}
        onChange={onChangeState}
        id='state'
        placeholder="State"
       />
    </div>
    <div className='form-row-edit'>
       <label htmlFor='pin' className='label-input-edit'>PINCODE</label>
       <input
        type='text'
        className="input-add-edit"
        value={pinCode}
        onChange={onChangePin}
        id='pin'
        placeholder="Pincode"
       />
    </div>
      <button type='submit' className='edit-adress-form-btn'>Add Address</button>
      {errors && <p className="error-form-edit">please enter address correctly</p>}
      <p className="api-details-form-edit">{errorApi}</p>
     </form>
     </div>
    </>
  )
}

export default CustomerAddressNewForm