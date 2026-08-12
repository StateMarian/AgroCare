import { useState, type ChangeEvent } from "react";
import { login } from "../../services/authService";
import "./LoginPage.css";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import type { LoginForm, LoginErrors } from "../../types/Auth";
import { handleAxiosErrors } from "../../helpers/axiosError";



const initialForm: LoginForm = {
    email:"",
    password:"",
}

const initialErrors: LoginErrors = {
  email:"",
  password:"",
}

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const[form, setForm] = useState<LoginForm>(initialForm);
  const[errors, setErrors] = useState<LoginErrors>(initialErrors);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]:value,
    }));

    setErrors((currentError) => ({
      ...currentError,
      [name]:"",
    }))
  }

  function validateForm(): boolean{
    const validationErrors: LoginErrors = {
      email:"",
      password:"",
    };

    if(!form.email.trim()){
      validationErrors.email = "Email is required";
    }

    if(!form.password.trim()){
      validationErrors.password = "Password is required";
    }else if(form.password.length < 8){
      validationErrors.password = "Password must have at least 8 characters!";
    }

    setErrors(validationErrors);

    return (
      validationErrors.email === "" && 
      validationErrors.password === ""
    );
  }
  

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    
    setError("");

    if(!validateForm()){
      return;
    }

    setLoading(true);

    try {
      const response = await login(form.email, form.password);

      localStorage.setItem("token", response.token);

      const currentUser = await getCurrentUser();
      setUser(currentUser);

      navigate("/dashboard");
    } catch (requestError:unknown) {
      console.log("Login failed:", requestError);
      handleAxiosErrors({
        requestError,
        setError,
        message: "Login failed. Please try again later!",
      })

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <Leaf size={42} color="#2E7D32" />
          <h1>AgroCare</h1>
        </div>

        <p className="subtitle">Sign in</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>

          <input
            id="email"
            name = "email"
            type = "email"
            placeholder ="Email"
            value = {form.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <br />

          <div className="password-header">
            <label htmlFor="password" className="password-label">Password</label>
            <Link to="/forgotPassword">Forgot password?</Link>
          </div>

          <div className="password-container">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={23} /> : <EyeOff size={23} />}
            </button>
          </div>

          {errors.password && <p className="error-message">{errors.password}</p>}

          {error && <p className="error-message">{error}</p>}
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="register">
          <p>Don't have an account?</p>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
