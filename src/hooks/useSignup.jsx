import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import {URL} from '../App'
import axios from "axios";

export const useSignup = () =>{
     const [error,setError] = useState(null)
     const [isLoading, setIsLoading] = useState(null)
     const {dispatch} = useAuthContext()

     const signup = async (email,password) =>{
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios.post(`${URL}/api/user/signup`, {
                email,
                password
            }, {
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const json = response.data;

            // Local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update auth context
            dispatch({type : 'LOGIN', payload: json})
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            setError(error.response?.data?.error)
        }
     }
     return {signup, isLoading, error}
     
}