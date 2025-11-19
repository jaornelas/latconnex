import { useEffect, useState } from "react";
import { getBusinesses } from "../api/businessApi";
import { Link } from 'react-router-dom';

export default function Home() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    getBusinesses().then(data => setBusinesses(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* HERO SECTION */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Discover Latino-Owned Businesses
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Support your community — explore restaurants, shops, services, and more.
        </p>
        <div className="mt-6">
        </div>
      </header>

      {/* BUSINESS GRID */}
      {businesses.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((biz) => (
            <Link
              key={biz.id}
              to={`/business/${biz.id}`}
              aria-label={`View ${biz.name}`}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 border border-transparent hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200 flex flex-col"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {biz.name}
                  </h2>
                  <p className="text-red-600 font-medium mt-1 text-sm">
                    {biz.category}
                  </p>
                </div>
              </div>

              {biz.description && (
                <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                  {biz.description.length > 120
                    ? biz.description.slice(0, 120) + "..."
                    : biz.description}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span aria-hidden>📍</span>
                  <span>
                    {biz.city}
                    {biz.city && biz.state ? ", " : ""}
                    {biz.state}
                  </span>
                </div>
                <span className="text-gray-400">View →</span>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-dashed border-gray-200 text-center">
          <div className="text-4xl">✨</div>
          <h3 className="text-lg font-semibold text-gray-900 mt-4">
            No businesses added yet
          </h3>
          <p className="text-gray-600 mt-2">
            Be the first to add a Latino-owned business in your area.
          </p>
        </div>
      )}
    </div>
  );
}
