import React, { ChangeEvent, FormEvent, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const AuthForms: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  //store and set data into the hook
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Password confirmation check for signup
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Define the endpoint based on whether it's login or signup
      const endpoint = isLogin
        ? "http://localhost:8080/api/users/login"
        : "http://localhost:8080/api/users/signup";

      // Prepare the data to send (exclude confirmPassword for API request)
      const dataToSend = {
        userName: formData.username,
        email: formData.email,
        password: formData.password,
      };

      console.log("Sending data:", dataToSend);

      // Send request to the backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      // Check if the response is empty
      const text = await response.text();
      let data: ApiResponse;

      try {
        // Parse the text as JSON only if it exists
        data = text
          ? JSON.parse(text)
          : { success: false, message: "No response from server" };
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        throw new Error(
          `Invalid response from server: ${text.substring(0, 100)}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message || (isLogin ? "Login failed" : "Signup failed")
        );
      }

      // Set success message
      setSuccess(
        data.message ||
          (isLogin ? "Login successful!" : "Account created successfully!")
      );

      // For signup, switch to login view after successful registration
      if (!isLogin) {
        setTimeout(() => {
          setIsLogin(true);
          setSuccess(null);
        }, 2000);
      }

      // Clear form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Request error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col">
          <div className="card p-4 shadow-lg">
            <h2 className="text-center mb-4">
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.username}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    Loading...
                  </span>
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p className="text-center mt-3">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                className="btn btn-link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                  setSuccess(null);
                }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
