import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Subscription() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);

  const [data, setData] = useState({
    cardFullname: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    amount: 250,
    backGround_Check: 'No',
    criminalRecord: 'No',
    healthBAckground: 'No',
    gender: '',
    race: '',
    termsandCondition: false,
    userID: decoded.id,
  });

  const [files, setFiles] = useState({
    workCertificate: null,
    drugtest: null,
    idproof: null,
  });

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
  };

  const onFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prevFiles) => ({ ...prevFiles, [name]: files[0] }));
  };

  const onSubscription = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    try {
      const resp = await axios.post('http://localhost:6060/subscription', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (resp.status === 200) {
        alert('Subscription added successfully');
        alert('Please login again');
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Subscription Form</h2>
      <form onSubmit={onSubscription}>
        <div className="mb-3">
          <label htmlFor="cardFullname" className="form-label">Card Fullname</label>
          <input
            type="text"
            className="form-control"
            id="cardFullname"
            name="cardFullname"
            value={data.cardFullname}
            onChange={onChangeHandler}
            placeholder="Enter Card Fullname"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            value={data.cardNumber}
            onChange={onChangeHandler}
            placeholder="Enter Card Number"
            required
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="expMonth" className="form-label">Expiration Month</label>
            <select
              className="form-select custom-select"
              id="expMonth"
              name="expMonth"
              value={data.expMonth}
              onChange={onChangeHandler}
              required
            >
              <option value="">Select Month</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month < 10 ? `0${month}` : month}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="expYear" className="form-label">Expiration Year</label>
            <select
              className="form-select custom-select"
              id="expYear"
              name="expYear"
              value={data.expYear}
              onChange={onChangeHandler}
              required
            >
              <option value="">Select Year</option>
              {Array.from({ length: 51 }, (_, i) => 2000 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}

            </select>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input
            type="text"
            className="form-control"
            id="cvv"
            name="cvv"
            value={data.cvv}
            onChange={onChangeHandler}
            placeholder="Enter CVV"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            value={data.amount}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Upload Documents</label>
          <div className="mb-3">
            <label htmlFor="workCertificate" className="form-label">Work Certificate</label>
            <input
              type="file"
              className="form-control"
              id="workCertificate"
              name="workCertificate"
              onChange={onFileChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="drugtest" className="form-label">Drug Test</label>
            <input
              type="file"
              className="form-control"
              id="drugtest"
              name="drugtest"
              onChange={onFileChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="idproof" className="form-label">ID Proof</label>
            <input
              type="file"
              className="form-control"
              id="idproof"
              name="idproof"
              onChange={onFileChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="backGround_Check" className="form-label">Background Check</label>
          <select
            className="form-select custom-select"
            id="backGround_Check"
            name="backGround_Check"
            value={data.backGround_Check}
            onChange={onChangeHandler}
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="criminalRecord" className="form-label">Criminal Record</label>
          <select
            className="form-select custom-select"
            id="criminalRecord"
            name="criminalRecord"
            value={data.criminalRecord}
            onChange={onChangeHandler}
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="healthBAckground" className="form-label">Health Background</label>
          <select
            className="form-select custom-select"
            id="healthBAckground"
            name="healthBAckground"
            value={data.healthBAckground}
            onChange={onChangeHandler}
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            className="form-select custom-select"
            id="gender"
            name="gender"
            value={data.gender}
            onChange={onChangeHandler}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="race" className="form-label">Race</label>
          <select
            className="form-select custom-select"
            id="race"
            name="race"
            value={data.race}
            onChange={onChangeHandler}
            required
          >
            <option value="">Select Race</option>
            <option value="Asian">Asian</option>
            <option value="Black or African American">Black or African American</option>
            <option value="Hispanic or Latino">Hispanic or Latino</option>
            <option value="Native American">Native American</option>
            <option value="White">White</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="termsandCondition"
            name="termsandCondition"
            checked={data.termsandCondition}
            onChange={onChangeHandler}
            required
          />
          <label className="form-check-label" htmlFor="termsandCondition">
            I agree to the <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Subscribe</button>
      </form>
    </div>
  );
}

export default Subscription;
