import { useAuthContext } from "./useAuthContext"


export const useLogout = () =>{
    const {dispatch} = useAuthContext()

    const logout =() =>{
        //remove user from storage
        localStorage.removeItem('user')

        
        //Dispatch logout
        dispatch({type:'LOGOUT'})

    }

    return {logout}
}