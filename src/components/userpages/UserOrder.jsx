import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Alert, Spinner, Card } from 'react-bootstrap';

function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [usersss, setUsers] = useState([]);
  const [service, setService] = useState([]);
  const [serviceMap, setServiceMap] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState({ id: '', service_id: '', status: '', servicemessage: '' });
  const [normalMessage, setNormalMessage] = useState('');
  const [orderIds, setOrderIds] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    orderID: '', cardName: '', cardNumber: '', expMonth: '', expYear: '', paymentAmount: '',
    paymentAddress: '', paymentCity: '', paymentState: '', paymentPostalcode: ''
  });
  const [getpaymentstatus, setpaymentstatus] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewPost, setReview] = useState({ order_ID: '', points: '', comment: '' });

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await axios.get('http://localhost:6060/userorders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data.orders);
      setUsers(res.data.users);
      setService(res.data.services);

      const serviceMapping = res.data.services.reduce((acc, srv) => {
        acc[srv.id] = srv.serviceName;
        return acc;
      }, {});
      setServiceMap(serviceMapping);

    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert('Token expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError(err.message);
      }
    }
  };

  const fetchMessages = async () => {
    if (!orderIds) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:6060/getmessages/${orderIds}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        const userMap = res.data.User.reduce((acc, u) => {
          acc[u.id] = u.firstname;
          return acc;
        }, {});

        const enrichedMessages = res.data.data.map(msg => ({
          ...msg,
          senderName: userMap[msg.userID] || "Unknown"
        }));

        setMessages(enrichedMessages);
      }
    } catch (err) {
      setError('Failed to fetch messages.');
    }
  };

  const getFunction = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:6060/getpaymentorder', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setpaymentstatus(res.data.data);
    } catch (error) {
      alert(`Payment error ${error}`);
    }
  };

  const onUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:6060/updateOrders/${orderStatus.id}`, orderStatus, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        alert("Update successful");
        fetchOrders();
        setShowEditModal(false);
      }
    } catch {
      alert("Update error");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:6060/messagepost', {
        orderID: orderIds,
        message: normalMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        setNormalMessage('');
        fetchMessages();
      }
    } catch {
      alert('Failed to send message');
    }
  };

  const handleShowEditModal = (order) => {
    setOrderStatus({
      id: order.id,
      service_id: order.service_id,
      status: order.status,
      servicemessage: order.servicemessage
    });
    setShowEditModal(true);
  };

  const handleShowChatModal = (orderId) => {
    setOrderIds(orderId);
    setLoading(true);
    fetchMessages().finally(() => setLoading(false));
    setShowChatModal(true);
  };

  const onClickModal = (ord) => {
    setPaymentData(prev => ({ ...prev, orderID: ord.id }));
    setPaymentModal(true);
  };

  const onSubmitPayment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:6060/paymentorder', paymentData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        alert("Payment Success");
        setPaymentModal(false);
      }
    } catch (err) {
      alert(`Payment error ${err}`);
    }
  };

  const submitPaymentHandler = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const reviewHandle = (order) => {
    setReview({ order_ID: order.id, points: '', comment: '' });
    setShowReviewModal(true);
  };

  const onChangeReviewHandler = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  const sendReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:6060/reviewpost', reviewPost, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 200) {
        alert("Review Success");
        setShowReviewModal(false);
      }
    } catch (err) {
      alert(`Review Order error ${err}`);
    }
  };

  useEffect(() => {
    fetchOrders();
    getFunction();
  }, []);

  useEffect(() => {
    if (orderIds) fetchMessages();
  }, [orderIds]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
      getFunction();
      if (orderIds) fetchMessages();
    }, 2000);
    return () => clearInterval(interval);
  }, [orderIds]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User Orders</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="row">
        {orders.length > 0 ? orders.map(order => (
          <div className="col-md-4 mb-3" key={order.id}>
            <Card>
              <Card.Body>
                <Card.Title>Order ID: {order.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <strong style={{
                    color: order.status === 0 ? "#39f" :
                      order.status === 1 ? "green" :
                        order.status === 2 ? "red" :
                          order.status === 3 ? "#00008B" : "#123456"
                  }}>
                    Status: {order.status === 0 ? "Pending" :
                      order.status === 1 ? "Accepted" :
                        order.status === 2 ? "Cancelled" :
                          order.status === 3 ? "Completed" : "Unknown"}
                  </strong>
                </Card.Subtitle>
                {usersss.map(rr => (
                  <Card.Text key={rr.id}><strong>Worker Name:</strong> {rr.firstname}</Card.Text>
                ))}
                <Card.Text><strong>Service Name:</strong> {serviceMap[order.service_id] || "Unknown"}</Card.Text>
                <Card.Text><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</Card.Text>
                <div className="d-flex justify-content-between">
                  {(order.status === 0 || order.status === 1) &&
                    <Button variant="primary" onClick={() => handleShowEditModal(order)}>Edit</Button>}
                  <Button variant="info" onClick={() => handleShowChatModal(order.id)}>Chat</Button>
                  {order.status === 3 && order.paymentstatus == 0 &&
                    <Button variant="warning" onClick={() => onClickModal(order)}>Payment Order</Button>}
                  {order.paymentstatus == 1 &&
                    <>
                      <Button variant="dark" onClick={() => alert(order.id)}>View Bill</Button>
                      <Button variant='outline-primary' onClick={() => reviewHandle(order)}>Review</Button>
                    </>}
                </div>
              </Card.Body>
            </Card>
          </div>
        )) : (
          <div className="col-12"><Alert variant="info" className="text-center">No Orders Found</Alert></div>
        )}
      </div>

      {showReviewModal &&
        <Form onSubmit={sendReview}>
          <Form.Control type="text" name="points" placeholder="Enter points" value={reviewPost.points} onChange={onChangeReviewHandler} />
          <Form.Control type="text" name="comment" placeholder="Enter Comment" value={reviewPost.comment} onChange={onChangeReviewHandler} />
          <Button type="submit" variant="outline-primary">Review</Button>
        </Form>}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Edit Order</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={onUpdateOrder}>
            <Form.Group controlId="formOrderStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" name="status" value={orderStatus.status} onChange={(e) => setOrderStatus({ ...orderStatus, status: e.target.value })}>
                <option value="2">Cancelled</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showChatModal} onHide={() => setShowChatModal(false)} size="lg" centered>
        <Modal.Header closeButton><Modal.Title>Chat</Modal.Title></Modal.Header>
        <Modal.Body>
          {loading ? (
            <div className="text-center"><Spinner animation="border" variant="primary" /><p>Loading messages...</p></div>
          ) : (
            <ul className="list-unstyled">
              {messages.length > 0 ? messages.map(msg => (
                <li key={msg.id} className="media mb-3">
                  <img src="https://via.placeholder.com/50" className="mr-3 rounded-circle" alt="User Avatar" />
                  <div className="media-body">
                    <h6 className="mt-0 mb-1"><strong>{msg.senderName}</strong>: {msg.message}</h6>
                    <small className="text-muted">{new Date(msg.createdAt).toLocaleString()}</small>
                  </div>
                </li>
              )) : <p className="text-center">No messages found</p>}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={sendMessage} className="w-100 d-flex">
            <Form.Control type="text" placeholder="Type your message..." value={normalMessage} onChange={(e) => setNormalMessage(e.target.value)} />
            <Button type="submit" variant="primary" className="ml-2">Send</Button>
          </Form>
        </Modal.Footer>
      </Modal>

      <Modal show={paymentModal} onHide={() => setPaymentModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Payment Details</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmitPayment}>
            {["cardName", "cardNumber", "expMonth", "expYear", "paymentAmount", "paymentAddress", "paymentCity", "paymentState", "paymentPostalcode"].map(field => (
              <Form.Group key={field}>
                <Form.Label>{field}</Form.Label>
                <Form.Control name={field} type="text" value={paymentData[field]} placeholder={`Enter ${field}`} onChange={submitPaymentHandler} />
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserOrder;
