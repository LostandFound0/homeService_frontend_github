import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NLPQueryBox = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await axios.get("http://localhost:6060/userorders");
        setServices(res.data.services || []);
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Failed to load services/users", err);
      }
    };
    fetchMeta();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:6060/nlp-query", { query }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResult(res.data.result || []);
    } catch (err) {
      console.error(err);
      setResult([{ error: "Something went wrong!" }]);
    }
  };

  const getUserNameById = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? `${user.firstname} ${user.lastname}` : `User ID: ${userId}`;
  };

  const getServiceName = (id) => {
    const service = services.find(s => s.id === id);
    return service?.serviceName || `Service ID: ${id}`;
  };

  const getWorkerNameByServiceId = (serviceId) => {
    const service = services.find(s => s.id === serviceId);
    if (!service) return "Unknown Worker";
    const user = users.find(u => u.id === service.user_id);
    return user ? `${user.firstname} ${user.lastname}` : `Worker ID: ${service.user_id}`;
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 0: return "Pending";
      case 1: return "Accepted";
      case 2: return "In Progress";
      case 3: return "Completed";
      default: return "Unknown";
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Ask something like 'pending orders'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {Array.isArray(result) && result.length > 0 && (
        <div className="grid gap-4 mt-4">
          {result.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Order ID: {item.id}</h3>
              {/* <p><strong>Ordered By:</strong> {getUserNameById(item.orderuser_id)}</p> */}
              {/* <p><strong>Service:</strong> {getServiceName(item.service_id)}</p> */}
              {/* <p><strong>Worker:</strong> {getWorkerNameByServiceId(item.service_id)}</p> */}
              <p><strong>Status:</strong> {getStatusLabel(item.status)}</p>
              {/* <p><strong>Service Message:</strong> {item.servicemessage}</p> */}
              <p><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</p>
              <p><strong>Payment:</strong> {item.paymentstatus === "0" ? "Not Paid" : "Paid"}</p>
            </div>
          ))}
        </div>
      )}

      {result && result.error && (
        <div className="text-red-500 mt-4">{result.error}</div>
      )}
    </div>
  );
};

export default NLPQueryBox;
