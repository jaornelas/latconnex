import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBusinessById, deleteBusiness } from '../api/businessApi';

export default function BusinessDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        getBusinessById(id).then((data) => setBusiness(data));
    }, [id]);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this business?")) {
            await deleteBusiness(id);
            alert("Business deleted.");
            navigate("/");
        }
    };

    if (!business) return <p className="p-6">Loading..</p>

    return (
        <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto mt-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">{business.name}</h1>
                {business.googleRating && (
                    <p className="text-yellow-600 font-semibold text-lg mb-2">
                        ⭐ {business.googleRating} / 5.0
                    </p>
                )}

            </div>
            <p className="text-xl text-gray-700 mb-2">
                {business.category} · {business.city}, {business.state}
            </p>

            {business.googleImage && (
                <img
                    src={business.googleImage}
                    alt={business.name}
                    className="rounded-xl shadow mb-6 w-full max-h-64 object-cover"
                />
            )}


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
            <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded mb-6"
            >
                Delete Business
            </button>

            <p className="text-gray-500">
                Owner: {business.owner?.name} ({business.owner?.email})
            </p>
        </div>
    );
}