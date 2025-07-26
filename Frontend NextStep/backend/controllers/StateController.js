const State = require("../models/State");

exports.getStates = async (req, res) => {
  try {
    const states = await State.find({}); // Fetch all states
    res.status(200).json(states);
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({ message: "Error fetching ", error });
  }
};

exports.createState = async (req, res) => {
  try {
    const { State_Name } = req.body;

    if (!State_Name) {
      return res.status(400).json({ message: "State name is required" });
    }

    const stateExists = await State.findOne({ State_Name });
    if (stateExists) {
      return res.status(400).json({ message: "State already exists" });
    }

    const newState = await State.create({ State_Name });
    res.status(201).json(newState);
  } catch (error) {
    res.status(500).json({ message: "Error creating state", error });
  }
};

exports.getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);
    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ message: "Error fetching state", error });
  }
};

exports.updateState = async (req, res) => {
  try {
    const { State_Name } = req.body;
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).json({ message: "State not found" });
    }

    state.State_Name = State_Name || state.State_Name;
    const updatedState = await state.save();

    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ message: "Error updating state", error });
  }
};
