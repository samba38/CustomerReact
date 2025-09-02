import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Header from '../Header'
import CustomerAdressList from '../CustomerAdressList'
import './index.css'
const CustomerDetailPage=(props)=>{
  const [customer, setCustomer]=useState({})
  const [addresses, setAddresses]=useState([])
  const [deleteError, setDeleteError]=useState('')
  const API_URL =
    process.env.REACT_APP_API_URL || "https://customerserver-10.onrender.com";
  useEffect(()=>{
    const getCustomerData=async ()=>{
      const { match } = props;
      const { id } = match.params;
      

      const apiUrl=`${API_URL}/api/customers/${id}`
      const apiUrl2=`${API_URL}/api/customers/${id}/addresses`
      const response= await fetch(apiUrl)
      const fetchData= await response.json()
      const response2= await fetch(apiUrl2)
      const fetchData2= await response2.json()
      console.log(fetchData2)
      const updateData={
        id:fetchData.id,
        firstName:fetchData.first_name,
        lastName:fetchData.last_name,
        phoneNumber:fetchData.phone_number,
      }
      const updateData2=fetchData2.map(eachItem =>({
        id:eachItem.id,
        addressDetails:eachItem.address_details,
        city:eachItem.city,
        pinCode:eachItem.pin_code,
        state:eachItem.state,
      }));
      setCustomer(updateData)
      setAddresses(updateData2)
      
    }
    getCustomerData()
  }, [])
  const onDelete=async (id)=>{
    const api=`${API_URL}/api/customers/${id}`
    const options={
      method:'DELETE'
    }
    const response=await fetch(api, options)
    if (response.ok===true){
      const fetchData= await response.json()
      setDeleteError('Customer deleted successfully')
    }else{
      setDeleteError('Failed to delete customer')
    }
    
  }
  return (
    <>
     <Header/>
     <div className="customer-full-details">
        <img
          src="https://res.cloudinary.com/dqpacvvei/image/upload/v1756753021/pngtree-default-avatar-profile-icon-gray-placeholder-vector-png-image_16213764_uwpq99.png"
          className="adress-img"
          alt='adressIcon'
        />
    <div className="customer-details-card">
       <h1 className="customer-name-heading">{customer.firstName} {customer.lastName}</h1>
       <p className="customer-phone-number">Phone Number: <span className="customer-phone-number-span">{customer.phoneNumber}</span></p>
       {addresses.map(eachList =>(
        <CustomerAdressList key={eachList.id} details={eachList}/>
       ))}
      <div className="buttons-card">
        <Link to={`/api/edit-customer/${customer.id}`}>
          <button className="customer-edit-btn">Edit Customer Details</button>
        </Link>
        <Link to={`/api/add-new-address/${customer.id}`}>
          <button className="customer-edit-btn">Add New Address</button>
        </Link>
        <button className="customer-edit-btn" type='button' onClick={() => onDelete(customer.id)}
          >Delete Customer</button>
        <p>{deleteError}</p>
      </div>
    </div>
     </div>
    </>
  )
}

export default CustomerDetailPage