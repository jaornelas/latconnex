import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const getBusinesses = async () => {
  const res = await axios.get(`${API_URL}/businesses`);
  return res.data;
};

export const addBusiness = async (business) => {
  const res = await axios.post(`${API_URL}/businesses`, business);
  return res.data;
};

export const getBusinessById = async (id) => {
    const res = await axios.get(`${API_URL}/businesses/${id}`)
    return res.data;
}

export const deleteBusiness = async (id) => {
    const res = await axios.delete(`${API_URL}/businesses/${id}`);
    return res.data;
};