
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CustomerList from './components/CustomerList'
import CustomerDetailPage from './components/CustomerDetailPage'
import CustomerFormPage from './components/CustomerFormPage'
import CustomerEditForm from './components/CustomerEditForm'
import CustomersAddressEditForm from './components/CustomersAddressEditForm'
import CustomerAddressNewForm from './components/CustomerAddressNewForm'
import NotFound from './components/NotFound'
import './App.css';

function App() {
  return (
    <BrowserRouter>
     <Switch>
       <Route exact path='/' component={CustomerList}/>
       <Route exact path="/api/customers/:id" component={CustomerDetailPage} />
       <Route exact path='/api/customers' component={CustomerFormPage}/>
       <Route exact path='/api/edit-customer/:id' component={CustomerEditForm}/>
       <Route exact path='/api/edit-address/:id' component={CustomersAddressEditForm}/>
       <Route exact path='/api/add-new-address/:id' component={CustomerAddressNewForm}/>
       <Route component={NotFound}/>
     </Switch>
    </BrowserRouter>
  );
}

export default App;
