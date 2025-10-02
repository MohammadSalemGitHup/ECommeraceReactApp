import { useState } from "react";
import "./loginSignup.css"

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-signup">
     
     <div className="login-form">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form >
        {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
          )}
        <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your Email" required />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
        </div>
        {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" required />
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

          

        <button type="submit" className="submit-btn">
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
