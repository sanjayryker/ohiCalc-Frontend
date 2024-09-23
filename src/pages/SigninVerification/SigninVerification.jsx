import React, { useEffect } from 'react'
import axios from 'axios'
import {URL} from '../../App'
import { toast } from 'react-toastify'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from '../../hooks/useAuthContext';


const SigninVerification = () => {

  const {dispatch} = useAuthContext()
  const navigate = useNavigate()
  const {verifyToken} = useParams()

    useEffect(() =>{
        verifySignin()  
    },[])

    const verifySignin = async() =>{

      try{
        const response = await axios.post(`${URL}/api/user/verifySignup`,{verifyToken})
        console.log(response)
        const json = response.data

        if(response.status === 200){

          // Local storage
          localStorage.setItem('user', JSON.stringify(json));
          // update auth context
          await dispatch({type : 'LOGIN', payload: json})

          toast.success(response.data.message)
          navigate('/category')
        }
        
      }catch(error){
        toast.error(error?.response?.data?.message)
        navigate('/login')
      }
    }

  return (
    <></>
  )
}

export default SigninVerification