import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Updatepassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [c_password, setCPassword] = useState("");
    const [error, setError] = useState("");

    const validatePassword = (password) => {
        return password.length >= 10;
    };

    const validatePasswordMatch = (password, c_password) => {
        return password === c_password;
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setError("Password must be at least 10 characters long.");
            return;
        }

        if (!validatePasswordMatch(password, c_password)) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.put('http://localhost:6060/updatepassword', { password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert("Password updated successfully!");
                navigate("/");
            }
        } catch (error) {
            console.error("There was an error updating the password!", error);
            setError("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        if (validatePassword(password) && validatePasswordMatch(password, c_password)) {
            setError("");
        }
    }, [password, c_password]);

    return (
        <section className="formConcepts">
            <div className="formBox">
                <form onSubmit={handlePasswordUpdate}>
                    <h1>Update Password</h1>
                    <div className="inputDetails">
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Enter Password</label>
                        {!validatePassword(password) && password.length > 0 && (
                            <p style={{ color: 'red' }}>Password must be at least 10 characters long.</p>
                        )}
                    </div>
                    <div className="inputDetails">
                        <input
                            type="password"
                            name="c_password"
                            value={c_password}
                            onChange={(e) => setCPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="c_password">Confirm Password</label>
                        {!validatePasswordMatch(password, c_password) && c_password.length > 0 && (
                            <p style={{ color: 'red' }}>Passwords do not match.</p>
                        )}
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className="Signupbtns">
                        <button className="srvcbtn" style={{ width: '45%' }}>Update Password</button>
                    </div>
                    <div className="otherlinks">
                        <span>Go to &nbsp;&nbsp;<a href="/">Homepage</a></span>
                    </div>
                </form>
            </div>
        </section>
    );
}
