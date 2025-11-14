export const getBusinesses = async (req, res) => {
  // TODO: Fetch from database
  res.json([{ name: "Pan y Pan", category: "Bakery", city: "Madison" }]);
};

export const addBusiness = async (req, res) => {
  const newBusiness = req.body;
  // TODO: Insert into database
  res.status(201).json({ message: "Business added", business: newBusiness });
};
