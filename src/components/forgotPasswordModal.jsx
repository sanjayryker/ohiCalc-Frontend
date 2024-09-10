import React, { useState } from 'react';
import './forgotPasswordModal.css';
import axios from 'axios'
import {URL} from '../App'
import { toast } from 'react-toastify'

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        toast.promise(
        axios.post(`${URL}/api/user/forgotPassword`,{
          email
        },{
          headers:{
            'Content-Type':'application/json'
          }
        }),{
            pending: 'Sending reset link...',
            success: 'Reset link sent successfully!',
            error: {
                render({ data }) {
                  return data.response?.data?.error;
                },
            },
        }
      ).then(() => onClose(false))}catch(error){
        console.log(error)
      }
       // Close the modal after submission
  };

  return (
    <div className="fmodal-overlay">
      <div className="fmodal-container">
        <button className="fclose-button" onClick={onClose}>
            &times;
        </button>
        <div className="fmodal-header">
          <h2>Forgot Password</h2>
        </div>
        <div className="fmodal-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="fsubmit-button">
              Send reset link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
