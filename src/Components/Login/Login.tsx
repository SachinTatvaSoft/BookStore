import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router'

function Login() {
  const history = useNavigate()
  const [loginDetails, setLoginDetails] = useState({
    email:"",password:""
  })
  const handleCreate = () =>{
    history("/register")
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setLoginDetails({...loginDetails,[e.target.name]:e.target.value})
  }

  const handleLogin = () =>{
    if(loginDetails?.email?.trim() !== "" && loginDetails?.password?.trim() !== ""){
      history("/add")
    } else{
      window?.alert("Enter The Email And Password")
    }
  }
  
  return (
    <div>
      <div className='home-login-text'>
        <p>
          {`Home > `}
          <span style={{color:"#f14d54"}}>
            Login
          </span>
        </p>
      </div>
      <p className='home-login-text login-page-create-text'>Login or Create an Account</p>
      <div className='login-main-container'>
      <div className='login-form-registraion-container'>
        <div className='login-page-div'>
          <p className='login-heading-text'>New Customer</p>
          <hr/>
          <p>Registration free and easy.</p>
          <p>
          <ul>
            <li>Faster checkout</li>
            <li>Save multiple shipping addresses</li>
            <li>View and track orders and more</li>
          </ul>
          </p>
        <Button className='create-an-account-button' onClick={handleCreate}>Create an account</Button>
        </div>
      </div>
      <div className='login-form-registraion-container'>
        <div className='login-page-div'>
          <p className='login-heading-text'>Registered Customers</p>
          <hr/>
          <p>If you have an account with us , please login.</p>
          <div className='login-form-container'>
          <span className='form-label'>
            Email *
          </span>
          <TextField className='search-input' style={{marginBottom:"25px"}} name="email" value={loginDetails?.email} onChange={handleChange}/>
          <span className='form-label'>
            Password *
          </span>
          <TextField className='search-input' name="password" type="password" value={loginDetails?.password} onChange={handleChange} />
          </div>
        <Button className='login-button' onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login