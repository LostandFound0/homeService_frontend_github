import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetSubDetails = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await axios.get('http://localhost:6060/subscriptions');
                setSubscriptions(response.data.data);
            } catch (err) {
                setError('Failed to fetch subscriptions.');
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (subscriptions.length === 0) return <p>No subscriptions available.</p>;

    return (
        <div>
            <h2>All Subscriptions</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Card Full Name</th>
                        <th>Card Number</th>
                        <th>Amount</th>
                        <th>Background Check</th>
                        <th>Criminal Record</th>
                        <th>Health Background</th>
                        <th>Gender</th>
                        <th>Race</th>
                        <th>Terms and Conditions</th>
                        <th>Work Certificate</th>
                        <th>Drug Test</th>
                        <th>ID Proof</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map(subscription => (
                        <tr key={subscription.id}>
                            <td>{subscription.id}</td>
                            <td>{subscription.cardFullname}</td>
                            <td>{subscription.cardNumber}</td>
                            <td>{subscription.amount}</td>
                            <td>{subscription.backGround_Check ? 'Yes' : 'No'}</td>
                            <td>{subscription.criminalRecord ? 'Yes' : 'No'}</td>
                            <td>{subscription.healthBAckground ? 'Yes' : 'No'}</td>
                            <td>{subscription.gender}</td>
                            <td>{subscription.race}</td>
                            <td>{subscription.termsandCondition ? 'Accepted' : 'Not Accepted'}</td>
                            <td>
                                {subscription.workCertificate && (
                                    <a href={`http://localhost:6060/files/${subscription.workCertificate}`} target="_blank" rel="noopener noreferrer">View Work Certificate</a>
                                )}
                            </td>
                            <td>
                                {subscription.drugtest && (
                                    <a href={`http://localhost:6060/files/${subscription.drugtest}`} target="_blank" rel="noopener noreferrer">View Drug Test</a>
                                )}
                            </td>
                            <td>
                                {subscription.idproof && (
                                    <a href={`http://localhost:6060/files/${subscription.idproof}`} target="_blank" rel="noopener noreferrer">View ID Proof</a>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetSubDetails;
