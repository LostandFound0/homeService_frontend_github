import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import NLPQueryBox from '../auth/NLPQueryBox ';
import '../../assets/css/admin.css';

function Adminpage() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        usertype: '0',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:6060/allusers');
            setData(res.data.users);
        } catch (error) {
            alert('Failed to fetch users');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://localhost:6060/admin/updateuser/${formData.id}`, formData);
            } else {
                await axios.post('http://localhost:6060/signup', formData);
            }
            fetchData();
            setFormData({ id: '', firstname: '', lastname: '', email: '', phonenumber: '', usertype: '0' });
            setIsEditing(false);
            setShowForm(false);
        } catch (error) {
            alert('Error while saving user');
        }
    };

    const handleEdit = (user) => {
        setFormData(user);
        setIsEditing(true);
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:6060/admin/deleteuser/${id}`);
            fetchData();
        } catch (error) {
            alert('Failed to delete user');
        }
    };

    const filteredData = data.filter((user) =>
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phonenumber.includes(search)
    );

    return (
        <div className="admin-container">
            <h1 className="admin-title">Admin Dashboard</h1>

            <div className="cards-container">
                <div className="admin-card">
                    <h3>Total Users</h3>
                    <p className="card-value">{data.length}</p>
                    <p className="card-description">Registered users</p>
                </div>
                <div className="admin-card">
                    <h3>Workers</h3>
                    <p className="card-value">{data.filter(u => u.usertype === '1').length}</p>
                    <p className="card-description">User type 1</p>
                </div>
                <div className="admin-card">
                    <h3>General Users</h3>
                    <p className="card-value">{data.filter(u => u.usertype === '0').length}</p>
                    <p className="card-description">User type 0</p>
                </div>
            </div>

            {/* ✅ NLP Smart Search Section */}
            <div className="nlp-box-section" style={{ marginTop: "30px" }}>
                <h2>Smart Query (NLP Powered)</h2>
                <NLPQueryBox />
            </div>

            {showForm && (
                <div className="crud-form" ref={formRef}>
                    <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone Number:</label>
                            <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>User Type:</label>
                            <select name="usertype" value={formData.usertype} onChange={handleInputChange}>
                                <option value="0">User</option>
                                <option value="1">Worker</option>
                            </select>
                        </div>
                        <button type="submit" className="submit-btn">
                            {isEditing ? 'Update' : 'Add'} User
                        </button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setFormData({ id: '', firstname: '', lastname: '', email: '', phonenumber: '', usertype: '0' });
                                setIsEditing(false);
                                setShowForm(false);
                            }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <div className="data-table">
                <h2>User Management</h2>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by email or phone"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>User Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstname} {user.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.phonenumber}</td>
                                <td>{user.usertype === '1' ? 'Worker' : 'User'}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Adminpage;
