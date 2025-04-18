import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';

function Workerorder() {
  const [data, setData] = useState([]);
  const [userd, setUserd] = useState([]);
  const [address, setAddress] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mesData, setMesData] = useState({
    orderuser_id: '',
    service_id: '',
    status: '',
    servicemessage: ''
  });
  const [messages, setMessages] = useState([]);
  const [messageModal, setMessageModal] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userMap, setUserMap] = useState({});

  const getData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:6060/workorders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setData(response.data.orders);
        setUserd(response.data.userDetailsForRequest);
        setAddress(response.data.address);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const orderUpdate = await axios.put(`http://localhost:6060/updateOrders/${mesData.id}`, mesData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (orderUpdate) {
        alert('Updated successfully');
        getData();
        setModalType(null);
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.post('http://localhost:6060/messagepost', {
        orderID: orderId,
        message: messageModal
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (resp.status === 200) {
        setMessageModal('');
        fetchMessages();
      }
    } catch (error) {
      alert('Failed to send message');
    }
  };

  const fetchMessages = async () => {
    if (!orderId) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:6060/getmessages/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setMessages(response.data.data);
        const userMap = response.data.User.reduce((acc, user) => {
          acc[user.id] = user.firstname;
          return acc;
        }, {});
        setUserMap(userMap);
      }
    } catch (err) {
      setError('Failed to fetch messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!orderId) return;
    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleEditModalShow = (order) => {
    setMesData({
      id: order.id,
      service_id: order.service_id,
      status: order.status,
      servicemessage: order.servicemessage
    });
    setModalType('edit');
  };

  const handleChatModalShow = (order) => {
    setOrderId(order.id);
    setModalType('chat');
  };

  const handleViewModalShow = (order) => {
    const user = userd.find(u => u.id === order.orderuser_id);
    const addr = address.find(a => a.user_id === order.orderuser_id);
    setSelectedOrder({ ...order, user, address: addr });
    setModalType('view');
  };

  return (
    <>
      <div>
        <h1>Work Orders</h1>
        <div className="row">
          {data.map((order) => (
            <div key={order.id} className="col-md-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Order ID: {order.id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Status:
                    <span style={{
                      color: order.status === 0 ? 'blue' :
                             order.status === 1 ? 'green' :
                             order.status === 2 ? 'red' :
                             order.status === 3 ? 'pink' :
                             'black', fontWeight: 'bold'
                    }}>
                      {order.status === 0 ? 'Pending' : order.status === 1 ? 'Accepted' : order.status === 2 ? 'Cancelled' : order.status === 3 ? 'Completed' : 'Unknown'}
                    </span>
                  </Card.Subtitle>
                  <Card.Text>
                    Created At: {new Date(order.createdAt).toLocaleString()}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleViewModalShow(order)}>View</Button>
                  <Button variant="secondary" onClick={() => handleEditModalShow(order)} className="ml-2">Edit</Button>
                  <Button variant="info" onClick={() => handleChatModalShow(order)} className="ml-2">Chat</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        <Modal show={modalType === 'view'} onHide={() => setModalType(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <>
                <h5>User Details</h5>
                <p><strong>Name:</strong> {selectedOrder.user ? `${selectedOrder.user.firstname} ${selectedOrder.user.lastname}` : 'N/A'}</p>
                <p><strong>Email:</strong> {selectedOrder.user ? selectedOrder.user.email : 'N/A'}</p>
                <p><strong>Phone:</strong> {selectedOrder.user ? selectedOrder.user.phonenumber : 'N/A'}</p>
                <h5>Address</h5>
                <p><strong>Address:</strong> {selectedOrder.address ? selectedOrder.address.address : 'N/A'}</p>
                <p><strong>City:</strong> {selectedOrder.address ? selectedOrder.address.city : 'N/A'}</p>
                <p><strong>State:</strong> {selectedOrder.address ? selectedOrder.address.state : 'N/A'}</p>
                <p><strong>Postal Code:</strong> {selectedOrder.address ? selectedOrder.address.postal_code : 'N/A'}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalType(null)}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modalType === 'edit'} onHide={() => setModalType(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={updateOrder}>
              <Form.Group controlId="formOrderStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" name="status" value={mesData.status} onChange={(e) => setMesData({ ...mesData, [e.target.name]: e.target.value })}>
                  <option>select status</option>
                  <option value="1">Accepted</option>
                  <option value="2">Cancelled</option>
                  <option value="3">Completed</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">Update</Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={modalType === 'chat'} onHide={() => setModalType(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Chat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container mt-4">
              <div className="row">
                <div className="col-12">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body" style={{ height: '400px', overflowY: 'scroll' }}>
                      {loading && <div className="alert alert-info">Loading messages...</div>}
                      {error && <div className="alert alert-danger">{error}</div>}
                      <ul className="list-unstyled">
                        {messages.map((message) => (
                          <li key={message.id} className="media mb-3">
                            <img src="https://via.placeholder.com/50" className="mr-3 rounded-circle" alt="User Avatar" />
                            <div className="media-body">
                              <h6 className="mt-0 mb-1">
                                <strong>{userMap[message.userID] || "Unknown"}:</strong> {message.message}
                              </h6>
                              <small className="text-muted">{new Date(message.createdAt).toLocaleString()}</small>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Modal.Footer>
                      <Form onSubmit={sendMessage}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Type your message here..."
                            value={messageModal}
                            onChange={(e) => setMessageModal(e.target.value)}
                          />
                        </Form.Group>
                        <Button variant="primary" type="submit">Send</Button>
                      </Form>
                    </Modal.Footer>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Workerorder;
