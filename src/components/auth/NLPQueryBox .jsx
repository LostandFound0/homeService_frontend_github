import React, { useState } from 'react';
import axios from 'axios';

const NLPQueryBox = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:6060/nlp-query", 
        { query },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult({ error: "Something went wrong!" });
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
      {result && (
        <div className="mt-4">
          <h2 className="font-bold text-lg">Result:</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default NLPQueryBox;
