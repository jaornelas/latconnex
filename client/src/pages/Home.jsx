import { useEffect, useState } from "react";
import { getBusinesses } from "../api/businessApi";

export default function Home() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    getBusinesses().then(data => setBusinesses(data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Latino-Owned Businesses</h1>

      {businesses.length === 0 && (
        <p className="text-gray-500">No businesses yet.</p>
      )}

      <div className="space-y-4">
        {businesses.map(biz => (
          <div key={biz.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{biz.name}</h2>
            <p>{biz.category} • {biz.city}, {biz.state}</p>
            {biz.description && <p className="text-gray-600">{biz.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
