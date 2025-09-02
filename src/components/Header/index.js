import {Link} from 'react-router-dom'
import './index.css'
const Header=()=>{
 return (
    <>
     <nav className='nav-container'>
        <img
          src="https://res.cloudinary.com/dqpacvvei/image/upload/v1756805342/686348_h6h5yq.png"
          className="nav-img"
          alt='nav-icon'
        />
        <div className='nav-sider'>
           <Link to='/'>
              <h1 className='nav-heading'>Customers</h1>
           </Link>
           <Link to='/api/customers'>
           <button className='nav-btn' type='button'>Add Customer</button>
           </Link>
       </div>
     </nav>
    </>
 )
}

export default Header