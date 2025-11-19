import { useState } from "react";
import { addBusiness } from "../api/businessApi";
import { searchBusiness, getBusinessDetails } from "../api/googleApi";

export default function AddBusiness() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    website: "",
    lat: "",
    lng: "",
    googlePlaceId: "",
    googleRating: "",
    googleImage: ""
  });

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // 🔍 Handle text input for Google search
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const results = await searchBusiness(value);
    setSuggestions(results);
  };

  // 📌 Auto-fill form after selecting a suggestion
  const handleSelectSuggestion = async (item) => {
    setSearch(item.description);
    setSuggestions([]);

    const details = await getBusinessDetails(item.place_id);

    const photoRef = details.photos?.[0]?.photo_reference;
    const photoUrl = photoRef
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef}&key=${import.meta.env.VITE_GOOGLE_API_KEY
      }`
      : "";

    setForm({
      ...form,
      name: details.name || "",
      address: details.formatted_address || "",
      phone: details.formatted_phone_number || "",
      website: details.website || "",
      googlePlaceId: item.place_id,
      googleRating: details.rating || "",
      googleImage: photoUrl,
      lat: details.geometry?.location.lat || "",
      lng: details.geometry?.location.lng || "",
      city:
        details.address_components?.find((c) =>
          c.types.includes("locality")
        )?.long_name || "",
      state:
        details.address_components?.find((c) =>
          c.types.includes("administrative_area_level_1")
        )?.short_name || "",
    });
  };

  // ✍ Handle normal form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💾 Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBusiness({
      ...form,
      lat: form.lat === "" ? null : Number(form.lat),
      lng: form.lng === "" ? null : Number(form.lng),
    });

    alert("Business added!");
  };

  return (
    <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Add a Verified Business
      </h1>

      {/* GOOGLE AUTOCOMPLETE FIELD */}
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search business (Google Verified)"
          className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-red-300"
        />

        {suggestions.length > 0 && (
          <div className="absolute bg-white border rounded-lg shadow-lg w-full mt-1 z-50">
            {suggestions.map((s) => (
              <div
                key={s.place_id}
                onClick={() => handleSelectSuggestion(s)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {s.description}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUSINESS FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          ["name", "Business Name"],
          ["category", "Category"],
          ["address", "Address"],
          ["city", "City"],
          ["state", "State"],
          ["phone", "Phone"],
          ["email", "Email"],
          ["website", "Website"],
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            placeholder={label}
            value={form[key]}
            onChange={handleChange}
            className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-red-300"
          />
        ))}

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="border p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-red-300"
        />

        {/* Hidden fields (lat/lng, GooglePlaceID) */}
        <input type="hidden" name="lat" value={form.lat || ""} />
        <input type="hidden" name="lng" value={form.lng || ""} />
        <input type="hidden" name="googlePlaceId" value={form.googlePlaceId} />
        <input type="hidden" name="googleRating" value={form.googleRating} />
        <input type="hidden" name="googleImage" value={form.googleImage} />

        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg text-lg hover:bg-red-700 transition shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
