import { useState } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
import { useSignup } from '../../hooks/useSignup'
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { toast } from 'react-toastify'
import {URL} from '../../App'
import axios from 'axios'
import ForgotPasswordModal from "../../components/forgotPasswordModal";

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name, setName] = useState('')
  const [action, setAction] = useState("Login")
  const [isFlipping, setIsFlipping] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const{login,isLoading,error} = useLogin()
  const {signup,errorsign,isLoadingsign} = useSignup()

  const handleLogin = async (e) =>
  {
      e.preventDefault()
      toast.promise(
        login(email, password), // Pass the promise directly to toast.promise
        {
          pending: "Logging in...", 
          success: "Logged in successfully!", 
          error:{
            render({data}){
              return data.message
            }
          },
        }
      );       
      console.log(email,password)
  }

  const handleSignup = async (e) =>
  {
    // console.log(email,password, name)
      e.preventDefault()
      toast.promise(
        signup(email, password, name), // Pass the promise directly to toast.promise
        {
          pending: "Signing in...", 
          success: "Signed in successfully!", 
          error:{
            render({data}){
              return data.message
            }
          },
        }
      );       
  }

  const toggleAction = () => {
    setEmail('')
    setPassword('')
    setName('')
    setIsFlipping(!isFlipping); // Start the flip animation
    setTimeout(() => {
      setAction((prevAction) => (prevAction === "SignUp" ? "Login" : "SignUp"))
    }, 200)
  }

  

  return (

    <div className="loginBox">
      <div className={`loginCard ${isFlipping ? "flip" : ""}`}>

      <div className={`login_container ${action === "Login" ? "hidden" : ""}`}>
        <div className="login_header">
          <div className="login_text">{action}</div>
          <div className="underline"></div>
        </div>
        <form className="login_inputs" onSubmit={handleLogin}>
          <div className="login_input">
            <MdEmail className="login_icon" />
            <input type="email" placeholder="Email Id" onChange={(e) => setEmail(e.target.value) } value={email}  />
          </div>
          <div className="login_input">
            <FaLock className="login_icon" />
            <input type="password" placeholder="password"  onChange={(e) => setPassword(e.target.value) } value={password}  />
          </div>

          {/* <div className="error"></div>
          {error && <div className="error">{error}</div>} */}
          <div className="forgot_password" onClick={() => setIsModalOpen(true)} >Forgot Password?</div>

          <div className="signup_submit_conatiner">
            <button className={ action === "Login" ? "login_submit" : "login_submit gray"} disabled={isLoading}  >
              Login
            </button>
          </div>

          <div className="login_footer">
            Don't have an account?<span onClick={toggleAction} >Signup</span>
          </div>
        </form>
      </div>




      <div className={`signup_container ${action === "Signup" ? "hidden" : ""}`}>
        <div className="signup_header">
          <div className="signup_text">{action}</div>
          <div className="underline"></div>
        </div>
        <form className="signup_inputs" onSubmit={handleSignup}>
          <div className="signup_input">
            <FaUser className="signup_icon" />
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value) } value={name}/>
          </div>
          <div className="signup_input">
            <MdEmail className="signup_icon" />
            <input type="email" placeholder="Email Id" onChange={(e) => setEmail(e.target.value) } value={email} />
          </div>
          <div className="signup_input" >
            <FaLock className="signup_icon" />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value) } value={password}/>
          </div>
          <div className="login_submit_conatiner">
            <button className={ action === "SignUp" ? "login_submit" : "login_submit gray"} disabled={isLoadingsign} >
              Signup
            </button>
          </div>

          <div className="login_footer">
            Already have an account?<span onClick={toggleAction} >Login</span>
          </div>
          

        </form>
      </div>

      </div>
      {isModalOpen && (
        <ForgotPasswordModal
          onClose={() => setIsModalOpen(false)}
          // onSubmit={handleForgotPasswordSubmit}
        />
      )}
    </div>
  );
};

export default Login;
