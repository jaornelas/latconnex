import { useEffect, useState } from "react";
import axios from "axios";
import BusinessCard from "../components/BusinessCard";

export default function Home() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/businesses").then(res => setBusinesses(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Latino-Owned Businesses</h1>
      <div className="grid gap-4">
        {businesses.map((biz, i) => (
          <BusinessCard key={i} business={biz} />
        ))}
      </div>
    </div>
  );
}
