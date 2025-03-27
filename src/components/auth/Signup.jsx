import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            setError(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="formConcepts">
            <div className="formBox">
                <form onSubmit={handleSubmit}>
                    {loading && <p style={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}>Loading...</p>}
                    {passwordErr && <p style={{ color: 'red', fontWeight: 'bold', backgroundColor: 'black' }}>{passwordErr}</p>}
                    {error && <p style={{ color: 'red', fontWeight: 'bold', backgroundColor: 'black' }}>{error}</p>}
                    {success && <p style={{ backgroundColor: 'black', color: 'green', fontWeight: 'bold' }}>{success}</p>}
                    
                    <h1>Sign up</h1>
                    
                    <div className="inputDetails">
                        <input type="text" name="firstname" value={data.firstname} onChange={handleChange} required />
                        <label htmlFor="firstname">Enter First name</label>
                    </div>
                    <div className="inputDetails">
                        <input type="text" name="lastname" value={data.lastname} onChange={handleChange} required />
                        <label htmlFor="lastname">Enter Last name</label>
                    </div>
                    <div className="inputDetails">
                        <input type="email" name="email" value={data.email} onChange={handleChange} required />
                        <label htmlFor="email">Enter your email</label>
                    </div>
                    <div className="inputDetails">
                        <input type="tel" name="phonenumber" value={data.phonenumber} onChange={handleChange} required />
                        <label htmlFor="phonenumber">Enter phone number</label>
                    </div>
                    <div className="inputDetails">
                        <input type="password" name="password" value={data.password} onChange={handleChange} required />
                        <label htmlFor="password">Enter password</label>
                    </div>
                    <div className="inputDetails">
                        <input type="password" name="c_password" value={data.c_password} onChange={handleChange} required />
                        <label htmlFor="c_password">Confirm password</label>
                    </div>
                    
                    <div className="Signupbtns">
                        {!loading ? (
                            <button className="srvcbtn" type="submit">Signup</button>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="otherlinks">
                        <span>Already a member?&nbsp;&nbsp;<a href="/login">Login</a></span><br />
                        <span>Go to &nbsp;&nbsp;<a href="/">Homepage</a></span>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signup;
