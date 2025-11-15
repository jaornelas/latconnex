import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBusinessById } from '../api/businessApi';

export default function BusinessDetail() {
    const { id } = useParams();
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        getBusinessById(id).then((data) => setBusiness(data));
    }, [id]);

    if (!business) return <p className="p-6">Loading..</p>

    return (
        <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-3">{business.name}</h1>
      <p className="text-xl text-gray-700 mb-2">
        {business.category} · {business.city}, {business.state}
      </p>

      {business.description && (
        <p className="text-gray-600 mb-4">{business.description}</p>
      )}

      <div className="mt-4 space-y-1">
        {business.address && <p><strong>Address:</strong> {business.address}</p>}
        {business.phone && <p><strong>Phone:</strong> {business.phone}</p>}
        {business.email && <p><strong>Email:</strong> {business.email}</p>}
        {business.website && (
          <p>
            <strong>Website: </strong>
            <a href={business.website} className="text-blue-600 underline" target="_blank">
              Visit site
            </a>
          </p>
        )}
      </div>

      <hr className="my-6" />

      <p className="text-gray-500">
        Owner: {business.owner?.name} ({business.owner?.email})
      </p>
    </div>
    );
}