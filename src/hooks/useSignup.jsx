// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";
// import {URL} from '../App'
// import axios from "axios"

// export const useSignup = () =>{
//      const [error,setError] = useState(null)
//      const [isLoading, setIsLoading] = useState(null)
//      const {dispatch} = useAuthContext()

//      const signup = async (email,password,name) =>{
//         setIsLoading(true)
//         setError(null)
//         console.log(email,password, name)
//         try {
//             const response = await axios.post(`${URL}/api/user/signup`, {
//                 email,
//                 password,
//                 name
//             }, {
//                 headers: {
//                     'Content-type': 'application/json'
//                 }
//             });

//             const json = response.data;

//             // Local storage
//             localStorage.setItem('user', JSON.stringify(json));
//             // update auth context
//             dispatch({type : 'LOGIN', payload: json})
//             setIsLoading(false)
//         } catch (error) {
//             setIsLoading(false)
//             setError(error.response?.data?.error)
//             throw new Error (error.response?.data?.error)
//         }
//      }
//      return {signup, isLoading, error}
     
// }