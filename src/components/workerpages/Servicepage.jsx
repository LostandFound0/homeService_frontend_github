import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Servicepage() {
    const [addService, setAddService] = useState({
        serviceName: '',
        minPrice: '',
        maxPrice: '',
        serviceDescription: '',
        aboutuserDescription: '',
        diffServices: '',
        qualification: ''
    });

    const [serData, setSerData] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [editsr, setEditService] = useState({
        id: '',
        serviceName: '',
        minPrice: '',
        maxPrice: '',
        serviceDescription: '',
        aboutuserDescription: '',
        diffServices: '',
        qualification: ''
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setAddService(prevState => ({ ...prevState, [name]: value }));
    };

    const editOnChange = (e) => {
        const { name, value } = e.target;
        setEditService(prevState => ({ ...prevState, [name]: value }));
    };

    const addServiceFunction = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:6060/addservice', addService, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                alert('Service added successfully');
                getServiceDetails();
                setModalType(null);
            }
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const getServiceDetails = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:6060/getservice', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setSerData(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const editService = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:6060/updservice/${editsr.id}`, editsr, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                alert('Service updated successfully');
                getServiceDetails();
                setModalType(null);
            }
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    const deleteService = async (serviceId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://localhost:6060/deleteservice/${serviceId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                alert('Service deleted successfully');
                getServiceDetails();
            }
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const serviceUpdate = (service) => {
        setEditService({
            id: service.id,
            serviceName: service.serviceName,
            minPrice: service.minPrice,
            maxPrice: service.maxPrice,
            serviceDescription: service.serviceDescription,
            aboutuserDescription: service.aboutuserDescription,
            diffServices: service.diffServices,
            qualification: service.qualification
        });
        setModalType('edit');
    };

    useEffect(() => {
        getServiceDetails();
    }, []);

    return (
        <>
            <Button variant="primary" onClick={() => setModalType('add')} className="mb-3">
                Add Service
            </Button>

            {/* Add Service Modal */}
            <Modal show={modalType === 'add'} onHide={() => setModalType(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addServiceFunction}>
                        {Object.keys(addService).map((key) => (
                            <Form.Group key={key} controlId={`form${key}`}>
                                <Form.Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Form.Label>
                                <Form.Control
                                    type={key.includes('Price') ? 'number' : 'text'}
                                    name={key}
                                    value={addService[key]}
                                    onChange={onChangeHandler}
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                />
                            </Form.Group>
                        ))}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Service Modal */}
            <Modal show={modalType === 'edit'} onHide={() => setModalType(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editService}>
                        {Object.keys(editsr).map((key) => (
                            <Form.Group key={key} controlId={`form${key}`}>
                                <Form.Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Form.Label>
                                <Form.Control
                                    type={key.includes('Price') ? 'number' : 'text'}
                                    name={key}
                                    value={editsr[key]}
                                    onChange={editOnChange}
                                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                />
                            </Form.Group>
                        ))}
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Service Cards */}
            <Row>
                {serData.map((service) => (
                    <Col md={4} lg={3} key={service.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{service.serviceName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    ${service.minPrice} - ${service.maxPrice}
                                </Card.Subtitle>
                                <Card.Text>
                                    <strong>Description:</strong> {service.serviceDescription}
                                    <br />
                                    <strong>About User:</strong> {service.aboutuserDescription}
                                    <br />
                                    <strong>Different Services:</strong> {service.diffServices}
                                    <br />
                                    <strong>Qualification:</strong> {service.qualification}
                                </Card.Text>
                                <Button variant="warning" onClick={() => serviceUpdate(service)} className="me-2">
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => deleteService(service.id)}>
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Servicepage;
