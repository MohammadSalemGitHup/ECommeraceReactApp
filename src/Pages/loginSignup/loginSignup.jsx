import { useState } from "react";
import "./loginSignup.css"



/////////////////////////////

////////// LoginSignup Component ////////////
const LoginSignup = () => {
  
  // state to check if is it in login in or in signup
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };


  //state for controlled input 
  const [formData, setFormData] = useState({userName:"", email:"", password:"", confirmPassword:""});
  const getFormData = () => {
    for(let key in formData){
      console.log(`${key}: ${formData[key]}`);
    }
  }
  //change Handler 
  const formInputChangeHandler = (e) => {
    setFormData( { ...formData, [e.target.name]:e.target.value } );
  }

  //////////// functions ///////////////
//signup
const signupHandler = async () => {
  console.log(`I am in signup,  Data is : ${getFormData()}`);
  // Basic validation
  if (!formData.userName || !formData.email || !formData.password) {
    alert("Please fill all fields.");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  
  
  try{
    // create a payload object (the Body of POST)
    const body_payload = {userName: formData.userName, email: formData.email, password: formData.password};
    
    const BACKEND_API =process.env.BACKEND_BASE_URL || "http://localhost:4000";
    const response  = await fetch(`${BACKEND_API}/signup`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json", // tells the backend to expect JSON
      }, 
      body: JSON.stringify(body_payload),
    });

    const response_data = await response.json();

    // if response Success return jwt_token
    if (response.ok) {
      console.log("Signup successful:", response_data);
      alert(`Signup successful`);
    } else {
      console.error("Signup failed:", response_data);
      alert(`Signup failed`);
    }


  }catch(err){
    console.error(err);
    alert("Network error, please try again.");
  }
    

}

//login 
const loginHandler = async () => {
  console.log(`I am in login,  Data is : ${getFormData()}`);

  //Basic Validation
  if (!formData.email || !formData.password) {
    alert("Email and password are required.");
    return;
  }
  
  try{
    // create a payload object (the Body of POST)
    const body_payload = { email: formData.email, password: formData.password };
    
    const BACKEND_API =process.env.BACKEND_BASE_URL || "http://localhost:4000";
    const response = await fetch(`${BACKEND_API}/login`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json", // tells the backend to expect JSON
      }, 
      body: JSON.stringify(body_payload),
    });

    const response_data = await response.json();

    // if response Success return jwt_token
     if (response.ok) {
      
      if(response_data.success === true){
        console.log("Login successful:", response_data);
        alert(`Login successful`);
        
        localStorage.setItem("auth-token", response_data.jwt_token);
        window.location.replace("/");
        
        // for payment save email in loacal storage 
        localStorage.setItem("userEmail", formData.email);
      }
      else{
        alert(`Login faild`);
      }
      
    } else {
      console.error("Login failed:", response_data);
      alert(`Login failed`);
    }

  }catch(err){
    console.error(err);
    alert("Network error, please try again.");
  }
    
}

// Use one submit handler on the form
const handleSubmit = async (e) => {
  await e.preventDefault(); // prevent page refresh
}


  ////////////// JSX //////////////
  return (
    <div className="login-signup">
     
     <div className="login-form">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required 
              
              // controled input
              name="userName"
              value={formData.userName}
              onChange={formInputChangeHandler}
              />
            </div>
          )}
        <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your Email" required 
              
              // controled input
              name="email"
              value={formData.email}
              onChange={formInputChangeHandler}
              />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required
            
            // controled input
              name="password"
              value={formData.password}
              onChange={formInputChangeHandler}
            />
        </div>
        {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" required 
              
              // controled input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={formInputChangeHandler}
              />
            </div>
          )}
          {isLogin && (
            <div className="remember-me">
              <label>
                <input type="checkbox"/>
                Remember
              </label>
            </div>
          ) 
          }

          

        <button type="submit" className="submit-btn"   
        
        onClick= { isLogin?  () => loginHandler()  : () => signupHandler() 
        }
        >
            {isLogin ? "Login" : "Sign Up"}
        </button>

      </form>


      {/* to swich from-to login <--> sign up   */}
      <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleForm} className="toggle-link">
            {isLogin ? "Sign Up" : "Login"}
          </span>
      </p>


     </div>


    </div>
  );
};

export default LoginSignup;
