import prisma from "../config/prisma.js";

export const getBusinesses = async (req, res) => {
  try {
    const businesses = await prisma.business.findMany({
      include: { owner: true }
    });

    res.json(businesses);
  } catch (error) {
    console.error("GET error:", error);
    res.status(500).json({ error: "Unable to fetch businesses" });
  }
};

export const addBusiness = async (req, res) => {
  const {
    name,
    description,
    category,
    address,
    city,
    state,
    phone,
    email,
    website,
    lat,
    lng
  } = req.body;

  try {
    const newBusiness = await prisma.business.create({
      data: {
        name,
        description,
        category,
        address,
        city,
        state,
        phone,
        email,
        website,
        lat,
        lng,
        ownerId: 1   // Temp until auth is implemented.
      }
    });

    res.status(201).json(newBusiness);
  } catch (error) {
    console.error("POST error:", error);
    res.status(500).json({ error: "Unable to add business" });
  }
};

