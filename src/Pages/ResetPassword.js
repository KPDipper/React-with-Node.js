import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import { resetpassword } from '../Componenets/auth'
//foreget password jun token pathauchyoum teslai ta resetpassword ma route define garchyou 
//paila tai kun user ho thapunu paryo
//paila token ako cha kii chaina check garne
//tei token anusar user identfy garnu paryo



//reset ko method ko ma tai jun forget password  bata token ayo tei token pathyera reset garchyoum


const ResetPassword = () => {

    const params=useParams()//here token lina ko lagi
    const token=params.token

    const [new_password,setNewPassword]=useState('')
    const [email,setEmail]=useState("")
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const passwordReset=e=>{
        setError('')
        setSuccess(false)
        e.preventDefault()
        resetpassword(token,email,new_password)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setSuccess(true)
            }
        })
        .catch(err=>console.log(err))
    }

    const showError = () => {
        if (error) {
            return <div className='alert alert-danger'>{error}</div>
        }
    }

    const showSuccess = () => {
        if (success) {
            return <div className='alert alert-success'>
                Password has been reset successfully.
            </div>
        }

    }

  return (
    <>
    {showError()}
    {showSuccess()}
    <h3>
        Reset Password
    </h3>
    <div className='container w-50 my-5'>
     
     <label>Email</label>
     <input type={'text'} className='form-control' onChange={(e)=>setEmail(e.target.value)}/>

     <label>New Password</label>
     <input type={'text'} className='form-control' onChange={(e)=>setNewPassword(e.target.value)}/>

     <button className='btn btn-warning' onClick={passwordReset}>Reset Password</button>
     {/* yeta hamile resetpassword ko funciton call garna ko lagi */}

    </div>


    </>
  )
}

export default ResetPassword