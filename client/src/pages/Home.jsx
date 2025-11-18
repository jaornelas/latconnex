import { useEffect, useState } from "react";
import { getBusinesses } from "../api/businessApi";
import { Link } from 'react-router-dom';

export default function Home() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    getBusinesses().then(data => setBusinesses(data));
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Discover Latino-Owned Businesses
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Support your community. Explore restaurants, shops, services, and more.
        </p>
      </div>

      {/* BUSINESS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {businesses.map((biz) => (
          <Link 
            key={biz.id}
            to={`/business/${biz.id}`}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border hover:border-red-300"
          >
            <h2 className="text-xl font-bold text-gray-900">{biz.name}</h2>
            <p className="text-red-600 font-medium mt-1">{biz.category}</p>
            <p className="text-gray-600 text-sm mt-2">
              {biz.city}, {biz.state}
            </p>
          </Link>
        ))}

      </div>

      {businesses.length === 0 && (
        <p className="text-gray-500">No businesses yet.</p>
      )}

      <div className="space-y-4">
        {businesses.map(biz => (
          <Link key={biz.id} to={`/business/${biz.id}`}>
            <div className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer">
              <h2 className="text-xl font-semibold">{biz.name}</h2>
              <p>{biz.category} • {biz.city}, {biz.state}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
