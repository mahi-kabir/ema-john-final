import React, { createContext,  useState } from "react";
import "./App.css";
import Header from "../src/Components/Header/Header";
import Shop from "../src/Components/Shop/Shop";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from "./Components/review/Review";
import Inventory from "./Components/inventory/Inventory";
import NotFound from "./Components/NotFound/NotFound";
import ProductDetail from "./Components/ProductDetail/ProductDetail";
import Storage from "./Components/storage/Storage";
import Shipment from "./Components/shipment/Shipment";
import Login from "./Components/login/Login";
import PrivateRoute from "./Components/privateRoute/PrivateRoute";

export const UserContext = createContext();


function App() {
  const[loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
      <h3>Email: {loggedInUser.email}</h3>
      
      
      <Router>
       <Header></Header>
        <Switch>

          <Route path = "/shop">
            <Shop></Shop>
          </Route>

       
          <Route path = "/review">
              <Review></Review>
          </Route>

          <Route path = "/inventory">
            <Inventory></Inventory>
          </Route> 

          <PrivateRoute path = "/shipment">
           <Shipment/>
         </PrivateRoute>

         <Route path = "/login">
           <Login/>
         </Route>

          <Route exact path = "/">
            <Shop></Shop>
          </Route>

          <Route path = "/product/:productKey"> 
            <ProductDetail></ProductDetail>
          </Route>

         <Route path = "/storage">
           <Storage></Storage>
         </Route>
          
          <Route path="*">
            <NotFound></NotFound>
          </Route>

          

        </Switch>
      </Router>
      
      </UserContext.Provider>
  );
}

export default App;
