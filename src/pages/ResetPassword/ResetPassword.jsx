import React, { useState } from 'react'
import axios from 'axios'
import {URL} from '../../App'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = (e) => {

    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const navigate = useNavigate()
    const {id, token} = useParams()

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(password !== password2){
            toast.error("passwords do not match")
        }
        try{
            toast.promise(
                    axios.post(`${URL}/api/user/resetPassword/${id}/${token}`, {password}),{
                    pending: "Resetting password...", 
                    success: "Password has been successfully reset!",
                    error: {
                        render({ data }) {
                            return data.response && data.response.data ? data.response.data.message : "An unexpected error occurred. Please try again.";
                        }
                    }  
                }
            )
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    
    }

  return (
    <div className="fmodal-overlay">
      <div className="fmodal-container">
        <div className="fmodal-header">
          <h2>Change Password</h2>
        </div>
        <div className="fmodal-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Enter your new password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="password">Enter your password again</label>
            <input
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />

            <button type="submit" className="fsubmit-button">
               submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword