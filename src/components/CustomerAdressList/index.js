import {Link} from 'react-router-dom'
import './index.css'
const CustomerAdressList=(props)=>{
    const {details}=props
    const {id,addressDetails, city, state, pinCode}=details
  return (
    <>
    <h1 className='customer-adress-details'>Address:</h1>
    <p className='customer-adress'>{addressDetails}</p>
    <p className='customer-adress-state'>{city}, {state} - <span className='customer-adress-state-span'>{pinCode}</span></p>
     <Link to={`/api/edit-address/${id}`}>
       <button className="customer-delete-btn" type='button'>Edit Customer Address Details</button>
     </Link>
     <hr/>
    </>
  )
}

export default CustomerAdressList