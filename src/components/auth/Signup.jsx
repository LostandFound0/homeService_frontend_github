import { useState } from "react";
import axios from "axios";
import '../../assets/css/landing.css';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaArrowRight } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

function Signup() {
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        password: '',
        c_password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [passwordErr, setPasswordErr] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({ ...prevState, [name]: value }));

        if (name === 'password') {
            if (value.length < 10) {
                setPasswordErr('Password must be at least 10 characters long');
            } else {
                setPasswordErr('');
            }
        }

        if (name === 'c_password') {
            if (value !== data.password) {
                setPasswordErr('Passwords do not match');
            } else {
                setPasswordErr('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordErr) return;

        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const response = await axios.post('http://localhost:6060/signup', data);
            if (response.status === 200 || response.status === 201) {
                setSuccess('Signup successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Join Service Harbour to access amazing services</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {loading && (
                        <div className="auth-alert loading">
                            <FiLoader className="spin" /> Processing your request...
                        </div>
                    )}
                    {error && (
                        <div className="auth-alert error">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="auth-alert success">
                            {success}
                        </div>
                    )}
                    {passwordErr && (
                        <div className="auth-alert error">
                            {passwordErr}
                        </div>
                    )}

                    <div className="form-grid">
                        <div className="input-group">
                            <label htmlFor="firstname">First Name</label>
                            <div className="input-field">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={data.firstname}
                                    onChange={handleChange}
                                    placeholder="John"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastname">Last Name</label>
                            <div className="input-field">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={data.lastname}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-field">
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="phonenumber">Phone Number</label>
                        <div className="input-field">
                            <FaPhone className="input-icon" />
                            <input
                                type="tel"
                                id="phonenumber"
                                name="phonenumber"
                                value={data.phonenumber}
                                onChange={handleChange}
                                placeholder="+1 234 567 8900"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password (min 10 characters)</label>
                        <div className="input-field">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="••••••••••"
                                required
                                minLength="10"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="c_password">Confirm Password</label>
                        <div className="input-field">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                id="c_password"
                                name="c_password"
                                value={data.c_password}
                                onChange={handleChange}
                                placeholder="••••••••••"
                                required
                                minLength="10"
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? (
                            <FiLoader className="spin" />
                        ) : (
                            <>
                                Sign Up <FaArrowRight />
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <a href="/login" className="auth-link">Log in</a>
                    </p>
                    <p>
                        <a href="/" className="auth-link">Back to Homepage</a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Signup;