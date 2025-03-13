const express = require('express');
const {
  getInstitutes,
  getInstituteById,
  createInstitute,
  updateInstitute,
  deleteInstitute
} = require('../controllers/instituteController');

const router = express.Router();

// Institute routes
router.get('/', getInstitutes);
router.get('/:id', getInstituteById);
router.post('/', createInstitute);
router.put('/:id', updateInstitute);
router.delete('/:id', deleteInstitute);

module.exports = router;
