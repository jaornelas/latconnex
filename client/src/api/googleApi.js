import axios from "axios";

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const searchBusiness = async (query) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&types=establishment&key=${GOOGLE_KEY}`;
  const res = await axios.get(url);
  return res.data.predictions;
};

export const getBusinessDetails = async (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_KEY}`;
  const res = await axios.get(url);
  return res.data.result;
};
