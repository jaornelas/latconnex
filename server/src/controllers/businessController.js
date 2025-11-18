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

export const getBusinessById = async (req, res) => {
  const { id } = req.params;

  try {
    const business = await prisma.business.findUnique({
      where: { id: Number(id) },
      include: { owner: true }
    });

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.json(business);
  } catch (error) {
    console.error("GET by ID error:", error);
    res.status(500).json({ error: "Unable to fetch business" });
  }
};

export const deleteBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.business.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Business has been deleted sucessfully"})
  } catch (error) {
    console.log("DELETE error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Businesss not found" });
    }

    res.status(500).json({ error: "Unable to delete business" });
  }
}

