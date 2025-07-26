const City = require("../models/City");

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find().populate("State_ID", "State_Name");
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const cities = await City.find({ State_ID: req.params.id });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities", error });
  }
};

exports.createCity = async (req, res) => {
  try {
    const { City_Name, State_ID } = req.body;

    const newCity = new City({
      City_Name,
      State_ID,
    });

    const savedCity = await newCity.save();
    res.status(201).json(savedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCity = async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedCity) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json(updatedCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
