import {Link} from 'react-router-dom'
import './index.css'
const CustomerListPage=(props)=>{
   const {details}=props
   const {id, firstName, lastName, phoneNumber}=details
   
 return (
    <li className='customer-list-container'>
       <img
          src="https://res.cloudinary.com/dqpacvvei/image/upload/v1756738616/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764_xvlm41.avif"
          alt="icon"
          className="customer-profile-img"
        />
      <h1 className='customer-list-heading'>{firstName} {lastName}</h1>
         <Link to={`/api/customers/${id}`}>
         <button className='customer-list-view-btn' type='button'>View Details</button>
         </Link>
      
    </li>
 )
}

export default CustomerListPage