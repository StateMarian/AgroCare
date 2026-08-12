import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import { Eye, EyeOff, CircleCheckBig, Leaf } from "lucide-react";
import type { RegisterForm, RegisterErrors } from "../../types/Auth";
import { handleAxiosErrors } from "../../helpers/axiosError";

const initialRegister: RegisterForm = {
  cnp: "",
  prenume: "",
  nume: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phoneNumber: "",
};

const initialErrors: RegisterErrors = {
  cnp: "",
  prenume: "",
  nume: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phoneNumber: "",
};

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>(initialRegister);
  const [formErrors, setFormErrors] = useState<RegisterErrors>(initialErrors);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setFormErrors((currentError) => ({
      ...currentError,
      [name]: "",
    }));
  }

  function validateForm(): boolean {
    const validationErrors: RegisterErrors = {
      cnp: "",
      prenume: "",
      nume: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
    };

    if (!form.cnp.trim()) {
      validationErrors.cnp = "CNP is required!";
    } else if (!/^\d{13}$/.test(form.cnp)) {
      validationErrors.cnp = "CNP must contain exactly 13 digits!";
    }

    if (!form.prenume.trim()) {
      validationErrors.prenume = "First name is required!";
    }

    if (!form.nume.trim()) {
      validationErrors.nume = "Last name is required!";
    }

    if (!form.email.trim()) {
      validationErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      validationErrors.email = "Email format is invalid";
    }

    if (!form.password.trim()) {
      validationErrors.password = "Password is required!";
    } else if (form.password.length < 8) {
      validationErrors.password = "Password must contain at least 8 characters.";
    }

    if (!form.passwordConfirm.trim()) {
      validationErrors.passwordConfirm = "Confirm password is required!";
    } else if (form.passwordConfirm !== form.password) {
      validationErrors.passwordConfirm = "Passwords do not match!";
    }

    if (!form.phoneNumber.trim()) {
      validationErrors.phoneNumber = "Phone number is required!";
    } else if (!/^\d{9,15}$/.test(form.phoneNumber)) {
      validationErrors.phoneNumber = "Phone number must be between 9 and 15 digits!";
    }

    setFormErrors(validationErrors);

    return(
      validationErrors.cnp === "" && validationErrors.prenume === "" && validationErrors.nume === "" &&
      validationErrors.email === "" && validationErrors.password === "" && validationErrors.passwordConfirm === "" &&
      validationErrors.phoneNumber === ""
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
      await register(
        form.cnp,
        form.nume,
        form.prenume,
        form.email,
        form.password,
        form.phoneNumber,
      );

      setRegisterSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (requestError: unknown) {
      
      handleAxiosErrors({
        requestError,
        setError,
        message: "Registration faioled. Please try again later!",
      })

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <Leaf size={42} color="#2E8D32"></Leaf>
          <h1>AgroCare</h1>
        </div>
        <p className="subtitle"> Create account</p>
        {registerSuccess && (
          <div className="success-message">
            <CircleCheckBig size={24} />

            <div className="success-text">
              <span className="success-title">
                Account created successfully!
              </span>

              <span className="success-subtitle">Redirecting to login...</span>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="cnp">CNP</label>
          <input
            id="cnp"
            name="cnp"
            placeholder="CNP"
            value={form.cnp}
            onChange={handleChange}
          />
          {formErrors.cnp && <p className="error-message">{formErrors.cnp}</p>}

          <label htmlFor="prenume">First Name</label>
          <input
            id="prenume"
            name="prenume"
            placeholder="First Name"
            value={form.prenume}
            onChange={handleChange}
          />
          {formErrors.prenume && (
            <p className="error-message">{formErrors.prenume}</p>
          )}

          <label htmlFor="nume">Last Name</label>
          <input
            id="nume"
            name="nume"
            placeholder="Last Name"
            value={form.nume}
            onChange={handleChange}
          />
          {formErrors.nume && (
            <p className="error-message">{formErrors.nume}</p>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
          <label htmlFor="password">Password</label>
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
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
          <label htmlFor="confirmPassword">Confirm password</label>
          <div className="password-container">
            <input
              id="confirmPassword"
              name="passwordConfirm"
              type={showPasswordConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={form.passwordConfirm}
              onChange={handleChange}
            />
            <button
              type="button"
              className="show-password-button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            >
              {showPasswordConfirm ? <Eye size={23} /> : <EyeOff size={23} />}
            </button>
          </div>
          {formErrors.passwordConfirm && (
            <p className="error-message">{formErrors.passwordConfirm}</p>
          )}

          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          {formErrors.phoneNumber && (
            <p className="error-message">{formErrors.phoneNumber}</p>
          )}

          {error && <p className="error-message">{error}</p>}
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <div className="register">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
