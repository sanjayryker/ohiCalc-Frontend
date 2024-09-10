import { useAuthContext } from "./useAuthContext"
import { toast } from 'react-toastify'

export const useLogout = () =>{
    const {dispatch} = useAuthContext()

    const logout =() =>{
        //remove user from storage
        localStorage.removeItem('user')

        toast.success("Logged out successfull!")
        //Dispatch logout
        dispatch({type:'LOGOUT'})

    }

    return {logout}
}