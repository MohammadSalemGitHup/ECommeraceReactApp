import { useState } from "react";
import "./loginSignup.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const toggleForm = () => setIsLogin((v) => !v);

  const formInputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signupHandler = async () => {
    // Basic validation
    if (!formData.userName || !formData.email || !formData.password) {
      alert("Please fill all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Signup successful:", data);
        alert("Signup successful");
        if (data.jwt_token) localStorage.setItem("token", data.jwt_token);
      } else {
        console.error("❌ Signup failed:", data);
        alert(data?.message || "Signup failed");
      }
    } catch (err) {
      console.error("⚠️ Signup error:", err);
      alert("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginHandler = async () => {
    if (!formData.email || !formData.password) {
      alert("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful:", data);
        alert("Login successful");
        if (data.jwt_token) localStorage.setItem("token", data.jwt_token);
      } else {
        console.error("❌ Login failed:", data);
        alert(data?.message || "Login failed");
      }
    } catch (err) {
      console.error("⚠️ Login error:", err);
      alert("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Use one submit handler on the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    if (loading) return;
    if (isLogin) {
      await loginHandler();
    } else {
      await signupHandler();
    }
  };

  return (
    <div className="login-signup">
      <div className="login-form">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                name="userName"
                value={formData.userName}
                onChange={formInputChangeHandler}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={formInputChangeHandler}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={formInputChangeHandler}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={formInputChangeHandler}
                required
              />
            </div>
          )}

          {isLogin && (
            <div className="remember-me">
              <label>
                <input type="checkbox" />
                Remember
              </label>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

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
