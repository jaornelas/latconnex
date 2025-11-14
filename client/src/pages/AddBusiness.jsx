import { useState } from "react";
import { addBusiness } from "../api/businessApi";

export default function AddBusiness() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    city: "",
    state: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBusiness(form);
    alert("Business added!");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a Business</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Business Name"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          className="border p-2 w-full"
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Address"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <div className="flex gap-2">
          <input
            name="city"
            placeholder="City"
            className="border p-2 w-1/2"
            onChange={handleChange}
          />
          <input
            name="state"
            placeholder="State"
            className="border p-2 w-1/2"
            onChange={handleChange}
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
