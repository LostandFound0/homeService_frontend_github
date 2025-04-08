import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Updatepassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [c_password, setCPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validatePassword = (password) => {
        return password.length >= 10;
    };

    const validatePasswordMatch = (password, c_password) => {
        return password === c_password;
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        if (!validatePassword(password)) {
            setError("Password must be at least 10 characters long.");
            setLoading(false);
            return;
        }

        if (!validatePasswordMatch(password, c_password)) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.put('http://localhost:6060/updatepassword', { password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setSuccessMessage("Password updated successfully! Redirecting...");
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (validatePassword(password) && validatePasswordMatch(password, c_password)) {
            setError("");
        }
    }, [password, c_password]);

    return (
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
                <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                            }}>Updating password...</p>
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
                    
                    <h1 style={{
                        color: '#1e40af',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>Update Password</h1>
                    
                    <div className="inputDetails" style={{ position: 'relative' }}>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            placeholder="New Password"
                        />
                        {!validatePassword(password) && password.length > 0 && (
                            <p style={{ 
                                color: '#ef4444',
                                fontSize: '14px',
                                marginTop: '5px'
                            }}>Password must be at least 10 characters</p>
                        )}
                    </div>
                    
                    <div className="inputDetails" style={{ position: 'relative' }}>
                        <input
                            type="password"
                            name="c_password"
                            value={c_password}
                            onChange={(e) => setCPassword(e.target.value)}
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
                            placeholder="Confirm Password"
                        />
                        
                        {!validatePasswordMatch(password, c_password) && c_password.length > 0 && (
                            <p style={{ 
                                color: '#ef4444',
                                fontSize: '14px',
                                marginTop: '5px'
                            }}>Passwords don't match</p>
                        )}
                    </div>
                    
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
                    
                    <div className="Signupbtns">
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
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                    
                    <div className="otherlinks" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        fontSize: '14px',
                        color: '#4b5563',
                        textAlign: 'center'
                    }}>
                        <span>Go to &nbsp;&nbsp;<a href="/" style={{
                            color: '#1e40af',
                            fontWeight: '500',
                            textDecoration: 'none'
                        }}>Homepage</a></span>
                    </div>
                </form>
            </div>
        </section>
    );
}