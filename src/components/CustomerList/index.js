import { useEffect, useState } from "react";
import Header from '../Header'
import CustomerListPage from '../CustomerListPage'
import './index.css'
const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
}
const CustomerList=()=>{
  const [apiResponse, setApiResponse] = useState(apiStatusConstants.initial)
  const [customers, setCustomers]=useState([])
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(1);

  const onChangeSearch=(event)=>{
    setSearch(event.target.value)
  }
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < 3) {  
      setPage(page + 1);
    }
  };
  useEffect(()=>{
    const getCustomerData = async () => {
      setApiResponse(apiStatusConstants.inProgress)
      const API_BASE = process.env.REACT_APP_API_BASE_URL;


const apiUrl = `${API_BASE}/api/customers?page=${page}&order_by=${orderBy}&search_q=${search}`;
      const response= await fetch(apiUrl)
      if (response.ok===true){
        const fetchData= await response.json()
        console.log(fetchData)
        const updatedData=fetchData.map(eachItem =>({
          id:eachItem.id,
          firstName:eachItem.first_name,
          lastName:eachItem.last_name,
          phoneNumber:eachItem.phone_number,
        }))
        console.log(updatedData)
        setCustomers(updatedData)
        setApiResponse(apiStatusConstants.success)
      }
      
      
    };

    getCustomerData();
  }, [search, page, orderBy])
  const lodingView=()=>{
    return (
      <h1 className="loading-heading">Loading Please Wait ............</h1>
    )
  }
  const renderAllProducts=()=>{
    return (
      <div className="customer-container">
        <h1 className="customer-heading">Customer Management</h1>
        <input type='search' className="search-customers" value={search} placeholder="Search customers..." onChange={onChangeSearch}/>
        <ul className="unorder-customer-list">
          {customers.map(eachList =>(
            <CustomerListPage key={eachList.id} details={eachList}/>
          ))}
        </ul>
        <div className="pagination">
          <button className="pagination button" type='button' onClick={handlePrev}>previous</button>
          <p className="page-number">page {page}</p>
          <button className="pagination button" type='button' onClick={handleNext}>Next</button>
        </div>
    </div>
    )
  }
  const renderLeaderboard = () =>{
    switch(apiResponse){
      case apiStatusConstants.inProgress:
        return lodingView()
      case apiStatusConstants.success:
        return renderAllProducts()
      default:
        return null
    }
  }
  return (
    <>
     <Header/>
     {renderLeaderboard()}
    </>
    
  )
}

export default CustomerList