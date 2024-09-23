import { useState, ChangeEvent } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { toast } from 'react-toastify'
import {URL} from '../../App'
import axios from 'axios'
import ForgotPasswordModal from "../../components/forgotPasswordModal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoInformationCircle } from "react-icons/io5";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5"
import { IoEyeOff } from "react-icons/io5"


const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name, setName] = useState('')
  const [action, setAction] = useState("Login")
  const [isFlipping, setIsFlipping] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [strength, setStrength] = useState("")
  const [strengthWord, setStrengthWord] = useState("")
  const [showPasswordLogin, setShowPasswordLogin] = useState(false)
  const [showPasswordSign, setShowPasswordSign] = useState(false)
  const [isLoadingsign, setIsLoadingsign] = useState(false)
  
  const{login,isLoading,error} = useLogin()

  const calculateStrength = (password) => {
    let strength = 0;
  
    // Check conditions for strength
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
  
    const strengthWords = ["Weak", "Medium", "Good", "Strong","Very  Strong"];
  setStrength(strength);
  setStrengthWord(strengthWords[strength - 1]);
  };  

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    calculateStrength(passwordValue);
  };
  

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
  }

  const handleSignup = async (e) =>
  {
    setIsLoadingsign(true)
      e.preventDefault()       
      try{
        const response = await toast.promise(
             axios.post(`${URL}/api/user/signup`,{email,password,name}),{
              pending:"Signing in...",
              success:"Email verification sent successfully",
              error: {
                render({ data }) {
                  return data.response?.data?.message;
                },
            },
             }
          )
        console.log(response)
        setIsLoadingsign(false)
      }catch(err){
        console.log(err)
        setIsLoadingsign(false)
      }
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
            <input type={showPasswordLogin ? "text" :"password"} placeholder="password" onChange={(e) => setPassword(e.target.value) } value={password}/>
            {showPasswordLogin ?
            <IoEye style={{height:"25px", width:"20px", marginRight:"5px", cursor:"pointer", color:"grey"}} onClick={() =>setShowPasswordLogin(!showPasswordLogin)} /> :
            <IoEyeOff style={{height:"25px", width:"20px", marginRight:"5px", cursor:"pointer", color:"grey"}} onClick={() =>setShowPasswordLogin(!showPasswordLogin)}  />
            }
          </div>

          {/* <div className="error"></div>
          {error && <div className="error">{error}</div>} */}
          <div className="forgot_password" ><span onClick={() => setIsModalOpen(true)}>Forgot Password?</span></div>

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
            <input type={showPasswordSign ? "text" :"password"} placeholder="password" onChange={handlePasswordChange} value={password}/>
            {showPasswordSign ? 
            <IoEye style={{height:"25px", width:"20px", marginRight:"5px", cursor:"pointer", color:"grey"}} onClick={() =>setShowPasswordSign(!showPasswordSign)} /> :
            <IoEyeOff style={{height:"25px", width:"20px", marginRight:"5px", cursor:"pointer", color:"grey"}} onClick={() =>setShowPasswordSign(!showPasswordSign)} />
            }
            <IoInformationCircleSharp data-tooltip-id="my-tooltip-1" style={{height:"25px", width:"20px", marginRight:"5px", cursor:"pointer", color:"grey"}} />
            <ReactTooltip
            id="my-tooltip-1"
            place="top"
            style={{fontSize:"12px"}}
            content={<>
             Password should be atleast 8 characters <br/>
             Must contain a symbol and a number<br/>
             Must contain a uppercase letter<br/>
          </>}
            />
          </div>
          <div className="password-strength">
              <div className={`strength-bar strength-${strength}`}></div> 
          </div>
          <div className="strength-word"> {(strengthWord && strengthWord !== "" && strengthWord !== null) ? <div> {strengthWord} </div> : <div style={{height:"16.8px", width:"20px"}}> </div> }</div>
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
