import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post('http://localhost:6060/login', data);
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                setSuccessMessage("Login successful! Redirecting...");
                setTimeout(() => navigate('/home'), 2000);
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="formConcepts">
                <div className="formBox">
                    <form onSubmit={handleSubmit}>
                        {loading && (
                            <div className="loading-container">
                                <p style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>Loading...</p>
                            </div>
                        )}
                        {successMessage && (
                            <p style={{ backgroundColor: 'black', color: 'green', fontWeight: 'bold' }}>{successMessage}</p>
                        )}
                        {error && (
                            <p style={{ backgroundColor: 'black', color: 'red', fontWeight: 'bold' }}>{error}</p>
                        )}
                        <h1>Login</h1>
                        <div className="inputDetails">
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="email">Enter Email</label>
                        </div>
                        <div className="inputDetails">
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Enter Password</label>
                        </div>
                        <div className="Signupbtns">
                            {!loading && (
                                <button
                                    className="srvcbtn"
                                    type="submit"
                                >
                                    Login
                                </button>
                            )}
                            {loading && (
                                <div className="spinner">
                                    <p>Loading...</p>
                                </div>
                            )}
                        </div>
                        <div className="otherlinks">
                            <span>Forgot password?&nbsp;&nbsp;<a href="/forgotpassword">Forgot password?</a></span><br />
                            <span>Go to &nbsp;&nbsp;<a href="/">Homepage</a></span>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
