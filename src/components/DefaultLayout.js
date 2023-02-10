import React from "react";
import "../resources/default-layout.css";
import { Button, Dropdown} from 'antd';
import {useNavigate} from 'react-router-dom'


function DefaultLayout(props) {
  const navigate = useNavigate()
  const items = [
    {
      key: '1',
      label: (
        <li onClick={()=>{
          localStorage.removeItem('token')
          navigate("/login");
        }}>Logout</li>
      ),
    }
  ];

 


  const user = JSON.parse(localStorage.getItem("token"));
 
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Expense Tracker</h1>
        </div>

       
 
         <Dropdown menu={{items}} placement="bottomRight">
           <Button className="nav-btn" type="dark">{user && user.name.toUpperCase()}</Button>
         </Dropdown>
        
      </div>

      <div className="content">{props.children}</div>   
    </div>
  );
}

export default DefaultLayout;
