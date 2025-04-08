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
            <section className="formConcepts" style={{
                background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div className="formBox" style={{
                    background: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '30px',
                    width: '100%',
                    maxWidth: '400px'
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {loading && (
                            <div className="loading-container" style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000
                            }}>
                                <p style={{ 
                                    backgroundColor: 'white', 
                                    color: 'black', 
                                    fontWeight: 'bold',
                                    padding: '20px',
                                    borderRadius: '5px'
                                }}>Loading...</p>
                            </div>
                        )}
                        {successMessage && (
                            <p style={{ 
                                backgroundColor: '#d1fae5', 
                                color: '#065f46', 
                                fontWeight: 'bold',
                                padding: '10px',
                                borderRadius: '5px',
                                borderLeft: '4px solid #10b981'
                            }}>{successMessage}</p>
                        )}
                        {error && (
                            <p style={{ 
                                backgroundColor: '#fee2e2', 
                                color: '#b91c1c', 
                                fontWeight: 'bold',
                                padding: '10px',
                                borderRadius: '5px',
                                borderLeft: '4px solid #ef4444'
                            }}>{error}</p>
                        )}
                        <h1 style={{
                            color: '#1e40af',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}>Login</h1>
                        <div className="inputDetails" style={{ position: 'relative' }}>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s',
                                    paddingLeft: '40px'
                                }}
                                placeholder="Enter Email"
                            />
                            
                        </div>
                        <div className="inputDetails" style={{ position: 'relative' }}>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '12px 15px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '16px',
                                    transition: 'all 0.3s',
                                    paddingLeft: '40px'
                                }}
                                placeholder="Enter Password "
                            />
                        </div>
                        <div className="Signupbtns">
                            {!loading && (
                                <button
                                    className="srvcbtn"
                                    type="submit"
                                    style={{
                                        background: '#1e40af',
                                        color: 'white',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        width: '100%',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        transition: 'background 0.3s'
                                    }}
                                >
                                    Login
                                </button>
                            )}
                            {loading && (
                                <div className="spinner" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '12px'
                                }}>
                                    <p style={{ color: '#1e40af', fontWeight: 'bold' }}>Loading...</p>
                                </div>
                            )}
                        </div>
                        <div className="otherlinks" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            fontSize: '14px',
                            color: '#4b5563'
                        }}>
                            <span>Forgot password?&nbsp;&nbsp;<a href="/forgotpassword" style={{
                                color: '#1e40af',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}>Forgot password?</a></span>
                            <span>Go to &nbsp;&nbsp;<a href="/" style={{
                                color: '#1e40af',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}>Homepage</a></span>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}