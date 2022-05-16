import React,{useState} from 'react'
import { forgetpassword } from '../Componenets/auth'

const ForgetPassword = () => {

    const[email,setEmail]=useState('')
    const[error,setError]=useState('')
    const[success,setSuccess]=useState(false)//here by default success false hunu paryo  

    const clickSubmit=e=>{

        e.preventDefault()
        forgetpassword(email)
        .then(data=>{
            if(data.error){
                
                setSuccess('')
                setError(data.error)
            }
            else{
                setError("")
               setSuccess(true)//register cha bhane ture aucha so cucess huncha so we do
            }
        })
        .catch(err=>console.log(err))
    }

    // to show error
  const showError = () => {//yo tai backend ko validation error haru
    if (error) {
      return <div className="alert alert-danger">{error}</div>;//yo error display garne bhyo
    } else {
      return (
        <div className="alert alert-danger" style={{ display: "none" }}></div>//display none gareko yedi sucess bhyo bhane so none garnu parcha pachi ko lagi
      );
    }
    // return <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>{error}</div>
  };

  // to show success/ user is added
  const showSuccess = () => {//
    if (success) {
      return (
        <div className="alert alert-success">
          Password reset link has been sent to your email.
        </div>
      );
    }
  };
  //here yeta samma register matra hunch abut nor verfication
  //*
  
  return (
    <>
    {showError()}
    {showSuccess()}

    {!success &&
        <div className='container mx-auto my-5'>
            <label htmlFor='email'>Email:</label>

            <input type={'email'} id="email" className='form-control'
                onChange={e=>setEmail(e.target.value)}//here yedi email ma kei change vhyo bhane value setEmail le valuetai email ma gayera rakdincha
            />

            <button className='btn btn-warning' onClick={e=>clickSubmit(e)}>Forget Password</button>

        </div>
    }
      
    </>
  )
}

export default ForgetPassword