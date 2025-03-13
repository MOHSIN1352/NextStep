const express = require('express');
const {
  getHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital
} = require('../controllers/hospitalController');

const router = express.Router();

// Hospital routes
router.get('/', getHospitals);
router.get('/:id', getHospitalById);
router.post('/', createHospital);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

module.exports = router;
