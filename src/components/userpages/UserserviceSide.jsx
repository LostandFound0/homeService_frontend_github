import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserserviceSide() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const getServiceData = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:6060/getallServiceData', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setData(res.data.message);
        setFilteredData(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching service data:', error);
    }
  };

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const confirmOrder = async () => {
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);

    try {
      const resOrder = await axios.post(
        'http://localhost:6060/orderpost',
        {
          orderuser_id: decode.id,
          service_id: selectedOrderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resOrder.status === 200) {
        alert('Order Success');
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleFilterChange = () => {
    const filtered = data.filter(service => {
      const nameMatch = service.serviceName.toLowerCase().includes(filterText.toLowerCase());
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      const serviceMin = parseFloat(service.minPrice);
      const serviceMax = parseFloat(service.maxPrice);
      const priceMatch =
        (!minPrice && !maxPrice) ||
        (!isNaN(min) && !isNaN(max) && serviceMax >= min && serviceMin <= max) ||
        (!isNaN(min) && isNaN(max) && serviceMax >= min) ||
        (isNaN(min) && !isNaN(max) && serviceMin <= max);
      const locationMatch = location === '' || service.location.toLowerCase().includes(location.toLowerCase());
      return nameMatch && priceMatch && locationMatch;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    getServiceData();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [filterText, minPrice, maxPrice, location, data]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Services</h1>

      <div className="mb-4 border p-4 rounded">
        <h4 className="mb-3">Filter Services</h4>
        <div className="row mb-3">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by service name"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        {filteredData.length !== 0 ? (
          filteredData.map((service) => (
            <div className="col-md-4 mb-4" key={service.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{service.serviceName}</h5>
                  <p className="card-text">
                    <strong>Minimum Price:</strong> ${service.minPrice}<br />
                    <strong>Maximum Price:</strong> ${service.maxPrice}<br />
                    <strong>Description:</strong> {service.serviceDescription}<br />
                    <strong>About User:</strong> {service.aboutuserDescription}<br />
                    <strong>Different Services:</strong> {service.diffServices}<br />
                    <strong>Qualification:</strong> {service.qualification}<br />
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOrderClick(service.id)}
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Services Data</p>
        )}
      </div>

      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="orderConfirmationLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderConfirmationLabel">Confirm Order</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to place this order?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={confirmOrder}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserserviceSide;
